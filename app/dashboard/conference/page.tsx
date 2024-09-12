import DashboardLayout from "@/app/components/DashboardLayout"
import { PrismaClient } from "@prisma/client";
import AddConference from "./addConference";
import TableConference from "@/app/components/Conference/TableConference";

const prisma = new PrismaClient();

const getConference = async () => {
    const res = await prisma.conference.findMany({
      include: {
          User: {
              select: {
                  name: true,
                  email: true,
              },
          },
          _count: true
      },
    });
    return res;
};

const Conference =  async () => {

  const [conference] = await Promise.all([getConference()]);

    return (
    <DashboardLayout>
        <div className="bg-white p-6 rounded-lg">
        <div className="mt-6">
          <h3 className="text-lg font-medium">My Conferences</h3>
          <p className="text-sm text-gray-600">
          This page is where you can organize the conference you have created. You have the flexibility to customize it according to your preferences and requirements. Take the time to shape your conference into exactly what you envision, ensuring every detail aligns with your goals and expectations.
          </p>
          <div className="mt-2">
            <AddConference />
          </div>
          <TableConference conference={conference}/>
        </div>
      </div>
    </DashboardLayout>
    )
};

export default Conference