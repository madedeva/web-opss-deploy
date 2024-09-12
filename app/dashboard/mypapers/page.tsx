import DashboardLayout from "@/app/components/DashboardLayout"
import RegisterConference from "./addSubmission";
import { PrismaClient } from "@prisma/client";
import TableMySubmission from "@/app/components/Submission/TableMySubmission";

const prisma = new PrismaClient();

type UserCon = {
  country: string,
  userId: number,
  id: number,
  status: string,
  paper_title: string,
  comments?: string | null;
  createdAt: Date,
  paper: string
  user: {
      name: string,
      email: string,
  },
  conference: {
    id: number,
    name: string,
    description: string,
    submission_deadlineStart: Date,
    submission_deadlineEnd: Date,
    paper_template: string,
    acronym: string
    User: {
        name: string,
        email: string,
    };
  }
}

const getRegisterConference = async () => {
  try {
    const res = await prisma.registerConference.findMany({
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
              select:{
                name: true,
                email:true,
              }
            }
          }
        },
        Authors: {
          select: {
            id: true,
            email: true,
            name: true,
            institution: true,
          }
        }
      },
    });
    return res;
  } catch (error) {
    console.error("Error fetching registered conferences:", error);
    return [];
  }
};


const getConference = async () => {
  const res = await prisma.conference.findMany();
  return res;
}

const MyConferences = async () => {

  const [reg_conference, conference] = await Promise.all([getRegisterConference(), getConference()]);

    return (
    <DashboardLayout>
        <div className="bg-white p-6 rounded-lg">
        <div className="mt-6">
          <h3 className="text-lg font-medium">My Papers</h3>
          <p className="text-sm text-gray-600">
          Below is a list of the history of the papers you have submitted.
          </p>
          {/* <div className="mt-2">
          <RegisterConference conferences={conference}/>
          </div> */}
          <TableMySubmission reg_conference={reg_conference} />
        </div>
      </div>
    </DashboardLayout>
    )
};

export default MyConferences