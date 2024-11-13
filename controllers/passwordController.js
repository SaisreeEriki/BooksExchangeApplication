const crypto = require('crypto');
const bcrypt = require('bcrypt');
const { User } = require('../models/users');

// Forgot Password
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ where: { email } });

  if (!user) return res.status(404).json({ error: 'User not found' });

  const token = crypto.randomBytes(32).toString('hex');
  const tokenExpiration = Date.now() + 3600000; // Token expires in 1 hour
  user.resetToken = token;
  user.resetTokenExpiration = tokenExpiration;
  await user.save();

  // Send email with `token` in the reset link (handle email logic here)
  res.status(200).json({ message: 'Password reset link sent' });
};

// Reset Password
exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  const user = await User.findOne({
    where: {
      resetToken: token,
      resetTokenExpiration: { [Op.gt]: Date.now() }
    }
  });

  if (!user) return res.status(400).json({ error: 'Invalid or expired token' });

  user.passwordHash = await bcrypt.hash(newPassword, 10);
  user.resetToken = null;
  user.resetTokenExpiration = null;
  await user.save();

  res.status(200).json({ message: 'Password updated successfully' });
};
