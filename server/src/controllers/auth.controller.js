import User from "../models/user";

export const authFunction = async (req, res) => {
  try {
    const { email_address, clerkId } = req.body;
    const { role } = req.params;

    const email = email_address[0].email_address;

    await User.findOne({ email: email }, async (error, user) => {
      if (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
      } else if (user) {
        res.status(200).json(user);
      } else {
        const newUser = new User({
          email: email,
          clerkId: clerkId,
          role: role,
        });

        await newUser.save((error, data) => {
          if (error) {
            console.log(error);
            res.status(500).json({ message: "Internal server error" });
          } else {
            res.status(201).json(data);
          }
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
