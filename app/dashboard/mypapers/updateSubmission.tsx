"use client";
import { useState, SyntheticEvent, useRef, useEffect} from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import CustomAlert from "@/app/components/Alert/CustomAlert";
import { Editor } from '@tinymce/tinymce-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Submission = {
    id: number,
    paper_title: string,
    topic: string,
    abstract: string,
    keywords: string,
    paper: string,
    institution: string,
    country: string,
    city: string,
    status: string,
    userId: number,
    conferenceId: number
}

const UpdateSubmission = ({registerConference }: {registerConference: Submission}) => {
    const [paper_title, setPaperTitle] = useState (registerConference.paper_title);
    const [topicOptions, setTopicOptions] = useState<string[]>([]);
    const [selectedTopic, setSelectedTopic] = useState(registerConference.topic || '');
    const [abstract, setAbstract] = useState (registerConference.abstract);
    const [keywordsInput, setKeywordsInput] = useState('');
    const [keywords, setKeywords] = useState<string[]>(registerConference.keywords.split(',').map(k => k.trim()));
    // const [keywords, setKeywords] = useState (registerConference.keywords);
    const [paper, setPaper] = useState<File | null>(null);
    const [institution, setInstitution] = useState (registerConference.institution);
    const [country, setCountry] = useState(registerConference.country);
    const [city, setCity] = useState(registerConference.city);
    const [status, setStatus] = useState(registerConference.status);
    const [conferenceId, setConferenceId] = useState(registerConference.conferenceId);
    const [countries, setCountries] = useState<string[]>([]);
    const [fetchError, setFetchError] = useState<string | null>(null);

    const [fileName, setFileName] = useState<string | null>(null);
    const [previousFileName, setPreviousFileName] = useState<string | null>(null);

    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

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
        const fetchConferenceTopics = async () => {
            try {
                const response = await axios.get(`/api/updateconference/${registerConference.conferenceId}`);
                const conference = response.data;
                
                const topics = conference.topic.split(',').map((t: string) => t.trim());
                setTopicOptions(topics);
                setSelectedTopic(topics.includes(registerConference.topic) ? registerConference.topic : topics[0] || '');
            } catch (error) {
                console.error('Error fetching conference topics:', error);
                setAlert({ type: 'danger', message: 'Failed to load topics.' });
                setTimeout(() => setAlert(null), 5000);
            }
        };

        fetchConferenceTopics();
    }, [registerConference.conferenceId, registerConference.topic]);

    const handleUpdate = async (e: SyntheticEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('conferenceId', conferenceId.toString());
        formData.append('paper_title', paper_title);
        formData.append('topic', selectedTopic);
        formData.append('abstract', abstract || '');
        formData.append('keywords', keywords.join(', '));
        // formData.append('keywords', keywords || '');
        formData.append('paper', paper || '');
        formData.append('institution', institution || '');
        formData.append('country', country || '');
        formData.append('city', city || '');
        formData.append('status', status || '');

        try{
            await axios.put(`/api/submission/${registerConference.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            toast.success('Revision submitted successfully!');

            router.refresh();
            setIsOpen(false);
        }catch(error: any){
            console.error('Error submitting the form:', error);
            toast.error('Revision submitted failed' + error.message);
        }
    };

    const handleModal = () => {
        setIsOpen(!isOpen);
    };

    const handleAddKeyword = () => {
        if (keywordsInput.trim() && !keywords.includes(keywordsInput.trim())) {
            setKeywords([...keywords, keywordsInput.trim()]);
            setKeywordsInput('');
        }
    };

    const handleRemoveKeyword = (keyword: string) => {
        setKeywords(keywords.filter(k => k !== keyword));
    };

    useEffect(() => {
        setPreviousFileName(registerConference.paper);
      }, [registerConference]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            setFileName(file.name);
        } else {
            setFileName(null);
        }
    };

    return(
        <div>
            {alert && <CustomAlert type={alert.type} message={alert.message} />}
            <button
                className="text-xs text-blue-950 underline hover:text-indigo-900 text-center text-nowrap" onClick={handleModal}>
                Update Submission
            </button>

            <div className={isOpen ? 'modal modal-open' : 'modal'}>
                <div className="modal-box bg-white w-full max-w-5xl text-gray-700">
                    <h3 className="font-bold text-lg text-center">Update Paper: {registerConference.paper_title}</h3>
                    <hr className="mb-4"/>
                    <form onSubmit={handleUpdate} encType="multipart/data">
                        <div className="form-control w-full mt-6">
                            <label className="label font-bold">Paper Title</label>
                            <input 
                            type="text" 
                            value={paper_title}
                            onChange={(e) => setPaperTitle(e.target.value)}
                            className="input input-bordered bg-white" required/>
                        </div>
                        <div className="form-control w-full mt-6">
                            <label className="label font-bold">Topic</label>
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
                            <Editor
                                apiKey="0lu8tnu2h88qx3czxhxiluopabt3eubgk2ftrw8qfu489ruu"
                                value={abstract}
                                init={{
                                    height: 400,
                                    menubar: false,
                                }}
                                onEditorChange={(newContent) => setAbstract(newContent)}
                            />
                        </div>
                        {/* <div className="form-control w-full mt-6">
                            <label className="label font-bold">Abstract</label>
                            <textarea 
                                value={abstract}
                                onChange={(e) => setAbstract(e.target.value)}
                                id="message" rows={12} className="block p-2.5 w-full text-sm rounded-lg border bg-white" placeholder="Write abstract here.." required></textarea>
                        </div> */}
                        <div className="form-control w-full mt-6">
                            <label className="label font-bold">Keywords</label>
                            <div className="flex items-center">
                                <input
                                    type="text"
                                    value={keywordsInput}
                                    onChange={(e) => setKeywordsInput(e.target.value)}
                                    className="input input-bordered bg-white w-3/4"
                                    placeholder="Add a keyword"
                                />
                                <button
                                    type="button"
                                    onClick={handleAddKeyword}
                                    className="btn bg-blue-950 btn-outline text-white ml-2"
                                >
                                    Add
                                </button>
                            </div>
                            <ul className="list-disc mt-2 pl-5">
                                {keywords.map((keyword, index) => (
                                    <li key={index} className="flex items-center mb-1">
                                        <span className="flex-1">{keyword}</span>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveKeyword(keyword)}
                                            className="btn btn-xs btn-error text-white px-1 py-0.5 text-xs ml-2"
                                        >
                                            Remove
                                        </button>
                                    </li>                                
                                ))}
                            </ul>
                        </div>
                        {/* <div className="form-control w-full mt-6">
                            <label className="label font-bold">Keywords</label>
                            <input 
                            type="text" 
                            value={keywords}
                            onChange={(e) => setKeywords(e.target.value)}
                            className="input input-bordered bg-white" required/>
                        </div> */}
                        <div className="w-full mt-6">
                            <p className="font-bold">Full Paper</p>
                            <label
                                className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none mt-2"
                            >
                                <span className="flex items-center space-x-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                    {previousFileName && (
                                    <span className="font-medium text-gray-600">{previousFileName}</span>
                                    )}
                                </span>
                                <input
                                    type="file"
                                    accept=".pdf"
                                    onChange={(e) => {
                                        if (e.target.files) {
                                            setPaper(e.target.files[0]);
                                            setFileName(e.target.files[0].name);
                                        }
                                    }}
                                    name="file_upload"
                                    className="hidden"
                                />
                            </label>
                            {fileName && (
                            <p className="mt-2 text-sm text-gray-700">
                                Selected new file: <span className="font-medium">{fileName}</span>
                            </p>
                            )}
                        </div>
                        {/* <div className="w-full mt-6">
                            <p className="font-bold">Full Paper</p>
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
                                        <span className="text-blue-950 underline ml-1">browse</span>
                                    </span>
                                </span>
                                <input 
                                type="file"
                                accept=".pdf"
                                onChange={(e) => e.target.files && setPaper(e.target.files[0])}
                                name="file_upload"
                                className="hidden" 
                                />
                            </label>
                        </div> */}
                        <div className="form-control w-full mt-6">
                            <label className="label font-bold">Institution</label>
                            <input 
                            type="text" 
                            value={institution}
                            onChange={(e) => setInstitution(e.target.value)}
                            className="input input-bordered bg-white" required/>
                        </div>
                        <div className="form-control w-full mt-6">
                            <label className="label font-bold">Country</label>
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
                            <label className="label font-bold">City</label>
                            <input 
                            type="text" 
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="input input-bordered bg-white" required/>
                        </div>
                        <div className="modal-action">
                            <button type="button" className="btn text-white" onClick={handleModal}>Cancel</button>
                            <button className="btn bg-blue-950 text-white">Upload Revision</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UpdateSubmission