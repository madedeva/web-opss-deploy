"use client";
import { useState, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

type AddAuthorsProps = {
    paperId: number;
    author?: { id: number, name: string, email: string, institution: string };
};

const AddAuthors = ({ paperId, author }: AddAuthorsProps) => {
    const [name, setName] = useState(author?.name || "");
    const [email, setEmail] = useState(author?.email || "");
    const [institution, setInstitution] = useState(author?.institution || "");
    const [authorId, setAuthorId] = useState(author?.id || null);
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        try {
            if (authorId) {
                await axios.put(`/api/addauthors/${authorId}`, {
                    name,
                    email,
                    institution,
                });
            } else {
                await axios.post(`/api/addauthors`, {
                    name,
                    email,
                    institution,
                    submissionId: paperId,
                });
            }

            setName("");
            setEmail("");
            setInstitution("");
            setAuthorId(null);

            router.refresh();
            setIsOpen(false);
        } catch (error) {
            console.error("Error saving author:", error);
        }
    };

    const handleModal = () => {
        setIsOpen(!isOpen);
    };

    const handleEdit = (author: any) => {
        setName(author.name);
        setEmail(author.email);
        setInstitution(author.institution);
        setAuthorId(author.id);
        setIsOpen(true);
    };

    return (
        <div>
            <button className="text-xs text-blue-950 hover:text-indigo-900 underline" onClick={handleModal}>
                + Add New Author
            </button>

            <div className={isOpen ? 'modal modal-open' : 'modal'}>
                <div className="modal-box bg-white">
                    <h3 className="font-bold text-lg">{authorId ? "Update Author" : "Add Author"}</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control w-full mt-6">
                            <label className="mb-2">Name <span className="text-red-600">*</span></label>
                            <input 
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="input input-bordered bg-white"
                                required
                            />
                        </div>
                        <div className="form-control w-full mt-4">
                            <label className="mb-2">Email <span className="text-red-600">*</span></label>
                            <input 
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="input input-bordered bg-white"
                                required
                            />
                        </div>
                        <div className="form-control w-full mt-4">
                            <label className="mb-2">Institution <span className="text-red-600">*</span></label>
                            <input 
                                type="text"
                                value={institution}
                                onChange={(e) => setInstitution(e.target.value)}
                                className="input input-bordered bg-white"
                                required
                            />
                        </div>
                        <div className="modal-action mt-6">
                            <button type="button" className="btn text-white" onClick={handleModal}>Cancel</button>
                            <button type="submit" className="btn bg-blue-950 text-white">
                                {authorId ? "Update Author" : "Add Author"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddAuthors;
