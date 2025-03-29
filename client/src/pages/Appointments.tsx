import Appointment from "@/components/Appointment";
import DoctorAppointments from "@/components/DoctorAppointments";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";

const Appointments = () => {
  const { user } = useUser();
  const userId = user?.id;
  const [role, setRole] = React.useState<string | null>(null);
  const navigate = useNavigate();

  const fetchRole = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/role/${userId}`
      );

      console.log(res.data.role);

      if (res.data.role) {
        setRole(res.data.role);
      } else {
        navigate("/role");
      }
    } catch (error) {
      console.error("Error fetching role:", error);
    }
  };

  useEffect(() => {
    fetchRole();
  }, []);

  return <>{role === "user" ? <Appointment /> : <DoctorAppointments />}</>;
};

export default Appointments;
