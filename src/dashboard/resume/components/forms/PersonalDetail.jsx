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
    <div className="p-5 shadow-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Personal Detail</h2>
      <p>Get Started with the basic information</p>

      <form onSubmit={onSave}>
        <div className="grid grid-cols-2 mt-5 gap-3">
          <div>
            <label className="text-sm">First Name</label>
            <Input
              name="firstName"
              value={formData?.firstName ?? ""}
              required
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-sm">Last Name</label>
            <Input
              name="lastName"
              value={formData?.lastName ?? ""}
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Job Title</label>
            <Input
              name="jobTitle"
              value={formData?.jobTitle ?? ""}
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Address</label>
            <Input
              name="address"
              value={formData?.address ?? ""}
              required
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-sm">Phone</label>
            <Input
              name="phone"
              value={formData?.phone ?? ""}
              required
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-sm">Email</label>
            <Input
              name="email"
              value={formData?.email ?? ""}
              required
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="mt-3 flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PersonalDetail;