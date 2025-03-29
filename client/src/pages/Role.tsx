import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const Role = () => {
  const { user } = useUser();
  const userId = user?.id;
  const navigate = useNavigate();

  const fetchRole = async () => {
    const res = await axios.get(
      `${import.meta.env.BACKEND_URL}/role?id=${userId}`
    );

    if (res.data.role) {
      toast("Role already exists");
      navigate("/");
    }
  };

  useEffect(() => {
    fetchRole();
  }, []);

  const handleDoctorClick = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.BACKEND_URL}/role/update`,
        {
          id: userId,
          role: "doctor",
        }
      );

      if (response.status === 200) {
        console.log("Role updated successfully");
        toast("Role updated successfully");
        window.location.href = "/doctor/appointments";
      } else {
        console.error("Failed to update role");
        toast("Failed to update role");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePatientClick = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.BACKEND_URL}/role/update`,
        {
          id: userId,
          role: "patient",
        }
      );

      if (response.status === 200) {
        console.log("Role updated successfully");
        toast("Role updated successfully");
        window.location.href = "/appointments";
      } else {
        console.error("Failed to update role");
        toast("Failed to update role");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex items-center justify-center gap-2">
        <span
          onClick={handleDoctorClick}
          className="border border-blue-600 p-6 hover:bg-blue-500 text-blue-500 hover:text-white"
        >
          Doctor
        </span>
        <span
          onClick={handlePatientClick}
          className="border border-blue-600 p-6 hover:bg-blue-500 text-blue-500 hover:text-white"
        >
          Patient
        </span>
      </div>
    </div>
  );
};

export default Role;
