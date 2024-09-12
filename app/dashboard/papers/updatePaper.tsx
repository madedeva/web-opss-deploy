"use client";
import { useState, SyntheticEvent, useEffect } from "react";
import type { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type UpdatePaperProps = {
    users: User[];
    paperId: number;
    conferenceId: number;
};

const UpdatePaper = ({ users, paperId, conferenceId }: UpdatePaperProps) => {
    const [idUser, setUser] = useState(paperId.toString());
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const [usersRev, setUsersRev] = useState<User[]>([]);

    const fetchDataReviewer = async () => {
      try {
        const response = await axios.get(`/api/userReviewer?paperId=${conferenceId}`);
        setUsersRev(response.data);
      } catch (error) {
        console.error('Gagal mengambil data role', error);
      }
    };

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        try {
            await axios.post(`/api/assignreviewer`, {
                reviewerId: parseInt(idUser),
                registerConferenceId: paperId,
            });

            toast.success('Reviewer assigned successfully!');
            router.refresh();
            setIsOpen(false);
        } catch (error) {
            console.error("Error updating reviewer:", error);
            toast.error('Failed to assign reviewer!')
        }
    };

    const handleModal = () => {
        fetchDataReviewer();
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        if (isOpen) {
          fetchDataReviewer();
        }
      }, [paperId, isOpen]);
      

    return (
        <div>
            <button className="text-xs text-blue-950 hover:text-indigo-900 underline" onClick={handleModal}>
                Asign Reviewer
            </button>
            <div className={isOpen ? 'modal modal-open' : 'modal'}>
                <div className="modal-box bg-white">
                    <h3 className="font-bold text-lg">Asign Reviewer</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control w-full mt-6">
                            <p className="mb-2">Select Reviewer <span className="text-red-600">*</span></p>
                            <select 
                                id={paperId.toString()}
                                value={idUser}
                                onChange={(e) => setUser(e.target.value)}
                                onClick={(e) => {
                                    const target = e.target as HTMLSelectElement;
                                    setUser(target.value);
                                }}
                                className="select select-bordered bg-white"
                                required
                            >
                                <option id={paperId.toString()} value="" disabled>Select Reviewer</option>
                                {usersRev.map((user) => (
                                    <option key={paperId.toString() + "." + user.id} id={paperId.toString() + "." +  user.id} value={user.id}>{user.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="modal-action">
                            <button type="button" className="btn text-white" onClick={handleModal}>Cancel</button>
                            <button type="submit" className="btn bg-blue-950 text-white">Asign reviewer</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdatePaper;
