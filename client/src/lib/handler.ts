import axios from "axios";

type userAuthType = {
  email: string;
  phoneNumber: string;
  full_name: string;
};

export const userAuth = async ({
  email,
  phoneNumber,
  full_name,
}: userAuthType) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/auth/user`,
      {
        email,
        phoneNumber,
        full_name,
      }
    );

    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
