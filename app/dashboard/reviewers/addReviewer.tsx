"use client";
import { useState, SyntheticEvent } from "react";
import type { Conference, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomAlert from "@/app/components/Alert/CustomAlert";

const AddReviewer = ({ users, conferences }: { users: User[]; conferences: Conference[] }) => {
    const { data: session } = useSession();
    const user = session?.user as User;

    const filteredConferences = conferences.filter(conference => 
        conference.status === "Active" && conference.userId === user?.id
    );

    const [selectedUserId, setSelectedUserId] = useState('');
    const [selectedConferenceId, setSelectedConferenceId] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [alert, setAlert] = useState<{ type: 'info' | 'danger' | 'success' | 'warning' | 'dark'; message: string } | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        try {
            await axios.post('/api/reviewer', {
                userId: parseInt(selectedUserId),
                conferenceId: parseInt(selectedConferenceId),
            });
            setSelectedUserId('');
            setSelectedConferenceId('');
            toast.success('Reviewer added successfully!');
            setTimeout(() => setAlert(null), 5000);
            router.refresh();
            setIsOpen(false);
        } catch (error: any) {
            console.error('Failed to add reviewer:', error);
            toast.error('Reviewer added failed.')
            setTimeout(() => setAlert(null), 5000);
        }
    };

    const handleModalToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            {alert && <CustomAlert type={alert.type} message={alert.message} />}
            <button className="bg-blue-950 text-white px-4 py-2 rounded-full" onClick={handleModalToggle}>
                + New Reviewer
            </button>

            <div className={isOpen ? 'modal modal-open' : 'modal'}>
                <div className="modal-box bg-white text-gray-700">
                    <h3 className="font-bold text-lg text-center">Add New Reviewer</h3>
                    <hr className="mb-4"/>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control w-full mt-6">
                            <p className="mb-2">Select Reviewer <span className="text-red-600">*</span></p>
                            <select
                                value={selectedUserId}
                                onChange={(e) => setSelectedUserId(e.target.value)}
                                className="select select-bordered bg-white"
                                required
                            >
                                <option value="" disabled>Select Reviewer</option>
                                {users.length === 0 ? (
                                    <option disabled>No reviewers available</option>
                                ) : (
                                    users.map(user => (
                                        <option key={user.id} value={user.id}>
                                            {user.name}
                                        </option>
                                    ))
                                )}
                            </select>
                        </div>
                        <div className="form-control w-full mt-6">
                            <p className="mb-2">Select Conference <span className="text-red-600">*</span></p>
                            <select
                                value={selectedConferenceId}
                                onChange={(e) => setSelectedConferenceId(e.target.value)}
                                className="select select-bordered bg-white"
                                required
                            >
                                <option value="" disabled>Select Conference</option>
                                {filteredConferences.length === 0 ? (
                                    <option disabled>No active conferences available</option>
                                ) : (
                                    filteredConferences.map(conference => (
                                        <option key={conference.id} value={conference.id}>
                                            {conference.name}
                                        </option>
                                    ))
                                )}
                            </select>
                        </div>
                        <div className="modal-action">
                            <button type="button" className="btn text-white" onClick={handleModalToggle}>
                                Close
                            </button>
                            <button type="submit" className="btn bg-blue-950 text-white">
                                Save Reviewer
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddReviewer;
