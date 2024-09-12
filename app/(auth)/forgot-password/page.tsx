"use client"
import { useState } from 'react';
import CustomAlert from "@/app/components/Alert/CustomAlert";

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const [alert, setAlert] = useState<{ type: 'info' | 'danger' | 'success' | 'warning' | 'dark'; message: string } | null>(null);

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setAlert({ type: 'danger', message: 'Please enter a valid email address.' });
      // setError('Please enter a valid email address.');
      return;
    }
    console.log('Sending request with email:', email);
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      
      if (!res.ok) {
        const errorText = await res.text();
        setAlert({ type: 'danger', message: 'Email not found, please enter a valid email address.' });
        // setError(`Error ${res.status}: ${res.statusText} - ${errorText}`);
        return;
      }
      
      const data = await res.json();
      console.log(data);
      if (data.status) {
        setAlert({ type: 'success', message: 'Please check your email for a reset link.' });
        // setMessage('Please check your email for a reset link.');
      } else {
        setError('Something went wrong, please try again.');
      }
    } catch (error) {
      console.error('Error sending request:', error);
      setError('An error occurred while sending the request.');
    }    
  };

  return (
    <div className="container max-w-md mx-auto px-4">
      <h2 className="text-2xl font-semibold text-center mt-6">Forgot Password</h2>
      <form onSubmit={handleSubmit} className="mt-4">
      {alert && <CustomAlert type={alert.type} message={alert.message} />}
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full rounded-lg bg-white"
          required
        />
        <button type="submit" className="mt-4 bg-blue-950 text-white p-2 rounded-lg">Send Reset Link</button>
      </form>
      {error && <p className="mt-4 text-red-500">{error}</p>}
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default ForgotPassword;