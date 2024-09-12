import DashboardLayout from "@/app/components/DashboardLayout";
import WelcomeCard from "@/app/components/WelcomeCard";
import { PrismaClient } from "@prisma/client";
import AddReviewer from "./addReviewer";
import DeleteConRev from "./deleteReviewer";
import UpdateReviewer from "./updateReviewer";

const prisma = new PrismaClient();

const getConRev = async () => {
  const res = await prisma.con_Reviewer.findMany({
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
      conference: {
        include: {
          User: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      },
    },
  });
  return res;
};

const getUserReviewer = async () => {
  const res = await prisma.user.findMany({
    where: {
      roleId: 3,
    },
  });
  return res;
};

const getConference = async () => {
  const res = await prisma.conference.findMany();
  return res;
};

const Reviewer = async () => {
  const [conRev, user, conference] = await Promise.all([getConRev(), getUserReviewer(), getConference()]);

  // Mengelompokkan reviewer berdasarkan conference
  const groupedByConference = conference.map((conf) => {
    return {
      ...conf,
      reviewers: conRev.filter((cr) => cr.conferenceId === conf.id),
    };
  }).filter(conf => conf.reviewers.length > 0);

  return (
    <DashboardLayout>
      {/* <WelcomeCard /> */}
      <div className="bg-white p-6 rounded-lg">
        <div className="mt-6">
          <h3 className="text-lg font-medium">Reviewers</h3>
          <p className="text-sm text-gray-600">
          Below is a list of reviewers according to the conference you have.
          </p>
          <div className="mt-2">
            <AddReviewer conferences={conference} users={user} />
          </div>

          {groupedByConference.length > 0 ? (
            groupedByConference.map((conf) => (
              <div key={conf.id} className="mt-12">
                <h4 className="text-md font-medium mt-2">{conf.name}</h4>
                <table className="min-w-full divide-y divide-gray-200 mt-6">
                  <thead className="bg-gray-50">
                    <tr className="text-xs border-b border-gray-200">
                      <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reviewer Name</th>
                      <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organizer Institution</th>
                      <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organizer Email</th>
                      <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {conf.reviewers.map((cr) => (
                      <tr className="text-gray-700 text-xs border-b border-gray-200" key={cr.id}>
                        <td className="py-2">{cr.user.name}</td>
                        <td className="py-2">{cr.conference.institution}</td>
                        <td className="py-2">{cr.user.email}</td>
                        <td className="flex py-2">
                          <UpdateReviewer
                            conferences={conference}
                            users={user}
                            userId={cr.userId}
                            conId={cr.conferenceId}
                            conRevId={cr.id}
                          />
                          <DeleteConRev conRev={cr} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No reviewers available for any conference.</p>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Reviewer;