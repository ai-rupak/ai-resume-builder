import * as pdfjsLib from "pdfjs-dist";

// ✅ Load worker from /public folder
pdfjsLib.GlobalWorkerOptions.workerSrc = `${window.location.origin}/pdf.worker.min.js`;

export async function convertPdfToImage(file) {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const page = await pdf.getPage(1);

    const viewport = page.getViewport({ scale: 2 });
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    await page.render({ canvasContext: context, viewport }).promise;

    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const imageFile = new File([blob], "resume.png", { type: "image/png" });

            resolve({
              imageUrl: url,
              file: imageFile,
            });
          } else {
            resolve({ imageUrl: "", file: null, error: "Failed to render image" });
          }
        },
        "image/png",
        1.0
      );
    });
  } catch (err) {
    return {
      imageUrl: "",
      file: null,
      error: `Failed to convert PDF: ${err.message}`,
    };
  }
}
