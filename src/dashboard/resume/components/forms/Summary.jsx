import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Brain, LoaderCircle } from 'lucide-react';
import { AIChatSession } from './../../../../../service/AiModel';
import ResumeApi from './../../../../../service/GlobalApi';
import { toast } from 'react-toastify';

const AI_PROMPT = "Job Title: {jobTitle} , Depends on job title give me list of summary for 3 experience level, Mid Level and Freasher level in 3 -4 lines in array format, With summary and experience_level Field in JSON Format";

function Summary({ enabledNext }) {
  const params = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [aiGeneratedSummaryList, setAiGeneratedSummaryList] = useState(null);

  // Initial data fetch
  useEffect(() => {
    if (params?.resumeId) {
      ResumeApi.getResumeById(params.resumeId)
        .then((response) => {
          const data = response.data?.data || response.data;
          if (data?.summary) {
            setSummary(data.summary);
          }
        })
        .catch((error) => {
          console.error('Error fetching resume:', error);
        });
    }
  }, [params?.resumeId]);

  // Update context when summary changes
  useEffect(() => {
    if (summary) {
      setResumeInfo(prev => ({
        ...prev,
        summary: summary
      }));
      enabledNext(true);
    }
  }, [summary, setResumeInfo, enabledNext]);

  const GenerateSummaryFromAI = async () => {
    if (!resumeInfo?.jobTitle) {
      toast.warning('Please enter a job title first');
      return;
    }

    setLoading(true);
    try {
      const prompt = AI_PROMPT.replace('{jobTitle}', resumeInfo.jobTitle);
      const result = await AIChatSession.sendMessage(prompt);
      const parsedResponse = JSON.parse(result.response.text());
      setAiGeneratedSummaryList(parsedResponse);
    } catch (error) {
      toast.error('Error generating AI suggestions');
    } finally {
      setLoading(false);
    }
  };

  const onSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await ResumeApi.updateResume(params?.resumeId, {
        summary: summary
      });
      toast.success('Summary updated successfully');
    } catch (error) {
      toast.error('Error updating summary');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Summary</h2>
        <p>Add Summary for your job title</p>

        <form className="mt-7" onSubmit={onSave}>
          <div className="flex justify-between items-end">
            <label>Add Summary</label>
            <Button
              variant="outline"
              onClick={GenerateSummaryFromAI}
              type="button"
              size="sm"
              className="border-primary text-primary flex gap-2"
              disabled={loading}
            >
              <Brain className="h-4 w-4" />
              Generate from AI
            </Button>
          </div>
          <Textarea
            className="mt-5"
            required
            value={summary}
            placeholder="Enter your professional summary"
            onChange={(e) => setSummary(e.target.value)}
            row={5}
          />
          <div className="mt-2 flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
            </Button>
          </div>
        </form>
      </div>

      {aiGeneratedSummaryList && (
        <div className="my-5">
          <h2 className="font-bold text-lg">Suggestions</h2>
          {aiGeneratedSummaryList.map((item, index) => (
            <div
              key={index}
              onClick={() => setSummary(item.summary)}
              className="p-5 shadow-lg my-4 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <h2 className="font-bold my-1 text-primary">
                Level: {item.experience_level}
              </h2>
              <p>{item.summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Summary;