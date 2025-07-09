import User from '../models/user.js';

export const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        message: 'Incomplete Data: Name and email is required',
        data: null,
        success: false,
      });
    }

    const newUser = new User({ name, email });
    await newUser.save();

    return res.status(201).json({
      message: 'Successfully created user',
      data: newUser,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error Creating User',
      data: error.message,
      success: false,
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    return res.status(200).json({
      message: 'Successfully fetched users',
      data: users,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error fetching users',
      data: error.message,
      success: false,
    });
  }
};
