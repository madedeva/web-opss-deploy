'use client'
import DashboardLayout from "@/app/components/DashboardLayout";
import { Conference, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Editor } from '@tinymce/tinymce-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateSubmissionComponent = ({params}: {params: {slug: string}}) => {

    const { data: session } = useSession();
    const user = session?.user as User;
    
    const [selectedConferenceId, setSelectedConferenceId] = useState('');
    const [paper_title, setPaperTitle] = useState ("");
    const [topicOptions, setTopicOptions] = useState<string[]>([]);
    const [selectedTopic, setSelectedTopic] = useState("");
    const [abstract, setAbstract] = useState ("");
    const [keywords, setKeywords] = useState<string[]>([]);
    const [keywordsInput, setKeywordsInput] = useState<string>('');
    // const [keywords, setKeywords] = useState<string[]>(['']);
    const [paper, setPaper] = useState<any>();
    const paperInput = useRef<HTMLInputElement>(null);
    const [institution, setInstitution] = useState ("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [status, setStatus] = useState("Submitted");
    const [countries, setCountries] = useState<string[]>([]);
    const [fetchError, setFetchError] = useState<string | null>(null);
    const [topics, setTopics] = useState<string[]>();
    const [Authors, setAuthors] = useState([{ name: '', email: '', institution: ''}]);

    const [conference, setConference] = useState<Conference>();

    const [fileName, setFileName] = useState<string | null>(null);

    const router = useRouter();

    type User = {
        id: number;
        name: string;
        email: string;
        roleId: number;
    }

    type Author = {
        name: string;
        email: string;
        institution: string;
    }

    const [alert, setAlert] = useState<{ type: 'info' | 'danger' | 'success' | 'warning' | 'dark'; message: string } | null>(null);

    const fetchPapers = async () => {
        try {
            const response = await fetch(`/api/slug-conferences/${params.slug}`);
            if (response.ok) {
                const data = await response.json();
                setConference(data);
                setSelectedConferenceId(data.id); 
            } else {
                console.error('Failed to fetch papers:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error fetching papers:', error);
        }
    };

    useEffect(() => {
    
        fetchPapers();
    }, []);

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

        const str = conference?.topic ?? "";
        setTopics(str.split(", "));
    }, [conference?.topic]);

    const handleKeywordsChange = (index: number, value: string) => {
        const newKeywords = [...keywords];
        newKeywords[index] = value;
        setKeywords(newKeywords);
    }

    const addKeywordsField = () => {
        setKeywords([...keywords, '']);
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            setFileName(file.name);
        } else {
            setFileName(null);
        }
    };

    const handleAddKeyword = () => {
        if (keywordsInput.trim() && !keywords.includes(keywordsInput.trim())) {
            setKeywords([...keywords, keywordsInput.trim()]);
            setKeywordsInput(''); // Reset input field setelah menambahkan keyword
        }
    };

    const handleRemoveKeyword = (keywordToRemove: string) => {
        setKeywords(keywords.filter(keyword => keyword !== keywordToRemove));
    };

    const handleAuthorChange = (index: number, field: string, value: string) => {
        const newAuthors = [...Authors];
        (newAuthors[index] as any)[field] = value;
        setAuthors(newAuthors);
    };
    
    const addAuthorField = () => {
        setAuthors([...Authors, { name: '', email: '', institution: '' }]);
    };
    
    const removeAuthorField = (index: number) => {
        const newAuthors = Authors.filter((_, i) => i !== index);
        setAuthors(newAuthors);
    };

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('paper_title', paper_title);
        formData.append('topic', selectedTopic);
        formData.append('abstract', abstract);
        formData.append('keywords', keywords.join(', '));
        formData.append("paper", paperInput?.current?.files?.[0]!);
        formData.append('institution', institution);
        formData.append('country', country);
        formData.append('city', city);
        formData.append('status', status);
        const nonEmptyAuthors = Authors.filter(author => author.name || author.email || author.institution);
        if (nonEmptyAuthors.length > 0) {
            formData.append('Authors', JSON.stringify(nonEmptyAuthors));
        }
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
            setKeywords(['']);
            setPaper(null);
            setInstitution('');
            setCountry('');
            setCity('');
            setStatus('Submitted');
            setSelectedConferenceId('');
            setAuthors([{ name: '', email: '', institution: '' }]);

            console.log(formData)
            
            toast.success('Submission created successfully!');
            setTimeout(() => setAlert(null), 5000);

            router.refresh();
            router.push('/dashboard/mypapers');

        } catch (error: any) {
            console.error('Error submitting the form:', error);
            toast.error('Submission created failed.');
        }
    
    }


  return (
      <div className="bg-white p-6 rounded-lg">
        <div className="mt-6 text-gray-700">
          <h3 className="text-lg font-bold">Create new submission</h3>
          <p className="text-sm text-gray-600">
          Ready to share your work? Create a new submission and showcase your research at the upcoming conference.
          </p>
          <hr className="mt-2 mb-6" />
          <form onSubmit={handleSubmit} encType="multipart/data">
            <input className="w-full p-2 border bg-white rounded hidden" 
            value={selectedConferenceId}
            onChange={(e) => setSelectedConferenceId(e.target.value)}
            />
            <div className="form-control w-full mt-6">
                <p className="mb-2"><span className="font-bold">Create submission to: </span>{conference?.name}</p>
            </div>
            <div className="form-control w-full mt-6">
                <p className="mb-2">Paper Title <span className="text-red-600">*</span></p>
                <input className="block w-full p-2 border bg-white rounded" 
                type="text"
                value={paper_title}
                onChange={(e) => setPaperTitle(e.target.value)}
                />
            </div>

            <div className="form-control w-full mt-6">
                <p className="mb-2">Topic or Track <span className="text-red-600">*</span></p>
                <select
                    value={selectedTopic}
                    onChange={(e) => setSelectedTopic(e.target.value)}
                    className="select select-bordered bg-white"
                    required
                    >
                    {topics?.map((topic, index) => (
                        <option key={topic} value={topic}>
                        {topic}
                        </option>
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
                <p className="mb-2">Abstract <span className="text-red-600">*</span></p>
                <textarea 
                    value={abstract}
                    onChange={(e) => setAbstract(e.target.value)}
                    id="message" rows={12} className="block p-2.5 w-full text-sm rounded-lg border bg-white" placeholder="Write abstract here.." required>
                </textarea>
            </div> */}
            <div className="form-control w-full mt-6">
                <p className="mb-2">Keywords <span className="text-red-600">*</span></p>
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
            {/* <div className="w-full gap-4 mt-6">
                {keywords.map((keywords, index) => (
                <div className="form-control w-full mt-2" key={index}>
                    <p className="mb-2">Keywords <span className="text-red-600">*</span></p>
                    <input
                        type="text"
                        value={keywords}
                        onChange={(e) => handleKeywordsChange(index, e.target.value)}
                        className="input input-bordered bg-white text-sm"
                        placeholder='Add keywords'
                        required
                    />
                 </div>
                 ))}
                <div className="mt-2">
                    <button type="button" className="btn bg-blue-950 btn-md btn-outline text-white mt-2" onClick={addKeywordsField}>Add new keywords</button>
                </div>
            </div> */}
            {/* <div className="form-control w-full mt-6">
                <p className="mb-2">Keywords <span className="text-red-600">*</span></p>
                <input 
                type="text" 
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                className="input input-bordered bg-white" required/>
            </div> */}
            {/* <div className="w-full mt-6">
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
            </div> */}
            <div className="w-full mt-6">
                <p>Full Paper <span className="text-red-600">*</span></p>
                <p className="text-xs mb-2">Only .pdf files are allowed</p>
                <label
                    className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none mt-2"
                    htmlFor="file-upload"
                >
                    <span className="flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        Selected file:
                        {fileName && (
                            <span className="font-medium text-gray-600">{fileName}</span>
                        )}
                    </span>
                </label>
                <input 
                    id="file-upload"
                    type="file"
                    accept=".pdf"
                    ref={paperInput}
                    onChange={handleFileChange}
                    name="file_upload"
                    className="hidden"
                />
            </div>
            <div className="form-control w-full mt-6">
                <p className="mb-2">Institution <span className="text-red-600">*</span></p>
                <input 
                type="text" 
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                className="input input-bordered bg-white" required/>
            </div>

            {Authors.map((author, index) => (
                <div key={index} className="form-control w-full mt-6">
                    <p className="mb-2">Add Another Authors (Optional)</p>
                    <p className="mb-2">Author {index + 1}</p>
                    <input
                        className="block w-full p-2 border bg-white rounded mb-2"
                        type="text"
                        placeholder="Author Name"
                        value={author.name}
                        onChange={(e) => handleAuthorChange(index, 'name', e.target.value)}
                    />
                    <input
                        className="block w-full p-2 border bg-white rounded mb-2"
                        type="text"
                        placeholder="Author Email"
                        value={author.email}
                        onChange={(e) => handleAuthorChange(index, 'email', e.target.value)}
                    />
                    <input
                        className="block w-full p-2 border bg-white rounded"
                        type="text"
                        placeholder="Author Institution"
                        value={author.institution}
                        onChange={(e) => handleAuthorChange(index, 'institution', e.target.value)}
                    />
                    <button type="button" className="btn btn-danger mt-2" onClick={() => removeAuthorField(index)}>Remove Author</button>
                </div>
            ))}
            <button type="button" className="btn bg-blue-950 btn-outline text-white mt-4" onClick={addAuthorField}>
                Add New Author
            </button>
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
            <div className="mt-6 text-right">
                <button className="px-4 py-2 bg-blue-950 text-white rounded-md shadow-sm">
                    Submit Paper
                </button>
            </div>
          </form>
        </div>
      </div>
  );
};

export default CreateSubmissionComponent;