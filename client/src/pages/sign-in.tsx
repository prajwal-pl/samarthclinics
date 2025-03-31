import { SignIn } from "@clerk/clerk-react";
import { useEffect } from "react";
import { toast } from "sonner";

const Signin = () => {
  const userId = localStorage.getItem("userId");
  const email = localStorage.getItem("email");

  useEffect(() => {
    if (userId && email) {
      toast("Only Doctors are allowed to sign in", {
        description: "Book an appointment to get started",
      });
      window.location.href = "/appointments";
    }
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <SignIn />
    </div>
  );
};

export default Signin;
