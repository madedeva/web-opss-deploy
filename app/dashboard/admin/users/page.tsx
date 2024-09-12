'use client'
import DashboardLayout from "@/app/components/DashboardLayout";
import { useEffect, useState } from "react";
import { User, Role } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";

interface UserWithRole extends User {
  role: Role;
}

  const RegisteredUsers = () => {
    const [users, setUsers] = useState<UserWithRole[]>([]);
    const [roles, setRoles] = useState<Role[]>([]);
    const [selectedRole, setSelectedRole] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [userToDelete, setUserToDelete] = useState<number | null>(null);

    const router = useRouter();

    useEffect(() => {
      const fetchUsers = async () => {
        const response = await fetch("/api/adminallusers");
        const data: UserWithRole[] = await response.json();
        setUsers(data);
      };

      const fetchRoles = async () => {
        const response = await fetch("/api/roles");
        const data: Role[] = await response.json();
        setRoles(data);
      };

      fetchUsers();
      fetchRoles();
    },[]);

    const handleDelete = async (userId: number) => {
      try {
        await axios.delete(`/api/adminallusers/${userId}`);
        setUsers(users.filter((user) => user.id !== userId));
        setIsModalOpen(false);
      } catch (error:any) {
        alert(`Error: ${error.message}`);
      }
    };

    const openModal = (userId: number) => {
      setUserToDelete(userId);
      setIsModalOpen(true);
    };

    const closeModal = () => {
      setUserToDelete(null);
      setIsModalOpen(false);
    };

    const confirmDelete = () => {
      if (userToDelete !== null) {
        handleDelete(userToDelete);
      }
      closeModal();
    };

    const filteredUsers = selectedRole
      ? users.filter((user) => user.role.name === selectedRole)
      : users;

  return (
    <DashboardLayout>
      <div className="bg-white p-6 rounded-lg mt-4">
        <div className="mt-6">
          <h3 className="text-lg font-medium">Registered Users</h3>
          <p className="text-sm text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <hr className="mt-2" />

          <div className="mb-4">
            <label htmlFor="role-select" className="block text-sm font-medium text-gray-900 mt-4 mb-2">
              Filter by Role
            </label>
            <select
              id="role-select"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="block w-full pl-4 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-950 focus:border-blue-950 sm:text-sm rounded-lg bg-white shadow-sm transition duration-200 ease-in-out"
            >
              <option value="">All Roles</option>
              {roles.map((role) => (
                <option key={role.id} value={role.name}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>

          <table className="min-w-full divide-y divide-gray-200 mt-4">
            <thead className="bg-gray-50">
              <tr className="text-xs border-b border-gray-200">
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="text-gray-700 text-xs border-b border-gray-200">
                  <td className="px-4 py-2 text-sm text-gray-700">{user.name}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{user.email}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{user.role.name}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {user.role.name !== 'Administrator' && (
                      <button
                        onClick={() => openModal(user.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ff0000">
                          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                          <g id="SVGRepo_iconCarrier">
                            <path d="M20.5001 6H3.5" stroke="#ff0000" strokeWidth="1.5" strokeLinecap="round"></path>
                            <path d="M9.5 11L10 16" stroke="#ff0000" strokeWidth="1.5" strokeLinecap="round"></path>
                            <path d="M14.5 11L14 16" stroke="#ff0000" strokeWidth="1.5" strokeLinecap="round"></path>
                            <path d="M6.5 6C6.55588 6 6.58382 6 6.60915 5.99936C7.43259 5.97849 8.15902 5.45491 8.43922 4.68032C8.44784 4.65649 8.45667 4.62999 8.47434 4.57697L8.57143 4.28571C8.65431 4.03708 8.69575 3.91276 8.75071 3.8072C8.97001 3.38607 9.37574 3.09364 9.84461 3.01877C9.96213 3 10.0932 3 10.3553 3H13.6447C13.9068 3 14.0379 3 14.1554 3.01877C14.6243 3.09364 15.03 3.38607 15.2493 3.8072C15.3043 3.91276 15.3457 4.03708 15.4286 4.28571L15.5257 4.57697C15.5433 4.62992 15.5522 4.65651 15.5608 4.68032C15.841 5.45491 16.5674 5.97849 17.3909 5.99936C17.4162 6 17.4441 6 17.5 6" stroke="#ff0000" strokeWidth="1.5"></path>
                            <path d="M18.3735 15.3991C18.1965 18.054 18.108 19.3815 17.243 20.1907C16.378 21 15.0476 21 12.3868 21H11.6134C8.9526 21 7.6222 21 6.75719 20.1907C5.89218 19.3815 5.80368 18.054 5.62669 15.3991L5.16675 8.5M18.8334 8.5L18.6334 11.5" stroke="#ff0000" strokeWidth="1.5" strokeLinecap="round"></path>
                          </g>
                        </svg>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-medium mb-4">Confirm Delete</h3>
            <p className="text-sm mb-4">Are you sure you want to delete this user?</p>
            <div className="flex justify-end">
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
              >
                Confirm
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default RegisteredUsers;
