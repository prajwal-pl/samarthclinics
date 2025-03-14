import User from "../models/user.js";

export const authFunction = async (req, res) => {
  try {
    const { email_addresses, id, full_name } = req.body.data;

    const email = email_addresses[0].email_address;

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(200).json(existingUser);
    }

    const newUser = new User({
      email: email,
      clerkId: id,
      full_name: full_name,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getBasicUserInfo = async (req, res) => {
  const { id } = req.body;
  try {
    const user = await User.findById(id, {
      email: 1,
      clerkId: 1,
      full_name: 1,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
