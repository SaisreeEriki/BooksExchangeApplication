// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/users');

// Login User
const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Find user by email
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({ error: 'Invalid email' });
      }

      // Compare plain password with stored hashed password
    //   const isMatch = await bcrypt.compare(password, user.passwordHash);
      // Log bcrypt result to check if it's matching
    //   console.log('Password match:', isMatch);
    const isMatch = password === user.passwordHash;
      if (!isMatch) {
        return res.status(400).json({ error: 'Invalid password' });
      }
  
      // Create JWT token
      const token = jwt.sign({ userId: user.userId, roleId: user.roleId }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      // Send the token as response
      res.json({ token });
    } catch (error) {
      console.error('Error logging in user: ', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

// Logout User (optional, typically handled client-side)
const logoutUser = (req, res) => {
    // Log out is typically handled on the client side by clearing the JWT from storage
    res.status(200).json({ message: 'Logged out successfully' });
};

// Export the functions
module.exports = { loginUser, logoutUser };
