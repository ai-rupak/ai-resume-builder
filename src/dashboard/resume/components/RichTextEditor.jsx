import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { Brain, LoaderCircle } from 'lucide-react';
import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import { 
  BtnBold, BtnBulletList, BtnClearFormatting,
  BtnItalic, BtnLink, BtnNumberedList,
  BtnRedo, BtnStyles, BtnUnderline,
  BtnUndo, Editor, EditorProvider,
  HtmlButton, Separator, Toolbar
} from 'react-simple-wysiwyg';
import { toast } from 'react-toastify';
import { AIChatSession } from './../../../../service/AiModel.js';

const PROMPT = `You are a resume writer. Given the position title "{positionTitle}", generate 3-4 high-quality, professional resume bullet points in HTML format using <ul> and <li> tags. 

❗️Return ONLY the HTML. Do NOT return JSON or any extra keys like "position_title" or "bullet_points". Just start with <ul>.`;

const RichTextEditor = ({ onRichTextEditorChange, index, value }) => {
  const [editorValue, setEditorValue] = useState(value || '');
  const { resumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setEditorValue(value || '');
  }, [value]);

  const handleEditorChange = (e) => {
    const newValue = e.target.value;
    setEditorValue(newValue);
    onRichTextEditorChange(newValue, 'description', index);
  };

 const GenerateSummaryFromAI = async () => {
  setLoading(true);
  try {
    if (!resumeInfo.experience?.[index]?.jobTitle) {
      toast.error('Please Add Position Title');
      return;
    }

    const prompt = PROMPT.replace('{positionTitle}', resumeInfo.experience[index].jobTitle);
    const result = await AIChatSession.sendMessage(prompt);
    const resp = await result.response.text();

    // Extract only the <ul>...</ul> from any extra wrapping
    const match = resp.match(/<ul[\s\S]*?<\/ul>/);
    const cleanHtml = match ? match[0] : resp;

    setEditorValue(cleanHtml);
    onRichTextEditorChange(cleanHtml, 'description', index);
  } catch (error) {
    toast.error('Error generating content');
    console.error(error);
  } finally {
    setLoading(false);
  }
};


  return (
    <div>
      <div className='flex justify-between my-2'>
        <label className='block'>DESCRIPTION</label>
        <Button 
          onClick={GenerateSummaryFromAI} 
          className='flex gap-2 border-primary text-primary' 
          size="sm" 
          variant="outline"
          disabled={loading}
        >
          {loading ? 
            <LoaderCircle className='animate-spin'/> : 
            <><Brain className='h-4 w-4'/> Generate from AI</>
          }
        </Button>
      </div>
      
      <EditorProvider>
        <Editor 
          value={editorValue}
          onChange={handleEditorChange}
        >
          <Toolbar>
            <BtnUndo />
            <BtnRedo />
            <Separator />
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
            <BtnClearFormatting />
            <HtmlButton />
            <Separator />
            <BtnStyles />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
};

export default RichTextEditor;