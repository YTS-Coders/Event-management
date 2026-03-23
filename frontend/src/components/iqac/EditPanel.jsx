import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '../../api/axiosInstance';
import '../../styles/dashboard.css';

const EditPanel = ({ report, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(report);
  const [aiInstruction, setAiInstruction] = useState('');
  const [loading, setLoading] = useState(false);

  const handleManualSave = () => {
    onUpdate(editedContent);
    setIsEditing(false);
    toast.success('Manual changes saved!');
  };

  const handleAIRefine = async () => {
    if (!aiInstruction) return toast.warning('What would you like to change?');
    setLoading(true);

    try {
      const { data } = await axiosInstance.post('/api/iqac/modify', {
        currentReport: editedContent,
        instruction: aiInstruction
      });
      onUpdate(data.report);
      setEditedContent(data.report);
      setAiInstruction('');
      toast.success('AI refinement applied!');
    } catch (err) {
      toast.error('AI failed to refine. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="post-generation-controls anim-slide-up">
      <div className="panel-header">
        <h3 className="section-title">✨ Final Refinement</h3>
        <button 
          className={`btn-sm ${isEditing ? 'btn-success' : 'btn-secondary'}`} 
          onClick={() => isEditing ? handleManualSave() : setIsEditing(true)}
        >
          {isEditing ? '💾 Save Changes' : '✏️ Manual Edit'}
        </button>
      </div>

      <div className="manual-edit-area">
        {isEditing ? (
          <div>
            <p className="edit-hint">You are in edit mode. Modify the text below and click save.</p>
            <textarea 
              className="manual-editor" 
              rows="15" 
              value={editedContent} 
              onChange={e => setEditedContent(e.target.value)} 
            />
          </div>
        ) : (
          <p className="edit-indicator">✅ Report draft is ready. You can manually edit or use AI below to refine.</p>
        )}
      </div>

      <div className="ai-refine-box shadow-indigo">
        <label>🪄 Refine with Gemini AI</label>
        <div className="refine-row">
          <input 
            type="text" 
            placeholder="e.g. 'Make it more professional', 'Expand the outcome section'..." 
            value={aiInstruction} 
            onChange={e => setAiInstruction(e.target.value)} 
          />
          <button 
            className="btn-primary btn-sm refine-btn" 
            onClick={handleAIRefine}
            disabled={loading}
          >
            {loading ? <span className="spinner"></span> : 'Apply AI Magic 🚀'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPanel;
