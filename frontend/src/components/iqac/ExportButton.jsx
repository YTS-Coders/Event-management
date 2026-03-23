import React from 'react';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, ImageRun, BorderStyle } from 'docx';
import { saveAs } from 'file-saver';
import { toast } from 'react-toastify';
import '../../styles/dashboard.css';

const ExportButton = ({ report, headerData }) => {
  const readImageAsBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const exportToDocx = async () => {
    if (!report) return toast.error('No report generated yet.');

    const sections = [];

    // Header Section
    const children = [
      new Paragraph({
        text: "INTERNAL QUALITY ASSURANCE CELL (IQAC)",
        heading: HeadingLevel.HEADING_1,
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 },
      }),
      new Paragraph({
        text: "SACRED HEART COLLEGE (AUTONOMOUS), TIRUPATTUR",
        alignment: AlignmentType.CENTER,
        spacing: { after: 400 },
      }),
      new Paragraph({
        text: "EVENT COMPLETION REPORT",
        heading: HeadingLevel.HEADING_2,
        alignment: AlignmentType.CENTER,
        spacing: { after: 600 },
      }),
      // SECTION 1: HEADER INFO
      new Paragraph({
        children: [
          new TextRun({ text: "Department: ", bold: true }),
          new TextRun(headerData.department || 'N/A'),
        ],
        spacing: { after: 120 },
      }),
      new Paragraph({
        children: [
          new TextRun({ text: "Event Type: ", bold: true }),
          new TextRun("Skill Empowerment Session"),
        ],
        spacing: { after: 120 },
      }),
      new Paragraph({
        children: [
          new TextRun({ text: "Event Title: ", bold: true }),
          new TextRun(headerData.title || 'N/A'),
        ],
        spacing: { after: 400 },
      }),

      // SECTION 2: EVENT DETAILS
      new Paragraph({
        text: "EVENT DETAILS",
        heading: HeadingLevel.HEADING_3,
        spacing: { before: 200, after: 200 },
      }),
      new Paragraph({
        children: [
          new TextRun({ text: "Date: ", bold: true }),
          new TextRun(headerData.date || 'TBD'),
          new TextRun({ text: " | Time: ", bold: true }),
          new TextRun(headerData.time || 'TBD'),
          new TextRun({ text: " | Venue: ", bold: true }),
          new TextRun(headerData.venue || 'TBD'),
        ],
        spacing: { after: 400 },
      }),

      // SECTION 3: RESOURCE PERSON
      new Paragraph({
        text: "RESOURCE PERSON PROFILE",
        heading: HeadingLevel.HEADING_3,
        spacing: { before: 200, after: 200 },
      }),
      new Paragraph({
        children: [
          new TextRun({ text: "Name: ", bold: true }),
          new TextRun(headerData.rpName || 'N/A'),
          new TextRun({ text: " | Designation: ", bold: true }),
          new TextRun(headerData.rpDesignation || 'N/A'),
        ],
        spacing: { after: 120 },
      }),
      new Paragraph({
        children: [
          new TextRun({ text: "Experience: ", bold: true }),
          new TextRun(headerData.rpExperience || 'N/A'),
          new TextRun({ text: " | Qualification: ", bold: true }),
          new TextRun(headerData.rpQualification || 'N/A'),
        ],
        spacing: { after: 400 },
      }),
    ];

    // Add Invitation Image EARLY if exists
    if (headerData.invitationImage) {
      try {
        const base64Inv = await readImageAsBase64(headerData.invitationImage);
        children.push(new Paragraph({
          text: "INVITATION POSTER",
          heading: HeadingLevel.HEADING_3,
          spacing: { before: 400, after: 200 },
        }));
        children.push(new Paragraph({
          children: [
            new ImageRun({
              data: Uint8Array.from(atob(base64Inv), c => c.charCodeAt(0)),
              transformation: { width: 500, height: 350 },
            }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: { after: 400 },
        }));
      } catch (e) { console.error("Inv Image error", e); }
    }

    // Add Profile of Resource Person if exists (The Uploaded one)
    if (headerData.resourcePersonProfile) {
      const isImg = headerData.resourcePersonProfile.type.startsWith('image/');
      children.push(new Paragraph({
        text: "RESOURCE PERSON PROFILE",
        heading: HeadingLevel.HEADING_3,
        spacing: { before: 400, after: 200 },
      }));

      if (isImg) {
        try {
          const base64Prof = await readImageAsBase64(headerData.resourcePersonProfile);
          children.push(new Paragraph({
            children: [
              new ImageRun({
                data: Uint8Array.from(atob(base64Prof), c => c.charCodeAt(0)),
                transformation: { width: 500, height: 400 },
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 },
          }));
        } catch (e) { console.error("Profile Image error", e); }
      } else {
        // If PDF, just add a formal placeholder as Word cannot render PDF picture
        children.push(new Paragraph({
          children: [
            new TextRun({ 
               text: "[DOCUMENT ATTACHED: PDF Profile - Refer to official file appendix]", 
               italics: true,
               color: "999999"
            }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: { after: 400 },
        }));
      }
    }

    // Add Report Content (Introduction, Flow, Breakdown, Outcome, Agenda, Conclusion)
    report.split('\n').forEach(line => {
      const isHeader = line.match(/^[1-9]\./) || line.match(/^[A-Z\s]+:$/);
      if (isHeader && line.trim().length > 0) {
        children.push(new Paragraph({
          children: [
            new TextRun({
              text: line.trim(),
              bold: true,
              size: 24,
              color: "000000",
            })
          ],
          spacing: { before: 300, after: 150 },
          border: { bottom: { color: "000000", space: 1, style: BorderStyle.SINGLE, size: 2 } }
        }));
      } else if (line.trim().length > 0) {
        children.push(new Paragraph({
          text: line.trim(),
          spacing: { after: 150 },
          alignment: AlignmentType.JUSTIFY,
        }));
      }
    });

    // Add Attendance Image if exists
    if (headerData.attendanceImage) {
      try {
        const base64At = await readImageAsBase64(headerData.attendanceImage);
        children.push(new Paragraph({
          text: "ATTENDANCE SHEET",
          heading: HeadingLevel.HEADING_3,
          spacing: { before: 600, after: 200 },
        }));
        children.push(new Paragraph({
          children: [
            new ImageRun({
              data: Uint8Array.from(atob(base64At), c => c.charCodeAt(0)),
              transformation: { width: 500, height: 600 },
            }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: { after: 400 },
        }));
      } catch (e) { console.error("Attendance Image error", e); }
    }

    // Add Feedback Image if exists
    if (headerData.feedbackImage) {
      try {
        const base64Fb = await readImageAsBase64(headerData.feedbackImage);
        children.push(new Paragraph({
          text: "FEEDBACK ANALYSIS",
          heading: HeadingLevel.HEADING_3,
          spacing: { before: 600, after: 200 },
        }));
        children.push(new Paragraph({
          children: [
            new ImageRun({
              data: Uint8Array.from(atob(base64Fb), c => c.charCodeAt(0)),
              transformation: { width: 500, height: 600 },
            }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: { after: 400 },
        }));
      } catch (e) { console.error("Feedback Image error", e); }
    }

    // Add Event Images (Photographs)
    if (headerData.eventImages && headerData.eventImages.length > 0) {
      children.push(new Paragraph({
        text: "EVENT GEOTAGGED PHOTOGRAPHS",
        heading: HeadingLevel.HEADING_3,
        spacing: { before: 600, after: 300 },
      }));

      for (const img of headerData.eventImages) {
        try {
          const base64Img = await readImageAsBase64(img);
          children.push(new Paragraph({
            children: [
              new ImageRun({
                data: Uint8Array.from(atob(base64Img), c => c.charCodeAt(0)),
                transformation: { width: 350, height: 260 },
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
          }));
        } catch (e) { console.error("Img error", e); }
      }
    }

    // FINAL SECTION: SIGNATURE BLOCK
    children.push(new Paragraph({ text: "", spacing: { before: 1000 } })); // Spacer
    children.push(new Paragraph({
        children: [
            new TextRun({ text: "Faculty In-charge", bold: true }),
            new TextRun({ text: "\t\t\t\t\t\t\t" }), // Tabs for spacing
            new TextRun({ text: "Head of the Department", bold: true }),
        ],
        alignment: AlignmentType.LEFT,
    }));
    children.push(new Paragraph({
        children: [
            new TextRun({ text: "(Signature)", italics: true }),
            new TextRun({ text: "\t\t\t\t\t\t\t" }),
            new TextRun({ text: "(Signature & Seal)", italics: true }),
        ],
        alignment: AlignmentType.LEFT,
    }));

    const doc = new Document({
      sections: [{
        properties: {
            page: { margin: { top: 720, right: 720, bottom: 720, left: 720 } } // 0.5 inch margins
        },
        children,
      }],
    });

    try {
      const blob = await Packer.toBlob(doc);
      saveAs(blob, `IQAC_Report_${(headerData.title || 'Event').replace(/\s+/g, '_')}.docx`);
      toast.success('Professional IQAC Report Exported! 📄');
    } catch (err) {
      toast.error('Export failed. Check console for details.');
      console.error(err);
    }
  };

  return (
    <button
      className="btn-success export-btn shadow-brass full-width"
      onClick={exportToDocx}
    >
      📄 Export Word (.docx)
    </button>
  );
};

export default ExportButton;
