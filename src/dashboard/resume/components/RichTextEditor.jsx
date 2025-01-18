import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '@/context/ResumeinfoContext';
import { Brain, LoaderCircle } from 'lucide-react';
import React, { useContext } from 'react'
import { useState } from 'react';
import { 
  BtnBold,
  BtnBulletList,
  BtnClearFormatting,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnRedo,
  BtnStyles,
  BtnUnderline,
  BtnUndo,
  Editor,
  EditorProvider,
  HtmlButton,
  Separator,
  Toolbar
} from 'react-simple-wysiwyg';
import { AIChatSession } from './../../../../service/AiModel.js';
import { toast } from 'sonner';
const PROMT = "position title: {positionTitle} . Depends on position title give me 5-7 bullet points for my experience in resume . give me result in HTML format"
const RichTextEditor = ({onRichTextEditorChange,index,defaultValue}) => {
  const [value, setValue] = useState(defaultValue);
  const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);

  const GenerateSummaryFromAI = async ()=>{
    setLoading(true);
    if (!resumeInfo.experience[index].title){
      toast('Please Add Position Title');
      return;
    }
    const prompt = PROMT.replace('{positionTitle}',resumeInfo.experience[index].title)
    const result = await AIChatSession.sendMessage(prompt);
    console.log(result.response.text());
    const resp = result.response.text();
    setValue(resp.replace('[','').replace(']',''));
    setLoading(false);

    
  }
  return (
    <div>
      <div className='flex justify-between my-2'>
      <label className='text-sm'>Summary</label>
      <Button onClick={GenerateSummaryFromAI} className='flex gap-2 border-primary text-primary' size="sm" variant="outline"> {loading? <LoaderCircle className='animate-spin'/> : <><Brain className='h-4 w-4'/> Generate from AI</>}</Button>
      </div>
      
      <EditorProvider>
      <Editor value={value} 
      onChange={(e)=>{setValue(e.target.value);
      onRichTextEditorChange(e)
      }}
      
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
  )
}

export default RichTextEditor