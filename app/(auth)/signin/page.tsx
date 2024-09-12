"use client";
import { useState } from 'react';
import { SessionProvider, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { EnvelopeIcon, LockClosedIcon, ArrowRightCircleIcon } from '@heroicons/react/24/solid';

const SignIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): any => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = (e.currentTarget as HTMLFormElement).email.value;
    const password = (e.currentTarget as HTMLFormElement).password.value;
    const result = await signIn("credentials", { redirect: false, email, password });

    if (result?.error) {
      setError(result.error);
      toast.error('Sign in failed' + error);
    } else {
      toast.success('Sign in success!');
      router.push('/');
    }
  };

  return (
    <SessionProvider>
      <div className="flex flex-col lg:flex-row h-screen bg-blue-950">
        <div className="lg:w-1/2 flex flex-col items-center justify-center bg-blue-950 text-white p-8">
          <h2 className="text-4xl font-bold mb-4 text-center">Simplify Your Conference Management with OPSS</h2>
          <p className="mb-8 text-center">Streamline submissions and enhance efficiency with the Online Paper Submission System (OPSS)</p>
        </div>
        <div className="lg:w-1/2 bg-blue-950 text-gray-900 flex items-center justify-center">
          <div className="m-auto w-full max-w-md p-8 bg-white rounded-md shadow-md">
            <h2 className="text-2xl font-semibold text-center text-orange-500">Sign In</h2>
            <form onSubmit={handleSubmit} className="space-y-4 mt-6">
              {error && <p className='text-red-400 text-center'>{error}</p>}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email <span className="text-red-600">*</span>
                </label>
                <div className="mt-1 relative">
                  <EnvelopeIcon className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className="block w-full text-sm pl-10 py-2 border border-orange-400 bg-white rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    placeholder='Email'
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password <span className="text-red-600">*</span>
                </label>
                <div className="mt-1 relative">
                  <LockClosedIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    className="block w-full text-sm pl-10 py-2 border border-orange-400 bg-white rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    placeholder='Password'
                    required
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-orange-500 text-white font-semibold rounded-md shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 flex items-center justify-center"
                >
                  <ArrowRightCircleIcon className="h-5 w-5 mr-2" />
                  Sign In
                </button>
              </div>
            </form>
            <p className="mt-4 text-center text-sm text-gray-600">
              Don`t have an account? <a href="/signup" className="text-orange-500 hover:underline">Sign Up</a>
            </p>
            <p className="mt-4 text-center text-sm text-gray-600">
              Forgot your password? <a href="/forgot-password" className="text-orange-500 hover:underline">Reset Password</a>
            </p>
          </div>
        </div>
      </div>
    </SessionProvider>
  );
};

export default SignIn;
