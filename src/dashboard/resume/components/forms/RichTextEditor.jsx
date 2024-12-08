import React, { useRef, useState } from "react";
import JoditEditor from 'jodit-react';
const RichTextEditor = () => {
  const editor = useRef(null);
	const [content, setContent] = useState('');  
    return (
      <div>
        <JoditEditor
			ref={editor}
			value={content}
			tabIndex={1} // tabIndex of textarea
			onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
			onChange={newContent => setContent(newContent)}
		/>
      </div>
    );
  };
  
  export default RichTextEditor;