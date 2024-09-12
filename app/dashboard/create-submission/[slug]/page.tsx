'use client'
import DashboardLayout from "@/app/components/DashboardLayout";
import { SessionProvider } from "next-auth/react";
import CreateSubmissionComponent from "@/app/components/Submission/CreateSubmission";

const CreateSubmission = ({params}: {params: {slug: string}}) => {

  return (
    <SessionProvider>
        <DashboardLayout>
            <CreateSubmissionComponent params={{slug: params.slug}}/>
        </DashboardLayout>
    </SessionProvider>
  );
};

export default CreateSubmission;
