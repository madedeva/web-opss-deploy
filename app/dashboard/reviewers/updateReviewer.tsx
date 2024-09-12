"use client";
import { useState, SyntheticEvent} from "react";
import type { Conference, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateReviewer = ({users, conferences, userId, conId, conRevId}: {users: User[], conferences: Conference[], userId: number, conId: number, conRevId: number}) => {

    const { data: session } = useSession();
    const user = session?.user as User;
    const filteredConferences = conferences.filter(conferences => conferences.userId === user?.id);

    const [idUser, setUser] = useState(userId.toString());
    const [idCon, setCon] = useState(conId.toString());

    const router = useRouter();

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        await axios.patch(`/api/reviewer/${conRevId}`, {
            userId: parseInt(idUser),
            conferenceId: parseInt(idCon),
        });

        toast.success('Reviewer updated successfully!')
        setUser(idUser);
        setCon(idCon);
        router.refresh();
        setIsOpen(false);
    }

    const [isOpen, setIsOpen] = useState(false);

    const handleModal = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div>
            <button className="btn btn-ghost btn-sm text-white" onClick={handleModal}>
                <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#00aaff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z" stroke="#00aaff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13" stroke="#00aaff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
            </button>

            <div className={isOpen ? 'modal modal-open' : 'modal'}>
                <div className="modal-box bg-white">
                    <h3 className="font-bold text-lg">Add New Reviewer</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control w-full">
                            <label className="label font-bold">Reviewer</label>
                            <select 
                            value={idUser}
                            onChange={(e) => setUser(e.target.value)}
                            className="select select-bordered bg-white" required>
                            <option value="" disabled>Select Reviewer</option>
                            {users.map((user) => (
                                <option key={user.id} value={user.id}>{user.name}</option>
                            ))}
                            </select>
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Conference</label>
                            <select 
                            value={idCon}
                            onChange={(e) => setCon(e.target.value)}
                            className="select select-bordered bg-white" required>
                            <option value="" disabled>Select Conference</option>
                            {filteredConferences.map((conference) => (
                                <option key={conference.id} value={conference.id}>{conference.name}</option>
                            ))}
                            </select>
                        </div>
                        <div className="modal-action">
                            <button type="button" className="btn text-white" onClick={handleModal}>Close</button>
                            <button type="submit" className="btn btn-accent text-white">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UpdateReviewer;