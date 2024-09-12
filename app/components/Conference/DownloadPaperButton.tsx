'use client';

import { useState, useEffect } from 'react';
import { saveAs } from 'file-saver';
import axios from 'axios';
import { PDFDocument } from 'pdf-lib';

type Conference = {
  id: number;
  name: string;
};

type PaperSubmission = {
  paper_title: string;
  paper: string;
};

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
        setConferences(response.data);
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
      const response = await axios.get(`/api/downloadpapers?conferenceId=${selectedConference}`);
      const papers: PaperSubmission[] = response.data;

      if (!Array.isArray(papers) || papers.length === 0) {
        console.error('No papers found or unexpected format:', papers);
        return;
      }

      const mergedPdf = await PDFDocument.create();

      for (const paper of papers) {
        const pdfPath = `/uploads/papers/${paper.paper}`;
        const pdfBytes = await fetch(pdfPath).then((res) => res.arrayBuffer());
        const pdf = await PDFDocument.load(pdfBytes);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedPdfBytes = await mergedPdf.save();
      const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
      saveAs(blob, 'merged_papers.pdf');
    } catch (error) {
      console.error('Failed to download or merge PDFs', error);
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
        Download Papers
      </button>
    </div>
  );
};

export default DownloadButton;
