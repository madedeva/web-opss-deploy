"use client";
import { useState, SyntheticEvent, useEffect} from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Conference } from "@prisma/client";
import { useRef } from "react";
import CustomAlert from "@/app/components/Alert/CustomAlert";

const AddSubmission = ({conferences}: {conferences: Conference[]}) => {
    const { data: session } = useSession();
    const user = session?.user as User;

    const filterConferences = conferences.filter(conference => 
    (conference.status === "Active")
    );

    const [selectedConferenceId, setSelectedConferenceId] = useState('');
    const [paper_title, setPaperTitle] = useState ("");
    const [topicOptions, setTopicOptions] = useState<string[]>([]);
    const [selectedTopic, setSelectedTopic] = useState("");
    const [abstract, setAbstract] = useState ("");
    const [keywords, setKeywords] = useState ("");
    const [paper, setPaper] = useState<any>();
    const paperInput = useRef<HTMLInputElement>(null);
    const [institution, setInstitution] = useState ("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [status, setStatus] = useState("Submitted");
    const [countries, setCountries] = useState<string[]>([]);
    const [fetchError, setFetchError] = useState<string | null>(null);

    const router = useRouter();

    type User = {
        id: number;
        name: string;
        email: string;
        roleId: number;
    }

    const [alert, setAlert] = useState<{ type: 'info' | 'danger' | 'success' | 'warning' | 'dark'; message: string } | null>(null);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch('/countries.json');
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setCountries(data);
            } catch (error) {
                console.error('Error fetching countries:', error);
                setFetchError('Failed to load countries');
            }
        };

        fetchCountries();
    }, []);

    useEffect(() => {
        const selectedConference = filterConferences.find(conference => conference.id === parseInt(selectedConferenceId));
        if (selectedConference) {
            const topics = selectedConference.topic.split(',').map(topic => topic.trim());
            setTopicOptions(topics);
            setSelectedTopic(topics[0] || "");
        } else {
            setTopicOptions([]);
            setSelectedTopic("");
        }
    }, [selectedConferenceId]);

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('paper_title', paper_title);
        formData.append('topic', selectedTopic);
        formData.append('abstract', abstract);
        formData.append('keywords', keywords);
        formData.append("paper", paperInput?.current?.files?.[0]!);
        formData.append('institution', institution);
        formData.append('country', country);
        formData.append('city', city);
        formData.append('status', status);
        formData.append('conferenceId', selectedConferenceId);

        const user = session?.user as User;
        formData.append('userId', user.id.toString());
        
        try {
            await axios.post('/api/submission', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
    
            setPaperTitle('');
            setSelectedTopic('');
            setAbstract('');
            setKeywords('');
            setPaper(null);
            setInstitution('');
            setCountry('');
            setCity('');
            setStatus('Submitted');
            setSelectedConferenceId('');
            
            setAlert({ type: 'success', message: 'Submission success!' });
            setTimeout(() => setAlert(null), 5000);

            router.refresh();
            setIsOpen(false);

        } catch (error: any) {
            console.error('Error submitting the form:', error);
            setAlert({ type: 'danger', message: 'Submission failed: ' + error.message });
            setTimeout(() => setAlert(null), 5000);
        }
    
    }

    const [isOpen, setIsOpen] = useState(false);

    const handleModal = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div>
            {alert && <CustomAlert type={alert.type} message={alert.message} />}
            <button className="bg-blue-950 text-white px-4 py-2 rounded-full" onClick={handleModal}>+ Create new submission</button>

            <div className={isOpen ? 'modal modal-open' : 'modal'}>
                <div className="modal-box bg-white w-full max-w-5xl text-gray-700">
                    <h3 className="font-bold text-lg text-center">Create New Paper Submission</h3>
                    <hr className="mb-4"/>
                    <form onSubmit={handleSubmit} encType="multipart/data">
                        <div className="form-control w-full mt-6">
                            <p className="mb-2">Select Conference <span className="text-red-600">*</span></p>
                            <select
                                value={selectedConferenceId}
                                onChange={(e) => setSelectedConferenceId(e.target.value)}
                                className="select select-bordered bg-white"
                                required
                            >
                            <option value="" disabled>Select Conference</option>
                            {filterConferences.length === 0 ? (
                                    <option disabled>No active conferences available</option>
                                ) : (
                                    filterConferences.map(conference => (
                                        <option key={conference.id} value={conference.id}>
                                            {conference.name}
                                        </option>
                                    ))
                            )}
                            </select>
                        </div>
                        <div className="form-control w-full mt-6">
                            <p className="mb-2">Paper Title <span className="text-red-600">*</span></p>
                            <input 
                            type="text" 
                            value={paper_title}
                            onChange={(e) => setPaperTitle(e.target.value)}
                            className="input input-bordered bg-white" required/>
                        </div>
                        <div className="form-control w-full mt-6">
                            <p className="mb-2">Topic or Track <span className="text-red-600">*</span></p>
                            <select
                                value={selectedTopic}
                                onChange={(e) => setSelectedTopic(e.target.value)}
                                className="select select-bordered bg-white"
                                required
                            >
                                {topicOptions.map((topic, index) => (
                                    <option key={index} value={topic}>{topic}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-control w-full mt-6">
                            <p className="mb-2">Abstract <span className="text-red-600">*</span></p>
                            <textarea 
                                value={abstract}
                                onChange={(e) => setAbstract(e.target.value)}
                                id="message" rows={12} className="block p-2.5 w-full text-sm rounded-lg border bg-white" placeholder="Write abstract here.." required></textarea>
                        </div>
                        <div className="form-control w-full mt-6">
                            <p className="mb-2">Keywords <span className="text-red-600">*</span></p>
                            <input 
                            type="text" 
                            value={keywords}
                            onChange={(e) => setKeywords(e.target.value)}
                            className="input input-bordered bg-white" required/>
                        </div>
                        <div className="w-full mt-6">
                            <p>Full Paper <span className="text-red-600">*</span></p>
                            <p className="text-xs mb-2">only .pdf allowed</p>
                            <label
                                className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none mt-2">
                                <span className="flex items-center space-x-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                    <span className="font-medium text-gray-600">
                                        Drop files to Attach, or
                                        <span className="text-blue-950 ml-1 underline">browse</span>
                                    </span>
                                </span>
                                <input 
                                type="file"
                                ref={paperInput}
                                value={paper}
                                onChange={(e) => setPaper(e.target.value)}
                                name="file_upload"
                                className="hidden" 
                                />
                            </label>
                        </div>
                        <div className="form-control w-full mt-6">
                            <p className="mb-2">Institution <span className="text-red-600">*</span></p>
                            <input 
                            type="text" 
                            value={institution}
                            onChange={(e) => setInstitution(e.target.value)}
                            className="input input-bordered bg-white" required/>
                        </div>
                        <div className="form-control w-full mt-6">
                            <p className="mb-2">Country <span className="text-red-600">*</span></p>
                            <select
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                className="select select-bordered bg-white"
                                required
                            >
                                <option value="" disabled>Select Country</option>
                                {countries.map((country) => (
                                    <option key={country} value={country}>
                                        {country}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-control w-full mt-6">
                            <p className="mb-2">City <span className="text-red-600">*</span></p>
                            <input 
                            type="text" 
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="input input-bordered bg-white" required/>
                        </div>
                        <div className="form-control w-full mt-6">
                            <p className="mb-2">Status <span className="text-red-600">*</span></p>
                            <select 
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="select select-bordered bg-white" required>
                            <option value="Submitted">Submitted</option>
                            <option value="Approved">Accepted</option>
                            <option value="Rejected">Rejected</option>
                            </select>
                        </div>
                        <div className="modal-action">
                            <button type="button" className="btn text-white" onClick={handleModal}>Cancel</button>
                            <button className="btn bg-blue-950 text-white">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )

}

export default AddSubmission;