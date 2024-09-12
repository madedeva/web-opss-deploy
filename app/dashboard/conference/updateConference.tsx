"use client";
import { useState, SyntheticEvent, useEffect} from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Conference = {
    id: number;
    name: string;
    slug: string;
    acronym: string;
    theme: string;
    description: string;
    topic: string;
    banner: string;
    venue: string;
    address: string;
    city: string;
    country: string;
    email: string;
    institution: string;
    paper_template: string;
    payment_info: string;
    submission_deadlineStart: Date;
    submission_deadlineEnd: Date;
    startDate: Date;
    endDate: Date;
    status: string;
    userId: number;
}

const UpdateConference = ({ conference }: { conference: Conference }) => {
    const parseDate = (date: Date | string) => new Date(date);
    
    const [name, setName] = useState(conference.name);
    const [acronym, setAcronym] = useState(conference.acronym || '');
    const [theme, setTheme] = useState(conference.theme || '');
    const [description, setDescription] = useState(conference.description || '');
    const [topic, setTopic] = useState(conference.topic || '');
    const [banner, setBanner] = useState<File | null>(null);
    const [venue, setVenue] = useState(conference.venue || '');
    const [address, setAddress] = useState(conference.address || '');
    const [city, setCity] = useState(conference.city || '');
    const [country, setCountry] = useState(conference.country || '');
    const [email, setEmail] = useState(conference.email || '');
    const [institution, setInstitution] = useState(conference.institution || '');
    const [paper_template, setPaperTemplate] = useState<File | null>(null);
    const [payment_info, setPaymentInfo] = useState(conference.payment_info || '');
    const [submission_deadlineStart, setSubmissionDeadlineStart] = useState(parseDate(conference.submission_deadlineStart).toISOString().slice(0,16));
    const [submission_deadlineEnd, setSubmissionDeadlineEnd] = useState(parseDate(conference.submission_deadlineEnd).toISOString().slice(0,16));
    const [startDate, setStartDate] = useState(parseDate(conference.startDate).toISOString().slice(0,16));
    const [endDate, setEndDate] = useState(parseDate(conference.endDate).toISOString().slice(0,16));
    const [status, setStatus] = useState(conference.status);
    const [countries, setCountries] = useState<string[]>([]);
    const [fetchError, setFetchError] = useState<string | null>(null);

    const [fileName, setFileName] = useState<string | null>(null);
    const [previousFileNameBanner, setPreviousFileNameBanner] = useState<string | null>(null);
    const [previousFileNameTemplate, setPreviousFileNameTemplate] = useState<string | null>(null);

    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

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

    // const handleTopicChange = (index: number, value: string) => {
    //     const newTopics = [...topic];
    //     newTopics[index] = value;
    //     setTopic(newTopics);
    // }

    // const addTopicField = () => {
    //     setTopic([...topic, '']);
    // }

    const handleUpdate = async (e: SyntheticEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('acronym', acronym);
        formData.append('theme', theme);
        formData.append('description', description);
        formData.append('topic', topic);
        formData.append('banner', banner || '');
        formData.append('venue', venue);
        formData.append('address', address);
        formData.append('city', city);
        formData.append('country', country);
        formData.append('email', email);
        formData.append('institution', institution);
        formData.append('paper_template', paper_template || '');
        formData.append('payment_info', payment_info);
        formData.append('submission_deadlineStart', new Date(submission_deadlineStart).toISOString());
        formData.append('submission_deadlineEnd', new Date(submission_deadlineEnd).toISOString());
        formData.append('startDate', new Date(startDate).toISOString());
        formData.append('endDate', new Date(endDate).toISOString());
        formData.append('status', status);

        await axios.put(`/api/conferences/${conference.id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        toast.success('Conference updated successfully!')
        router.refresh();
        setIsOpen(false);
    };

    const handleModal = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        setPreviousFileNameBanner(conference.banner);
      }, [conference]);

    useEffect(() => {
        setPreviousFileNameTemplate(conference.paper_template);
      }, [conference]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            setFileName(file.name);
        } else {
            setFileName(null);
        }
    };

    return (
        <div>
            <button className="btn btn-ghost btn-sm text-white" onClick={handleModal}>
            <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#00aaff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z" stroke="#00aaff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13" stroke="#00aaff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
            </button>

            <div className={isOpen ? 'modal modal-open' : 'modal'}>
                <div className="modal-box bg-white text-gray-700 w-full max-w-5xl">
                    <h3 className="font-bold text-lg text-center">Update {conference.name}</h3>
                    <hr className="mb-4"/>
                    <form onSubmit={handleUpdate}>
                    <div className="form-control w-full mt-6">
                            <label className="label font-bold">Conference Name</label>
                            <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="input input-bordered bg-white"
                            placeholder="Name"
                            required
                            />
                        </div>
                        <div className="form-control w-full mt-6">
                            <label className="label font-bold">Acronym</label>
                            <input
                            type="text"
                            value={acronym}
                            onChange={(e) => setAcronym(e.target.value)}
                            className="input input-bordered bg-white"
                            placeholder="Acronym"
                            />
                        </div>
                        <div className="form-control w-full mt-6">
                            <label className="label font-bold">Theme</label>
                            <textarea 
                            value={theme}
                            onChange={(e) => setTheme(e.target.value)}
                            id="message" rows={12} className="block p-2.5 w-full text-sm rounded-lg border bg-white" placeholder="Write your thoughts here..."></textarea>
                        </div>
                        <div className="form-control w-full mt-6">
                            <label className="label font-bold">Description</label>
                            <textarea 
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            id="message" rows={12} className="block p-2.5 w-full text-sm rounded-lg border bg-white" placeholder="Write your thoughts here..."></textarea>
                        </div>
                        <div className="form-control w-full mt-6">
                            <label className="label font-bold">Topic</label>
                            <input
                            type="text"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            className="input input-bordered bg-white"
                            placeholder="Topic"
                            />
                        </div>

                        <div className="w-full mt-6">
                            <p className="font-bold">Banner Image</p>
                            <span className="text-xs">.jpg .jpeg or .png - max. 2mb</span>
                            <label
                                className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none mt-2">
                                <span className="flex items-center space-x-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                    {previousFileNameBanner && (
                                        <span className="font-medium text-gray-600">{previousFileNameBanner}</span>
                                    )}
                                </span>
                                <input
                                    type="file"
                                    onChange={(e) => {
                                        if (e.target.files) {
                                            setBanner(e.target.files[0]);
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
                        <div className="form-control w-full mt-6">
                            <label className="label font-bold">Conference Venue</label>
                            <input
                            type="text"
                            value={venue}
                            onChange={(e) => setVenue(e.target.value)}
                            className="input input-bordered bg-white"
                            placeholder="Venue"
                            />
                        </div>
                        <div className="form-control w-full mt-6">
                            <label className="label font-bold">Address</label>
                            <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="input input-bordered bg-white"
                            placeholder="Address"
                            />
                        </div>
                        <div className="form-control w-full mt-6">
                            <label className="label font-bold">City</label>
                            <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="input input-bordered bg-white"
                            placeholder="City"
                            />
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
                            <label className="label font-bold">Organizer Email</label>
                            <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input input-bordered bg-white"
                            placeholder="Email"
                            />
                        </div>
                        <div className="form-control w-full mt-6">
                            <label className="label font-bold">Organizer Institution</label>
                            <input
                            type="text"
                            value={institution}
                            onChange={(e) => setInstitution(e.target.value)}
                            className="input input-bordered bg-white"
                            placeholder="Institution"
                            />
                        </div>
                        <div className="w-full mt-6">
                            <p className="font-bold">Paper Template</p>
                            <span className="text-xs">.docx .doc</span>
                            <label
                                className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none mt-2">
                                <span className="flex items-center space-x-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                    {previousFileNameTemplate && (
                                    <span className="font-medium text-gray-600">{previousFileNameTemplate}</span>
                                    )}
                                </span>
                                <input
                                    type="file"
                                    onChange={(e) => {
                                        if (e.target.files) {
                                            setPaperTemplate(e.target.files[0]);
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
                        <div className="form-control w-full mt-6">
                            <label className="label font-bold">Payment Information</label>
                            <input
                            type="text"
                            value={payment_info}
                            onChange={(e) => setPaymentInfo(e.target.value)}
                            className="input input-bordered bg-white"
                            placeholder="Payment Info"
                            />
                        </div>

                        <div className="flex w-full gap-4 mt-6">
                            <div className="form-control w-1/2">
                                <label className="label font-bold">Submission Start Date</label>
                                <input
                                type="datetime-local"
                                value={submission_deadlineStart.toString()}
                                onChange={(e) => setSubmissionDeadlineStart(e.target.value)}
                                className="input input-bordered bg-white"
                                placeholder="Submission Deadline"
                                />
                            </div>
                            <div className="form-control w-1/2">
                                <label className="label font-bold">Submission End Date</label>
                                <input
                                type="datetime-local"
                                value={submission_deadlineEnd.toString()}
                                onChange={(e) => setSubmissionDeadlineEnd(e.target.value)}
                                className="input input-bordered bg-white"
                                placeholder="Submission Deadline"
                                />
                            </div>
                        </div>
                        <div className="flex w-full gap-4 mt-6">
                            <div className="form-control w-1/2">
                                <label className="label font-bold">
                                    Conference Start Date
                                </label>
                                <input
                                    type="datetime-local"
                                    value={startDate.toString()}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="input input-bordered bg-white"
                                    placeholder="Start Date"
                                />
                            </div>
                            <div className="form-control w-1/2">
                                <label className="label font-bold">
                                Conference End Date
                                </label>
                                <input
                                    type="datetime-local"
                                    value={endDate.toString()}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="input input-bordered bg-white"
                                    placeholder="End Date"
                                />
                            </div>
                        </div>
                        <div className="form-control w-full mt-6">
                            <label className="label font-bold">Status</label>
                            <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="select select-bordered bg-white"
                            required>
                                <option value="" disabled>Select Status</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>
                        <div className="modal-action">
                            <button type="button" className="btn text-white" onClick={handleModal}>Cancel</button>
                            <button type="submit" className="btn btn-accent text-white">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UpdateConference;