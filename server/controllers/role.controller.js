import User from "../models/user.js";

export const roleFunction = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({
      clerkId: id,
    });

    console.log(user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ role: user.role });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateRole = async (req, res) => {
  const { id, role, email } = req.body;
  try {
    const user = await User.findOne({
      // clerkId: id,
      email,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.updateOne({ role });

    res.status(200).json({ message: "Role updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
