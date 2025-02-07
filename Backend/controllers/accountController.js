import accountModel from "../models/accountModel.js";

// Get account information
const getAccountInfo = async (req, res) => {
  try {
    const account = await accountModel.findOne({ userId: req.userId });

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    res.status(200).json({
      success: true,
      account,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update account information
const updateAccountInfo = async (req, res) => {
  try {
    const { name, email, phone, address, gender, dob, photo } = req.body;

    const updatedAccount = await accountModel.findOneAndUpdate(
      { userId: req.userId },
      { name, email, phone, address, gender, dob, photo },
      { new: true }
    );

    res.status(200).json({ updatedAccount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getAccountInfo, updateAccountInfo };
