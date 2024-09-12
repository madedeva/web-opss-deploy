import DashboardLayout from "@/app/components/DashboardLayout";
import WelcomeCard from "@/app/components/WelcomeCard";
import Form from "./form";

const Profile = () => {
  return (
    <DashboardLayout>
      <div className="bg-white p-6 rounded-lg">
        <div className="mt-6">
          <h3 className="text-lg font-medium">Profile Information</h3>
          <p className="text-sm text-gray-600">
          Keep your profile up-to-date to unlock new opportunities! Take a moment to refresh your information and let the world see the best version of you.
          </p>
          <hr className="mt-2 mb-6" />
          <Form />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
