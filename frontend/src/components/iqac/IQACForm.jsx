import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import axiosInstance from '../../api/axiosInstance';
import '../../styles/dashboard.css';

const IQACForm = ({ selectedEvent, onGenerate }) => {
  const [formData, setFormData] = useState({
    title: selectedEvent?.title || '',
    description: selectedEvent?.description || '',
    rpName: '',
    rpDesignation: '',
    rpExperience: '',
    rpQualification: '',
    duration: '',
    date: selectedEvent?.date ? new Date(selectedEvent.date).toLocaleDateString() : '',
    time: '',
    venue: selectedEvent?.venue || '',
    department: selectedEvent?.department || '',
  });

  const [invitationImage, setInvitationImage] = useState(null);
  const [resourcePersonProfile, setResourcePersonProfile] = useState(null);
  const [attendanceImage, setAttendanceImage] = useState(null);
  const [feedbackImage, setFeedbackImage] = useState(null);
  const [eventImages, setEventImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const onInvitationDrop = (acceptedFiles) => setInvitationImage(acceptedFiles[0]);
  const onProfileDrop = (acceptedFiles) => setResourcePersonProfile(acceptedFiles[0]);
  const onAttendanceDrop = (acceptedFiles) => setAttendanceImage(acceptedFiles[0]);
  const onFeedbackDrop = (acceptedFiles) => setFeedbackImage(acceptedFiles[0]);
  const onEventImagesDrop = (acceptedFiles) => setEventImages([...eventImages, ...acceptedFiles].slice(0, 5));

  const { getRootProps: getInvRoot, getInputProps: getInvInput } = useDropzone({
    onDrop: onInvitationDrop,
    multiple: false,
    accept: { 'image/*': ['.png', '.jpg', '.jpeg'] }
  });

  const { getRootProps: getProfRoot, getInputProps: getProfInput } = useDropzone({
    onDrop: onProfileDrop,
    multiple: false,
    accept: { 'image/*': ['.png', '.jpg', '.jpeg'] }
  });

  const { getRootProps: getAttRoot, getInputProps: getAttInput } = useDropzone({
    onDrop: onAttendanceDrop,
    multiple: false,
    accept: { 'image/*': ['.png', '.jpg', '.jpeg'] }
  });

  const { getRootProps: getFbRoot, getInputProps: getFbInput } = useDropzone({
    onDrop: onFeedbackDrop,
    multiple: false,
    accept: { 'image/*': ['.png', '.jpg', '.jpeg'] }
  });

  const { getRootProps: getImgRoot, getInputProps: getImgInput } = useDropzone({
    onDrop: onEventImagesDrop,
    multiple: true,
    accept: { 'image/*': ['.png', '.jpg', '.jpeg'] }
  });

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    
    // Prepare multi-part form data
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (invitationImage) data.append('invitationImage', invitationImage);
    if (resourcePersonProfile) data.append('resourcePersonProfile', resourcePersonProfile);
    if (attendanceImage) data.append('attendanceImage', attendanceImage);
    if (feedbackImage) data.append('feedbackImage', feedbackImage);
    eventImages.forEach(img => data.append('eventImages', img));

    try {
      const response = await axiosInstance.post('/api/iqac/generate', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      onGenerate(response.data.report, { 
        ...formData, 
        invitationImage, 
        resourcePersonProfile,
        attendanceImage,
        feedbackImage,
        eventImages 
      });
      toast.success('IQAC Intelligent Report Drafted!');
    } catch (err) {
      toast.error('AI Generation failed. Check console.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="iqac-form-container card" onSubmit={handleSubmit}>
      <h3 className="section-title">Step 2: Event Information</h3>
      <p className="section-desc">Fill in structured data for academic compliance.</p>

      <div className="form-grid">
        <div className="input-group full-width">
          <label>Event Title</label>
          <input 
            type="text" 
            value={formData.title} 
            onChange={e => setFormData({ ...formData, title: e.target.value })} 
            placeholder="Official event name..."
            required
          />
        </div>

        <div className="input-group full-width">
          <label>Event Context / Description</label>
          <textarea 
            rows="4" 
            value={formData.description} 
            onChange={e => setFormData({ ...formData, description: e.target.value })} 
            placeholder="Key activities, session highlights, goals..."
            required
          />
        </div>

        <div className="input-group full-width bg-light-tint pad-20 border-radius-8">
          <label className="text-burgundy bold">Resource Person Details</label>
          <div className="sub-grid-3">
             <input placeholder="Name" value={formData.rpName} onChange={e => setFormData({...formData, rpName: e.target.value})} required />
             <input placeholder="Designation" value={formData.rpDesignation} onChange={e => setFormData({...formData, rpDesignation: e.target.value})} required />
             <input placeholder="Qualification" value={formData.rpQualification} onChange={e => setFormData({...formData, rpQualification: e.target.value})} />
          </div>
          <input placeholder="Experience (e.g. 10+ Years)" className="mar-t-10 full-width" value={formData.rpExperience} onChange={e => setFormData({...formData, rpExperience: e.target.value})} />
        </div>

        <div className="input-group full-width">
          <div className="sub-grid-3">
            <div>
              <label>Date</label>
              <input type="text" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} required />
            </div>
            <div>
              <label>Time</label>
              <input type="text" value={formData.time} onChange={e => setFormData({ ...formData, time: e.target.value })} placeholder="e.g. 10:00 AM" required />
            </div>
            <div>
              <label>Venue</label>
              <input type="text" value={formData.venue} onChange={e => setFormData({ ...formData, venue: e.target.value })} required />
            </div>
          </div>
          <div className="mar-t-10">
              <label>Duration</label>
              <input type="text" className="full-width" value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} placeholder="e.g. 3 Hours (or) 2 Days" />
          </div>
        </div>
      </div>

      <div className="uploads-checklist">
        <h4 className="checklist-title">Step 3: Support Documents (Mandatory)</h4>
        <div className="checklist-grid">
          <div className="upload-box">
            <label>1. Invitation</label>
            <div {...getInvRoot()} className="dropzone-slim">
              <input {...getInvInput()} />
              <p className="prompt">{invitationImage ? `✅ Added` : 'Drop Image Only'}</p>
            </div>
          </div>
          <div className="upload-box">
            <label>2. RP Profile</label>
            <div {...getProfRoot()} className="dropzone-slim">
              <input {...getProfInput()} />
              <p className="prompt">{resourcePersonProfile ? `✅ Added` : 'Drop Image Only'}</p>
            </div>
          </div>
          <div className="upload-box">
            <label>3. Attendance</label>
            <div {...getAttRoot()} className="dropzone-slim">
              <input {...getAttInput()} />
              <p className="prompt">{attendanceImage ? `✅ Added` : 'Drop Image Only'}</p>
            </div>
          </div>
          <div className="upload-box">
            <label>4. Feedback</label>
            <div {...getFbRoot()} className="dropzone-slim">
              <input {...getFbInput()} />
              <p className="prompt">{feedbackImage ? `✅ Added` : 'Drop Image Only'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="pics-upload-full">
        <label>5. Event Geotagged Photographs (1-5)</label>
        <div {...getImgRoot()} className="dropzone-slim">
          <input {...getImgInput()} />
          <p className="prompt">
            {eventImages.length > 0 ? `✅ ${eventImages.length} images added` : 'Drop Images Here'}
          </p>
        </div>
      </div>

      <button 
        type="submit" 
        className="btn-primary full-width iqac-btn shadow-brass mar-t-20"
        disabled={loading}
      >
        {loading ? (
          <><span className="spinner"></span> Generating Intelligent Report...</>
        ) : (
          'Draft Formal IQAC Report ✨'
        )}
      </button>
    </form>
  );
};

export default IQACForm;
