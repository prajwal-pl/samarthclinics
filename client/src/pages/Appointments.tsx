import Appointment from "@/components/Appointment";
import DoctorAppointments from "@/components/DoctorAppointments";
import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";

const Appointments = () => {
  const userId = localStorage.getItem("userId");
  const [role, setRole] = React.useState<string | null>(null);
  const navigate = useNavigate();

  const fetchRole = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/role/${userId}`
      );

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

  //   return <>{role === "user" ? <Appointment /> : <DoctorAppointments />}</>;
  return <DoctorAppointments />;
};

export default Appointments;
