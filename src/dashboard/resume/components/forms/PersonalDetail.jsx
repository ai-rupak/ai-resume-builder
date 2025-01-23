import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { LoaderCircle } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ResumeApi from './../../../../../service/GlobalApi';
import { toast } from 'react-toastify';

function PersonalDetail({ enabledNext }) {
  const params = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (params?.resumeId) {
        setInitialLoading(true);
        try {
          const response = await ResumeApi.getResumeById(params.resumeId);
          const resumeData = response.data?.data || response.data || {};
          setFormData(resumeData);
          setResumeInfo(resumeData);
        } catch (error) {
          toast.error('Error loading resume data');
        } finally {
          setInitialLoading(false);
        }
      }
    };

    fetchData();
  }, [params?.resumeId, setResumeInfo]);

  useEffect(() => {
    if (resumeInfo && Object.keys(resumeInfo).length > 0) {
      setFormData(resumeInfo);
    }
  }, [resumeInfo]);

  useEffect(() => {
    const isComplete =
      formData?.firstName &&
      formData?.lastName &&
      formData?.jobTitle &&
      formData?.address &&
      formData?.phone &&
      formData?.email;
    enabledNext(isComplete);
  }, [formData, enabledNext]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    setResumeInfo(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await ResumeApi.updateResume(params?.resumeId, formData);
      toast.success("Details updated successfully");
    } catch (error) {
      toast.error("Error in updating details");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="p-5 shadow-lg border-t-primary border-t-4 mt-10 flex justify-center items-center">
        <LoaderCircle className="animate-spin h-8 w-8" />
      </div>
    );
  }

  return (
    <div className="">
      <h2 className="text-2xl font-bold text-[#0A1F44] mb-4">PERSONAL DETAILS</h2>
      <p className='text-gray-600 mb-6'>What's the best way for employers to contact you?</p>

      <form onSubmit={onSave} className='space-y-6'>
        <div className="grid grid-cols-2 mt-5 gap-4">
          <div className='space-y-2'>
            <label className="block">FIRST NAME <span className='text-red-500'>*</span></label>
            <Input
              name="firstName"
              value={formData?.firstName ?? ""}
              required
              onChange={handleInputChange}
              className="rounded-none shadow-none border-[#0A1F44]"
            />
          </div>
          <div className='space-y-2'>
            <label className="block">LAST NAME <span className='text-red-500'>*</span></label>
            <Input
              name="lastName"
              value={formData?.lastName ?? ""}
              required
              onChange={handleInputChange}
              className="rounded-none shadow-none border-[#0A1F44]"
            />
          </div>
          <div className="col-span-2 space-y-2">
            <label className="block">JOB TITLE<span className='text-red-500'>*</span></label>
            <Input
              name="jobTitle"
              value={formData?.jobTitle ?? ""}
              required
              onChange={handleInputChange}
              className="rounded-none shadow-none border-[#0A1F44]"
            />
          </div>
          <div className="col-span-2 space-y-2">
            <label className="block">ADDRESS<span className='text-red-500'>*</span></label>
            <Input
              name="address"
              value={formData?.address ?? ""}
              required
              onChange={handleInputChange}
              className="rounded-none shadow-none border-[#0A1F44]"
            />
          </div>
          <div>
            <label className="block space-y-2">PHONE<span className='text-red-500'>*</span></label>
            <Input
              name="phone"
              value={formData?.phone ?? ""}
              required
              onChange={handleInputChange}
              className="rounded-none shadow-none border-[#0A1F44]"
            />
          </div>
          <div>
            <label className="block space-y-2">EMAIL<span className='text-red-500'>*</span></label>
            <Input
              name="email"
              value={formData?.email ?? ""}
              required
              onChange={handleInputChange}
              className="rounded-none shadow-none border-[#0A1F44]"
            />
          </div>
        </div>
        <div className="mt-3 flex justify-end">
          <Button type="submit" disabled={loading} className='bg-teal-600 hover:bg-teal-700 rounded-none'>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PersonalDetail;