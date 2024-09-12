"use client";
import { useState, SyntheticEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRef } from "react";
import CustomAlert from "@/app/components/Alert/CustomAlert";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddConference = () => {
    const { data: session } = useSession();
    const [name, setName] = useState('');
    const [acronym, setAcronym] = useState('');
    const [theme, setTheme] = useState('');
    const [description, setDescription] = useState('');
    const [topic, setTopics] = useState<string[]>(['']);
    const [banner, setBanner] = useState<any>();
    const fileInput = useRef<HTMLInputElement>(null);
    const fileInput2 = useRef<HTMLInputElement>(null);
    const [venue, setVenue] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [email, setEmail] = useState('');
    const [institution, setInstitution] = useState('');
    const [paper_template, setPaperTemplate] = useState<any>();
    const [payment_info, setPaymentInfo] = useState('');
    const [submission_deadlineStart, setSubmissionDeadlineStart] = useState('');
    const [submission_deadlineEnd, setSubmissionDeadlineEnd] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [status, setStatus] = useState('Inactive');
    const [countries, setCountries] = useState<string[]>([]);
    const [fetchError, setFetchError] = useState<string | null>(null);

    const [fileName, setFileName] = useState<string | null>(null);

    type User = {
        id: number;
        name: string;
        email: string;
        roleId: number;
    }

    const [alert, setAlert] = useState<{ type: 'info' | 'danger' | 'success' | 'warning' | 'dark'; message: string } | null>(null);

    const router = useRouter();

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

    const handleTopicChange = (index: number, value: string) => {
        const newTopics = [...topic];
        newTopics[index] = value;
        setTopics(newTopics);
    }
    
    const addTopicField = () => {
        setTopics([...topic, '']);
    }  

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            setFileName(file.name);
        } else {
            setFileName(null);
        }
    };

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        const formData = new FormData();

        console.log('FILES: ', fileInput2?.current?.files?.[0]!);
        formData.append('name', name);
        formData.append('acronym', acronym);
        formData.append('theme', theme);
        formData.append('description', description);
        formData.append('topic', topic.join(', '));
        formData.append("banner", fileInput?.current?.files?.[0]!);
        formData.append('venue', venue);
        formData.append('address', address);
        formData.append('city', city);
        formData.append('country', country);
        formData.append('email', email);
        formData.append('institution', institution);
        formData.append("paper_template", fileInput2?.current?.files?.[0]!);
        formData.append('payment_info', payment_info);
        formData.append('submission_deadlineStart', new Date(submission_deadlineStart).toISOString());
        formData.append('submission_deadlineEnd', new Date(submission_deadlineEnd).toISOString());
        formData.append('startDate', new Date(startDate).toISOString());
        formData.append('endDate', new Date(endDate).toISOString());
        formData.append('status', status);

        const user = session?.user as User;
        formData.append('userId', user.id.toString());

        try{
            await axios.post('/api/conferences', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setName('');
            setAcronym('');
            setTheme('');
            setDescription('');
            setTopics(['']);
            setBanner(null);
            setVenue('');
            setAddress('');
            setCity('');
            setCountry('');
            setEmail('');
            setInstitution('');
            setPaperTemplate(null);
            setPaymentInfo('');
            setSubmissionDeadlineStart('');
            setSubmissionDeadlineEnd('');
            setStartDate('');
            setEndDate('');
            setStatus('Inactive');

            toast.success('Conference added successfully!');
            setTimeout(() => setAlert(null), 5000);

            router.refresh();
            setIsOpen(false);

        } catch (error: any) {
            console.error('Error submitting the form:', error);
            toast.error('Conference addition failed:' + error.message);
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
            <button className="bg-blue-950 text-white px-4 py-2 rounded-full" onClick={handleModal}>+ New Conference</button>

            <div className={isOpen ? 'modal modal-open' : 'modal'}>
                <div className="modal-box bg-white w-full max-w-5xl text-black">
                    <h3 className="font-bold text-lg text-center">Add New Conference</h3>
                    <hr className="mb-4"/>
                    <form onSubmit={handleSubmit} encType="multipart/data">
                        <div className="form-control w-full mt-6">
                            <p className="mb-2">Conference Name <span className="text-red-600">*</span></p>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="input input-bordered bg-white text-sm"
                                placeholder="Conference name"
                                required
                            />
                        </div>
                        <div className="form-control w-full mt-6">
                            <p className="mb-2">Acronym <span className="text-red-600">*</span></p>
                            <input
                                type="text"
                                value={acronym}
                                onChange={(e) => setAcronym(e.target.value)}
                                className="input input-bordered bg-white text-sm"
                                placeholder="Example (EC 2024)"
                            />
                        </div>
                        <div className="form-control w-full mt-6">
                            <p className="mb-2">Theme <span className="text-red-600">*</span></p>
                            <textarea 
                                value={theme}
                                onChange={(e) => setTheme(e.target.value)}
                                id="message" rows={12} className="block p-2.5 w-full text-sm rounded-lg border bg-white" placeholder="Conferece theme"></textarea>
                        </div>
                        <div className="form-control w-full mt-6">
                            <p className="mb-2">Description <span className="text-red-600">*</span></p>
                            <textarea 
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                id="message" rows={12} className="block p-2.5 w-full text-sm rounded-lg border bg-white" placeholder="Conference description"></textarea>
                        </div>
                        <div className="w-full gap-4 mt-6">
                            {topic.map((topic, index) => (
                                <div className="form-control w-full mt-2" key={index}>
                                    <p className="mb-2">Topic or Track <span className="text-red-600">*</span></p>
                                    <input
                                        type="text"
                                        value={topic}
                                        onChange={(e) => handleTopicChange(index, e.target.value)}
                                        className="input input-bordered bg-white text-sm"
                                        placeholder='Add topic or track'
                                        required
                                    />
                                </div>
                            ))}
                            <div className="mt-2">
                                <button type="button" className="btn bg-blue-950 btn-md text-white mt-2" onClick={addTopicField}>Add new topic or track</button>
                            </div>
                        </div>

                        {/* <div className="w-full mt-6">
                            <p>Banner Image <span className="text-red-600">*</span></p>
                            <p className="text-xs mb-2">Only .jpg .png .jpeg files are allowed</p>
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
                                ref={fileInput}
                                value={banner}
                                onChange={handleFileChange}
                                name="file_upload"
                                className="hidden"
                            />
                        </div> */}

                        <div className="w-full mt-6">
                            <p>Upload Banner Image <span className="text-red-600">*</span></p>
                            <span className="text-sm">.jpg .jpeg or .png - max. 2mb</span>
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
                                        <span className="text-blue-950 underline ml-2">browse</span>
                                        <span className="text-sm ml-2">only .jpg .jpeg or .png allowed maks. 2mb</span>
                                    </span>
                                </span>
                                <input 
                                type="file"
                                ref={fileInput}
                                value={banner}
                                onChange={(e) => setBanner(e.target.value)}
                                name="file_upload"
                                className="hidden" 
                                />
                            </label>
                        </div>
                        <div className="form-control w-full mt-6">
                            <p className="mb-2">Conference Venue <span className="text-red-600">*</span></p>
                            <input
                                type="text"
                                value={venue}
                                onChange={(e) => setVenue(e.target.value)}
                                className="input input-bordered bg-white text-sm"
                                placeholder="Conference venue"
                            />
                        </div>
                        <div className="form-control w-full mt-6">
                            <p className="mb-2">Address <span className="text-red-600">*</span></p>
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="input input-bordered bg-white text-sm"
                                placeholder="Conference address"
                            />
                        </div>
                        <div className="form-control w-full mt-6">
                            <p className="mb-2">City <span className="text-red-600">*</span></p>
                            <input
                                type="text"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                className="input input-bordered bg-white text-sm"
                                placeholder="Example: Jakarta"
                            />
                        </div>
                        <div className="form-control w-full mt-6">
                            <p className="mb-2">Country <span className="text-red-600">*</span></p>
                            <select
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                className="select select-bordered bg-white"
                                required
                            >
                                <option value="" disabled>Select country</option>
                                {countries.map((country) => (
                                    <option key={country} value={country}>
                                        {country}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-control w-full mt-6">
                            <p className="mb-2">Organizer Email <span className="text-red-600">*</span></p>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="input input-bordered bg-white text-sm"
                                placeholder="Organizer email"
                            />
                        </div>
                        <div className="form-control w-full mt-6">
                            <p className="mb-2">Organizer Institution <span className="text-red-600">*</span></p>
                            <input
                                type="text"
                                value={institution}
                                onChange={(e) => setInstitution(e.target.value)}
                                className="input input-bordered bg-white text-sm"
                                placeholder="Organizer institution"
                            />
                        </div>

                        <div className="w-full mt-6">
                            <p>Upload Paper Template <span className="text-red-600">*</span></p>
                            <span className="text-sm">.docx .doc</span>
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
                                        <span className="text-blue-950 underline">browse</span>
                                    </span>
                                </span>
                                <input 
                                type="file"
                                ref={fileInput2}
                                value={paper_template}
                                onChange={(e) => setPaperTemplate(e.target.value)}
                                name="file_upload"
                                className="hidden" 
                                />
                            </label>
                        </div>

                        {/* <div className="w-full mt-6">
                            <p>Paper Template <span className="text-red-600">*</span></p>
                            <p className="text-xs mb-2">Only .doc .docx files are allowed</p>
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
                                ref={fileInput2}
                                value={paper_template}
                                onChange={handleFileChange}
                                name="file_upload"
                                className="hidden"
                            />
                        </div> */}
                        <div className="form-control w-full mt-6">
                            <p className="mb-2">Payment Information <span className="text-red-600">*</span></p>
                            <input
                                type="text"
                                value={payment_info}
                                onChange={(e) => setPaymentInfo(e.target.value)}
                                className="input input-bordered bg-white text-sm"
                                placeholder="Bank account/dash (-)"
                            />
                        </div>
                        <div className="flex w-full gap-4 mt-6">
                            <div className="form-control w-1/2">
                                <p className="mb-2">Submission Start Date<span className="text-red-600">*</span></p>
                                <input
                                    type="datetime-local"
                                    value={submission_deadlineStart}
                                    onChange={(e) => setSubmissionDeadlineStart(e.target.value)}
                                    className="input input-bordered bg-white"
                                    placeholder="Submission Deadline"
                                />
                            </div>
                            <div className="form-control w-1/2">
                                <p className="mb-2">Submission End Date <span className="text-red-600">*</span></p>
                                <input
                                    type="datetime-local"
                                    value={submission_deadlineEnd}
                                    onChange={(e) => setSubmissionDeadlineEnd(e.target.value)}
                                    className="input input-bordered bg-white"
                                    placeholder="Submission Deadline"
                                />
                            </div>
                        </div>
                        <div className="flex w-full gap-4 mt-6">
                            <div className="form-control w-1/2">
                                <p className="mb-2">Conference Start Date <span className="text-red-600">*</span></p>
                                <input
                                    type="datetime-local"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="input input-bordered bg-white"
                                    placeholder="Start Date"
                                />
                            </div>
                            <div className="form-control w-1/2">
                                <p className="mb-2">Conference End Date <span className="text-red-600">*</span></p>
                                <input
                                    type="datetime-local"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="input input-bordered bg-white"
                                    placeholder="End Date"
                                />
                            </div>
                        </div>
                        <div className="modal-action">
                            <button type="button" className="btn text-white" onClick={handleModal}>Cancel</button>
                            <button type="submit" className="btn bg-blue-950 text-white">Add Conference</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddConference;
