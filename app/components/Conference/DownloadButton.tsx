'use client';

import { useState, useEffect } from 'react';
import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, TextRun, AlignmentType } from 'docx';
import axios from 'axios';
import { htmlToText } from 'html-to-text';

type Conference = {
  id: number;
  name: string;
};

interface Paper {
  paper_title: string;
  abstract: string;
}

type DownloadButtonProps = {
  userId: number;
};

const DownloadButton: React.FC<DownloadButtonProps> = ({ userId }) => {
  const [conferences, setConferences] = useState<Conference[]>([]);
  const [selectedConference, setSelectedConference] = useState<number | null>(null);

  useEffect(() => {
    const fetchConferences = async () => {
      try {
        const response = await axios.get(`/api/conferences/${userId}`);
        console.log('Conferences API Response:', response);

        if (response.data === null || !Array.isArray(response.data)) {
          console.error('Unexpected data format:', response.data);
          setConferences([]);
        } else {
          setConferences(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch conferences', error);
        setConferences([]);
      }
    };
    fetchConferences();
  }, [userId]);

  const handleDownload = async () => {
    if (selectedConference === null) {
      alert('Please select a conference');
      return;
    }

    try {
      const response = await axios.get(`/api/downloadabstract?conferenceId=${selectedConference}`);
      console.log('Papers API Response:', response);

      const papers: Paper[] = response.data;

      if (!Array.isArray(papers)) {
        console.error('Unexpected papers format:', papers);
        return;
      }

      const doc = new Document({
        sections: papers.map((paper) => ({
          properties: {},
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              spacing: { line: 1.5 * 240 },
              children: [
                new TextRun({
                  text: paper.paper_title,
                  bold: true,
                  font: 'Times New Roman',
                  size: 24,
                }),
              ],
              pageBreakBefore: true,
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: '',
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.JUSTIFIED,
              spacing: { line: 1.5 * 240 },
              children: [
                new TextRun({
                  text: htmlToText(paper.abstract),
                  font: 'Times New Roman',
                  size: 24,
                }),
              ],
            }),
          ],
        })),
      });

      const blob = await Packer.toBlob(doc);
      saveAs(blob, 'papers.docx');
    } catch (error) {
      console.error('Failed to download document', error);
    }
  };

  return (
    <div className="flex-1">
      <label htmlFor="conference" className="block text-sm font-medium text-gray-700 mb-2">
        Select Conference
      </label>
      <select
        id="conference"
        name="conference"
        className="block w-full pl-4 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-950 focus:border-blue-950 sm:text-sm rounded-lg bg-white shadow-sm"
        onChange={(e) => setSelectedConference(Number(e.target.value))}
        value={selectedConference || ''}
      >
        <option value="">Select a Conference</option>
        {conferences.length > 0 ? (
          conferences.map((conference) => (
            <option key={conference.id} value={conference.id}>
              {conference.name}
            </option>
          ))
        ) : (
          <option value="">No conferences available</option>
        )}
      </select>
      <button
        onClick={handleDownload}
        className="mt-4 px-4 py-2 bg-blue-950 text-white rounded-full hover:bg-orange-500"
      >
        Download Abstract
      </button>
    </div>
  );
};

export default DownloadButton;
