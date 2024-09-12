'use client'
import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import WelcomeCard from '../components/WelcomeCard';
import { useSession } from 'next-auth/react';
import { User } from '@prisma/client';

const MenuDashboard = () => {

  const { data: session, status } = useSession();

  if (!session?.user) return null;

  const user = session.user as User;
  const roleId = user.roleId

  if (user.roleId === 2) {
    return (
        <div className="mt-4">
            <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <section className="bg-white p-4 rounded">
                <h3 className="text-lg mb-2">Conferences</h3>
                <hr className="mb-4 mt-4" />
                <ul>
                <li><a href="/dashboard/conference" className="text-blue-950 underline">Conferences List</a></li>
                <li><a href="/dashboard/conference" className="text-blue-950 underline">Create Conferences</a></li>
                </ul>
            </section>
            <section className="bg-white p-4 rounded">
                <h3 className="text-lg mb-2">Submitted Papers</h3>
                <hr className="mb-4 mt-4" />
                <ul>
                <li><a href="/dashboard/papers" className="text-blue-950 underline">Submitted Papers</a></li>
                </ul>
            </section>
            <section className="bg-white p-4 rounded">
                <h3 className="text-lg mb-2">Reviewers</h3>
                <hr className="mb-4 mt-4" />
                <ul>
                <li><a href="/dashboard/reviewers" className="text-blue-950 underline">Conference Reviewers</a></li>
                </ul>
            </section>
            </main>
        </div>
        );
    }

    if (user.roleId === 1) {
        return (
            <div className="mt-4">
            <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <section className="bg-white p-4 rounded">
                <h3 className="text-lg mb-2">My Papers</h3>
                <hr className="mb-4 mt-4" />
                <ul>
                <li><a href="/dashboard/mypapers" className="text-blue-950 underline">My Papers List</a></li>
                <li><a href="/dashboard/availableconference" className="text-blue-950 underline">Create New Submission</a></li>
                </ul>
            </section>
            <section className="bg-white p-4 rounded">
                <h3 className="text-lg mb-2">Available Conferences</h3>
                <hr className="mb-4 mt-4" />
                <ul>
                <li><a href="/dashboard/availableconference" className="text-blue-950 underline">Available Conference List</a></li>
                </ul>
            </section>
            </main>
        </div>
        )
    }

    if (user.roleId === 3) {
        return (
            <div className="mt-4">
            <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <section className="bg-white p-4 rounded">
                <h3 className="text-lg mb-2">My Reviews</h3>
                <hr className="mb-4 mt-4" />
                <ul>
                <li><a href="/dashboard/myreviews" className="text-blue-950 underline">My Papers Review</a></li>
                </ul>
            </section>
            </main>
        </div>
        )
    }

    if (user.roleId === 4) {
        return (
            <div className="mt-4">
            <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <section className="bg-white p-4 rounded">
                <h3 className="text-lg mb-2">Conferences</h3>
                <hr className="mb-4 mt-4" />
                <ul>
                <li><a href="/dashboard/admin/conferences" className="text-blue-950 underline">Coferences List</a></li>
                </ul>
            </section>
            <section className="bg-white p-4 rounded">
                <h3 className="text-lg mb-2">Users</h3>
                <hr className="mb-4 mt-4" />
                <ul>
                <li><a href="/dashboard/admin/users" className="text-blue-950 underline">Users List</a></li>
                </ul>
            </section>
            </main>
        </div>
        )
    }

    return null
};

export default MenuDashboard;
