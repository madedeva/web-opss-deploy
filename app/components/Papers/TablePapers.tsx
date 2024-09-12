'use client';
import { useEffect, useState } from 'react';
import { User } from '@prisma/client';
import UpdatePaper from '@/app/dashboard/papers/updatePaper';
import { useSession } from 'next-auth/react';
import axios from "axios";
import DownloadButton from '../Conference/DownloadButton';
import DOMPurify from 'dompurify';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DownloadPaperButton from '../Conference/DownloadPaperButton';

const getOrdinalSuffix = (day: number) => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
    }
};

const getFormattedDate = (date: Date | string): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const day = dateObj.getDate();
    const month = dateObj.toLocaleString('en-US', { month: 'long' });
    const year = dateObj.getFullYear();
    const suffix = getOrdinalSuffix(day);
    return `${month} ${day}${suffix}, ${year}`;
};

type Paper = {
    id: number;
    paper_title: string;
    institution: string;
    topic: string;
    abstract: string;
    keywords: string;
    country: string;
    city: string;
    status: string;
    paper: string;
    userId: number;
    conferenceId: number;
    createdAt: Date;
    user: {
        id: number;
        name: string;
        email: string;
    };
    conference: {
        id: number;
        name: string;
        description: string;
        submission_deadlineStart: Date;
        submission_deadlineEnd: Date;
        paper_template: string;
        User: {
            name: string;
            email: string;
        };
    };
};

