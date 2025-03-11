import User from "../models/user.js";

export const authFunction = async (req, res) => {
  try {
    const { email_addresses, id } = req.body.data;

    const email = email_addresses[0].email_address;

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(200).json(existingUser);
    }

    const newUser = new User({
      email: email,
      clerkId: id,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
