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
  const { email, phoneNumber, full_name } = req.body;
  try {
    const user = await User.findOne({
      email,
    });

    if (!user) {
      const newUser = new User({
        email,
        phoneNumber,
        role: "user",
        full_name,
      });

      newUser
        .save()
        .then((savedUser) => {
          res.status(201).json(savedUser);
        })
        .catch((error) => {
          console.log(error);
          res.status(500).json({ message: "Internal server error" });
        });
    }

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
