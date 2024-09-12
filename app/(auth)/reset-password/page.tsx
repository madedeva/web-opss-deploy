"use client";
import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import CustomAlert from "@/app/components/Alert/CustomAlert";

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [alert, setAlert] = useState<{ type: 'info' | 'danger' | 'success' | 'warning' | 'dark'; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const searchParams = useSearchParams(); // Move this inside handleSubmit to avoid unnecessary CSR bailout
    const token = searchParams.get('token');
    
    console.log(token);
    
    const res = await fetch('/api/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, password }),
    });
    
    const data = await res.json();
    
    console.log("Data: ", data);
    
    if (data.status) {
      setAlert({ type: 'success', message: 'Password has been reset. Please sign in.' });
      window.location.href = '/signin';
    } else {
      setAlert({ type: 'danger', message: 'Password must be at least 8 characters long, contain an uppercase letter, and include a symbol.' });
    }
  };

  return (
    <div className="container max-w-md mx-auto px-4">
      <h2 className="text-2xl font-semibold text-center mt-6">Reset Password</h2>
      
      <Suspense fallback={<p>Loading...</p>}>
        <form onSubmit={handleSubmit} className="mt-4">
          {alert && <CustomAlert type={alert.type} message={alert.message} />}
          <label htmlFor="password">New Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 w-full rounded-lg bg-white"
            required
          />
          <button type="submit" className="mt-4 bg-blue-950 text-white p-2 rounded-lg">Reset Password</button>
        </form>
      </Suspense>

      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default ResetPassword;
