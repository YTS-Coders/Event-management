import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosInstance';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';
import EventCard from '../../components/iqac/EventCard';
import IQACForm from '../../components/iqac/IQACForm';
import ReportPreview from '../../components/iqac/ReportPreview';
import EditPanel from '../../components/iqac/EditPanel';
import ExportButton from '../../components/iqac/ExportButton';
import '../../styles/dashboard.css';

const IQACReport = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generatedReport, setGeneratedReport] = useState(null);
  const [headerData, setHeaderData] = useState(null);
  const [view, setView] = useState('selection'); // selection, split

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data } = await axiosInstance.get('/api/events/my-events');
      setEvents(data);
    } catch (err) {
      toast.error('Failed to load events.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setView('split');
  };

  const handleReportGenerated = (report, meta) => {
    setGeneratedReport(report);
    setHeaderData(meta);
  };

  if (loading) return <Loader />;

  if (view === 'selection') {
    return (
      <div className="dashboard-content anim-fade-in">
        <h2 className="dash-title">IQAC Report Module</h2>
        <p className="dash-subtitle">Select an event to generate its academic compliance report.</p>

        <div className="iqac-event-grid">
          {events.length > 0 ? (
            events.map(event => (
              <EventCard 
                key={event._id} 
                event={event} 
                onClick={() => handleSelectEvent(event)} 
              />
            ))
          ) : (
            <p className="no-events text-muted">No department events found.</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-content anim-fade-in">
        <div className="iqac-top-bar">
            <button className="btn-back" onClick={() => setView('selection')}>← Back to Events</button>
            <h2 className="dash-title">Drafting Report: {selectedEvent?.title}</h2>
        </div>

        <div className="iqac-split-viewport">
            {/* Left Column: Form */}
            <div className="iqac-left-form-scroller">
                <IQACForm 
                  selectedEvent={selectedEvent} 
                  onGenerate={handleReportGenerated} 
                />
            </div>
            
            {/* Right Column: Preview & Refinement */}
            <div className="iqac-right-preview-fixed">
                <div className="preview-scroll-wrapper">
                    <ReportPreview 
                      report={generatedReport} 
                      headerData={headerData || selectedEvent} 
                    />
                    
                    {generatedReport && (
                      <div className="refinement-controls-wrapper anim-slide-up">
                        <EditPanel 
                          report={generatedReport} 
                          onUpdate={setGeneratedReport} 
                        />
                        <div className="export-row pad-v-10">
                            <ExportButton 
                              report={generatedReport} 
                              headerData={headerData || selectedEvent} 
                            />
                        </div>
                      </div>
                    )}
                </div>
            </div>
        </div>
    </div>
  );
};

export default IQACReport;
