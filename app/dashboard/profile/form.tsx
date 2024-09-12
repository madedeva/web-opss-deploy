'use client'
import { getSession, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type User = {
    id: number,
    name: string,
    email: string,
    roleId: number
}

const Form = () => {

    const { data: session, status, update } = useSession()

    const [loading, setLoading ] = useState(false);

    useEffect(() => {
        if (session?.user) {
            const user = session.user as User;
            setForm({
                id: user.id,
                name: user.name,
                email: user.email,
                password: '',
                passwordNew: '',
                passwordConfirm: ''
            });
        }
    }, [session]);

    const [form, setForm] = useState({
        id: 0,
        name: '',
        email: '',
        password: '',
        passwordNew: '',
        passwordConfirm: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try{
            if (form.passwordNew == form.passwordConfirm && (form.passwordNew !== '' || form.passwordConfirm !== '')){
                const response = await axios.patch('/api/profile', form);

                if (response.status === 200) {
                    console.log('Succes update profile!', response.data);

                    const updateSession = await getSession();

                    console.log(updateSession)
                    toast.success('Profile update success!')

                } else {
                    toast.error('Profile update failed: ' + response.data.error);
                }
            } else {
                toast.error('Confirm password not match with password')
            }
        }catch (error: any){
            console.log('Update password failed', error)
            toast.error('Profile update failed: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <ToastContainer/>
            <h2 className="text-xl font-semibold mb-4">Profile</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="col-span-1">
                    <label className="block mb-2 text-sm font-medium">Name</label>
                    <input className="block w-full p-2 border bg-white rounded" 
                    type="text"
                    name="name"
                    value={form.name} 
                    onChange={handleChange} disabled/>
                </div>
                <div className="col-span-1">
                    <label className="block mb-2 text-sm font-medium">Email</label>
                    <input className="block w-full p-2 border bg-white rounded"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange} disabled/>
                </div>
            </div>
            <h2 className="text-xl font-semibold mb-4">Update Password</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="col-span-1">
                    <label className="mb-2 text-sm font-medium flex">Current Password<p className="text-red-600">*</p></label>
                    <input className="block w-full p-2 border bg-white rounded"
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}/>
                </div>
                <div className="col-span-1">
                    <label className="mb-2 text-sm font-medium flex">New Password<p className="text-red-600">*</p></label>
                    <input className="block w-full p-2 border bg-white rounded" 
                    type="password"
                    name="passwordNew"
                    value={form.passwordNew} 
                    onChange={handleChange}/>
                </div>
                <div className="col-span-1">
                    <label className="mb-2 text-sm font-medium flex">Confirm Password<p className="text-red-600">*</p></label>
                    <input className="block w-full p-2 border bg-white rounded" 
                    type="password"
                    name="passwordConfirm"
                    value={form.passwordConfirm}
                    onChange={handleChange}/>
                </div>
            </div>
            <div className="mt-6 text-right">
                <button className="px-4 py-2 bg-blue-950 text-white rounded-md shadow-sm">
                    {loading ? 'Updating...' : 'Update Profile'}
                </button>
            </div>
          </form>
    )
}

export default Form;