const TablePapers = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null);
    const [papers, setPapers] = useState<Paper[]>([]);
    const [users, setUser] = useState<User[]>([]);
    const [selectedConference, setSelectedConference] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const { data: session, status } = useSession();
    const [user, setUserSession] = useState<User>();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const [selectedStatus, setSelectedStatus] = useState<string>('all');
    
    // send email
    const [selectedUserId, setSelectedUserId] = useState<number[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [subject, setSubject] = useState('');
    const [messageTemplate, setMessageTemplate] = useState('');

    const handleModalOpen = (paper: Paper) => {
        setSelectedPaper(paper);
        setIsOpen(true);
    };

    const handleModalClose = () => {
        setSelectedPaper(null);
        setIsOpen(false);
    };

    // get paper data
    useEffect(() => {
        if (session?.user) {
            const user = session.user as User;
            setUserSession(user);
        }

        const fetchPapers = async () => {
            try {
                const response = await fetch(`/api/papersubmission?userId=${user!.id}`);
                const data: Paper[] = await response.json();
                setPapers(data);
            } catch (error) {
                console.error('Error fetching papers:', error);
            }
        };

        const getUser = async () => {
            const res = await fetch('/api/users');
            const data: User[] = await res.json();
            setUser(data);
        };

        getUser();
        if (status !== 'loading') {
            fetchPapers();
        }
    }, [session]);

    // send email start
    useEffect(() => {
        async function fetchUsers() {
          try {
            const response = await axios.get('/api/send-email-users');
            setUser(response.data);
          } catch (error) {
            console.error('Failed to fetch user data', error);
          }
        }
        fetchUsers();
      }, []);

      const handleCheckboxChange = (userId: number) => {
        setSelectedUserId((prevSelected) =>
          prevSelected.includes(userId)
            ? prevSelected.filter((id) => id !== userId)
            : [...prevSelected, userId]
        );
      };
      
     const handleSelectAll = () => {
        setSelectedUserId(prev => {
          return prev.length === paginatedPapers.length 
            ? [] 
            : paginatedPapers.map(paper => paper.userId);
        });
      };

      useEffect(() => {
        console.log("Selected User IDs:", selectedUserId);
        console.log("Selected User paper:", papers);
      }, [selectedUserId]);

      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        if (selectedUserId.length === 0) {
          alert('Select at least one user to send email');
          return;
        }
    
        try {
          await axios.post('/api/send-email', {
            userId: selectedUserId,
            subject,
            messageTemplate,
          });
    
          toast.success('Email send successfully!');
          setIsModalOpen(false);
          setSubject('');
          setMessageTemplate('');
          setSelectedUserId([]);
        } catch (error) {
          console.error('Failed to send email', error);
          toast.error('Failed to send email');
        }
      };
    // end send email

    const handleConferenceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedConference(e.target.value || null);
        setCurrentPage(1);
    };

    const handleStatusChange = (status: string) => {
        setSelectedStatus(status);
        setCurrentPage(1);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const uniqueConferenceIds = Array.from(new Set(papers.map((paper) => paper.conferenceId)));

    // search function
    const filteredPapersByStatus = papers.filter((paper) => {
        const statusMatches = selectedStatus === 'all' || paper.status.toLowerCase() === selectedStatus.toLowerCase();
        const conferenceMatches = !selectedConference || paper.conferenceId.toString() === selectedConference;
        const searchMatches = 
            paper.paper_title.toLowerCase().includes(searchQuery.toLowerCase()) || 
            paper.abstract.toLowerCase().includes(searchQuery.toLowerCase()) || 
            paper.keywords.toLowerCase().includes(searchQuery.toLowerCase()) || 
            paper.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
            paper.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            paper.user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            paper.institution.toLowerCase().includes(searchQuery.toLowerCase()) ||
            paper.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
            paper.country.toLowerCase().includes(searchQuery.toLowerCase());
    
        return statusMatches && conferenceMatches && searchMatches;
    });

    const filteredPapers = selectedConference
        ? papers.filter((paper) => paper.conferenceId.toString() === selectedConference)
        : papers;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedPapers = filteredPapersByStatus.slice(startIndex, startIndex + itemsPerPage);
    const totalPages = Math.ceil(filteredPapersByStatus.length / itemsPerPage);

    return (
        <div className="bg-white p-6 rounded-lg">
            <div className="mt-6">
                <h3 className="text-lg font-medium">Submitted Papers</h3>
                <p className="text-sm text-gray-600">
                    The following are papers submitted by authors, you can manage these papers.
                </p>
                <hr className="mt-2" />

                <div className="mt-6 flex space-x-4">
                    {user && <DownloadButton userId={user.id} />}
                    {user && <DownloadPaperButton userId={user.id} />}
                </div>
                <div className="mt-6 flex space-x-4">
                    <div className="flex-1">
                        <label 
                            htmlFor="search"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Search Papers
                        </label>
                        <input
                            id="search"
                            type="text"
                            placeholder="Search by title, abstract, keywords, or topic..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="block w-full pl-4 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-950 focus:border-blue-950 sm:text-sm rounded-lg bg-white shadow-sm transition duration-200 ease-in-out"
                        />
                    </div>

                    <div className="flex-1">
                        <label 
                            htmlFor="conference" 
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Filter Paper Conference
                        </label>
                        <div className="relative">
                            <select
                                id="conference"
                                name="conference"
                                className="block w-full pl-4 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-950 focus:border-blue-950 sm:text-sm rounded-lg bg-white shadow-sm transition duration-200 ease-in-out"
                                onChange={handleConferenceChange}
                                value={selectedConference || ''}
                            >
                                <option value="">All Conferences</option>
                                {uniqueConferenceIds.map((conferenceId) => (
                                    <option key={conferenceId} value={conferenceId.toString()}>
                                        {papers.find((paper) => paper.conferenceId === conferenceId)?.conference.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="mt-6">
                    <div className="flex space-x-4">
                        <button
                            className={`px-4 py-2 rounded-full ${selectedStatus === 'all' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                            onClick={() => handleStatusChange('all')}
                        >
                            All Papers
                        </button>
                        <button
                            onClick={() => { setSelectedStatus('Submitted'); setCurrentPage(1); }}
                            className={`px-4 py-2 rounded-full ${selectedStatus === 'Submitted' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-200 text-gray-700'}`}
                        >
                            Submitted
                        </button>
                        <button
                            onClick={() => { setSelectedStatus('Revision'); setCurrentPage(1); }}
                            className={`px-4 py-2 rounded-full ${selectedStatus === 'Revision' ? 'bg-blue-100 text-blue-800' : 'bg-gray-200 text-gray-700'}`}
                        >
                            Revision
                        </button>
                        <button
                            onClick={() => { setSelectedStatus('Accepted'); setCurrentPage(1); }}
                            className={`px-4 py-2 rounded-full ${selectedStatus === 'Accepted' ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-700'}`}
                        >
                            Accepted
                        </button>
                        <button
                            onClick={() => { setSelectedStatus('Rejected'); setCurrentPage(1); }}
                            className={`px-4 py-2 rounded-full ${selectedStatus === 'Rejected' ? 'bg-red-100 text-red-800' : 'bg-gray-200 text-gray-700'}`}
                        >
                            Rejected
                        </button>

                        <button
                            onClick={() => setIsOpen(true)}
                            disabled={selectedUserId.length === 0}
                            className={`px-4 py-2 rounded-full ${selectedUserId.length === 0 ? 'bg-gray-300' : 'bg-blue-500'} text-white`}
                            >
                            Send Email
                        </button>
                    </div>
                </div>

                <table className="min-w-full divide-y divide-gray-200 mt-6">
                    <thead className="bg-gray-50">
                        <tr className="text-xs border-b border-gray-200">
                            <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider flex">
                                <input
                                id="allpaper"
                                className='mr-2'
                                type="checkbox"
                                checked={selectedUserId.length === paginatedPapers.length && paginatedPapers.length > 0}
                                onChange={handleSelectAll}
                                />
                                Select All
                            </th>
                            <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Paper Title
                            </th>
                            <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Author
                            </th>
                            <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Submit Date
                            </th>
                            <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Topic, Abstract, Keywords
                            </th>
                            <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                City, Country
                            </th>
                            <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Paper File
                            </th>
                            <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedPapers.map((paper) => (
                            <tr key={paper.id} className="text-gray-700 text-xs border-b border-gray-200">
                                <td className="px-4 py-2 text-center">
                                    <input
                                    id={paper.id.toString()}
                                    type="checkbox"
                                    checked={selectedUserId.includes(paper.userId)}
                                    onChange={() => handleCheckboxChange(paper.userId)}
                                    />
                                </td>
                                <td className="py-2 px-4">{paper.paper_title}</td>
                                <td className="py-2 px-4">
                                    <p className='font-bold'>{paper.user.name},</p><p>({paper.institution}, {paper.user.email})</p>
                                </td>
                                <td className="py-2 px-4">{getFormattedDate(paper.createdAt)}</td>
                                <td className="py-2 px-4">
                                    <p className='font-bold'>Topic</p>
                                    <p>{paper.topic}</p>
                                    <p className="mt-4 font-bold">Abstract</p>
                                    <button className="text-xs text-blue-950 underline hover:text-indigo-900" onClick={() => handleModalOpen(paper)}>
                                        View abstract
                                    </button>
                                    <p className="mt-4 font-bold">Keywords</p>
                                    <p>{paper.keywords}</p>
                                </td>
                                <td className="py-2 px-4">{paper.city}, {paper.country}</td>
                                <td className="py-2 px-4">
                                {paper.status === 'Accepted' && (
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    Accepted
                                </span>
                                )}

                                {paper.status === 'Submitted' && (
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                    Submitted
                                </span>
                                )}

                                {paper.status === 'Revision' && (
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                    Revision
                                </span>
                                )}
                                {paper.status === 'Rejected' && (
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                    Rejected
                                </span>
                                )}
                                </td>
                                <td className="py-2 px-4">
                                    <a className="underline text-blue-950 text-xs" href={`/uploads/papers/${paper.paper}`} target="_blank" rel="noopener noreferrer">
                                        View Paper
                                    </a>
                                </td>
                                <td className="py-2 px-4">
                                    <UpdatePaper users={users} paperId={paper.id} conferenceId={paper.conferenceId} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                            
                {isOpen && selectedPaper && (
                    <div className="modal modal-open">
                        <div className="modal-box bg-white">
                            <h3 className="font-bold text-lg">Paper Title: {selectedPaper.paper_title}</h3>
                            <hr className="mt-4" />
                            <div className="py-4" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(selectedPaper.abstract) }} />
                            <div className="modal-action">
                                <button type="button" className="btn text-white" onClick={handleModalClose}>Close</button>
                            </div>
                        </div>
                    </div>
                )}

                {isOpen && selectedUserId.length > 0 && (
                <div className="modal modal-open">
                    <div className="modal-box bg-white w-full max-w-2xl">
                        <h3 className="font-bold text-lg">Send email to:</h3>
                        <ul className="list-disc pl-5 mb-4">
                            {papers
                            .filter((paper) => selectedUserId.includes(paper.userId))
                            .map((paper) => (
                                <li key={paper.userId}>{paper.user.email}</li>
                            ))}
                        </ul>
                        <hr className="mt-4 mb-4"/>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Subject
                            </label>
                            <input
                                type="text"
                                name="subject"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                className="input input-bordered w-full mt-1 bg-white"
                                required
                            />
                            </div>
                            <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Message
                            </label>
                            <textarea
                                name="message"
                                value={messageTemplate}
                                onChange={(e) => setMessageTemplate(e.target.value)}
                                rows={8}
                                className="block p-2.5 w-full text-sm rounded-lg border bg-white"
                                placeholder="Enter message here, use <name> to insert user name."
                                required
                            />
                            </div>
                            <div className="modal-action">
                            <button
                                type="button"
                                className="btn text-white"
                                onClick={handleModalClose}
                            >
                                Cancel
                            </button>
                            <button type="submit" className="btn bg-blue-950 text-white">
                                Send Email
                            </button>
                            </div>
                        </form>
                    </div>
                </div>
                )}

                <div className="flex justify-between items-center mt-4">
                    <div>
                        Page {currentPage} of {totalPages}
                    </div>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300"
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TablePapers;
