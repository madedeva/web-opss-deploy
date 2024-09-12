import DashboardLayout from "@/app/components/DashboardLayout";
import AddReviewer from "@/app/dashboard/reviewers/addReviewer";
import DeleteConRev from "@/app/dashboard/reviewers/deleteReviewer";
import UpdateReviewer from "@/app/dashboard/reviewers/updateReviewer";
import { useState, useEffect } from "react";

interface ConReviewer {
  id: number;
  userId: number;
  conferenceId: number;
  user: {
    name: string;
    email: string;
  };
  conference: {
    id: number;
    name: string;
    institution: string;
  };
}

interface User {
  id: number;
  name: string;
  roleId: number;
  email: string;
  password: string;
}

interface Conference {
  id: number;
  name: string;
  institution: string;
}

const ReviewerComponent = () => {
  const [conRev, setConRev] = useState<ConReviewer[]>([]);
  const [user, setUser] = useState<User[]>([]);
  const [conference, setConference] = useState<Conference[]>([]);
  const [selectedConferenceId, setSelectedConferenceId] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [conRevRes, userRes, conferenceRes] = await Promise.all([
          fetch('/api/reviewer').then((res) => res.json()),
          fetch('/api/users').then((res) => res.json()),
          fetch('/api/conferences').then((res) => res.json()),
        ]);
        setConRev(conRevRes);
        setUser(userRes);
        setConference(conferenceRes);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleConferenceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = Number(event.target.value);
    setSelectedConferenceId(selectedId);
  };

  const selectedConference = conference.find((conf) => conf.id === selectedConferenceId) ?? null;
  const selectedReviewers = selectedConference
    ? conRev.filter((cr) => cr.conferenceId === selectedConference.id)
    : [];

  return (
      <div className="bg-white p-6 rounded-lg">
        <div className="mt-6">
          <h3 className="text-lg font-medium">Reviewers</h3>
          <p className="text-sm text-gray-600">
            Below is a list of reviewers according to the conference you have.
          </p>
          <div className="mt-2">
            {/* <AddReviewer conferences={conference} users={user} /> */}
          </div>

          <div className="mt-4">
            <select
              className="border border-gray-300 p-2 rounded"
              onChange={handleConferenceChange}
              defaultValue=""
            >
              <option value="" disabled>
                Select a Conference
              </option>
              {conference.map((conf) => (
                <option key={conf.id} value={conf.id}>
                  {conf.name}
                </option>
              ))}
            </select>
          </div>

          {selectedReviewers.length > 0 ? (
            <div className="mt-12">
              <h4 className="text-md font-medium mt-2">
                {selectedConference?.name}
              </h4>
              <table className="min-w-full divide-y divide-gray-200 mt-6">
                <thead className="bg-gray-50">
                  <tr className="text-xs border-b border-gray-200">
                    <th
                      scope="col"
                      className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Reviewer Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Organizer Institution
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Organizer Email
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {selectedReviewers.map((cr) => (
                    <tr
                      className="text-gray-700 text-xs border-b border-gray-200"
                      key={cr.id}
                    >
                      <td className="py-2">{cr.user.name}</td>
                      <td className="py-2">{cr.conference.institution}</td>
                      <td className="py-2">{cr.user.email}</td>
                      <td className="flex py-2">
                        {/* <UpdateReviewer
                          conferences={conference}
                          users={user}
                          userId={cr.userId}
                          conId={cr.conferenceId}
                          conRevId={cr.id}
                        /> */}
                        <DeleteConRev conRev={cr} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-600">No reviewers available for this conference.</p>
          )}
        </div>
      </div>
  );
};

export default ReviewerComponent;
