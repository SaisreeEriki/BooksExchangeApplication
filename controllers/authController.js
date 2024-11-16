// controllers/authController.js
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
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
      res.json({ token, userId: user.userId });
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

const requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
      // Check if user exists
      const user = await User.findOne({ where: { email } });
      if (!user) {
          return res.status(400).json({ error: 'User with this email does not exist.' });
      }

      // Generate a token and set expiration (e.g., 1 hour)
      const resetToken = crypto.randomBytes(32).toString('hex');
      user.resetToken = resetToken;
      user.resetTokenExpiration = Date.now() + 3600000; // 1 hour from now
      await user.save();

      // Send email with the reset link (modify with your frontend's URL)
      const resetUrl = `http://your-frontend-url/reset-password?token=${resetToken}`;
      const transporter = nodemailer.createTransport({
          service: 'your-email-service', // e.g., 'gmail'
          auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS,
          },
      });
      
      await transporter.sendMail({
          to: user.email,
          subject: 'Password Reset',
          html: `<p>You requested a password reset</p>
                 <p>Click this <a href="${resetUrl}">link</a> to set a new password.</p>`,
      });

      res.status(200).json({ message: 'Password reset email sent.' });
  } catch (error) {
      console.error('Error requesting password reset: ', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
      // Find user by reset token and check if token is still valid
      const user = await User.findOne({
          where: {
              resetToken: token,
              resetTokenExpiration: { [Op.gt]: Date.now() } // Token expiration check
          }
      });
      
      if (!user) {
          return res.status(400).json({ error: 'Invalid or expired token' });
      }

      // Hash and save the new password
      user.passwordHash = await bcrypt.hash(newPassword, 10);
      user.resetToken = null; // Clear reset token
      user.resetTokenExpiration = null; // Clear expiration
      await user.save();

      res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
      console.error('Error resetting password: ', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Export the functions
module.exports = { loginUser, logoutUser, requestPasswordReset, resetPassword };
