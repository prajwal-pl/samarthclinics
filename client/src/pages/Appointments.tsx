import Appointment from "@/components/Appointment";
import DoctorAppointments from "@/components/DoctorAppointments";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";

const Appointments = () => {
  const userId = localStorage.getItem("userId");
  const email = localStorage.getItem("email");
  const [role, setRole] = React.useState<string | null>(null);
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (userId && email) {
      setRole("user");
    } else {
      if (isSignedIn) {
        setRole("doctor");
      }
    }
  }, []);

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

  return (
    <>
      {role === "user" ? (
        <Appointment />
      ) : (
        role === "doctor" && <DoctorAppointments />
      )}
    </>
  );
  //   return <DoctorAppointments />;
};

export default Appointments;
