const { User } = require('../models/users'); // Adjust the path if needed
const{ Role } = require('../models/users');
const { UserPreferences } = require('../models/users');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');


// Validation rules
const userValidationRules = [
    body('name')
      .isString()
      .isLength({ min: 3 })
      .withMessage('Name is required and must be at least 3 characters long'),
    body('email')
      .isEmail()
      .withMessage('A valid email address is required'),
    body('password')
      .isLength({ min: 8 })
      .matches(/\d/)
      .withMessage('Password must be at least 8 characters long and contain at least one number'),
    body('contactInfo')
      .isString()
      .isLength({ min: 10 })
      .withMessage('Contact information is required and must be at least 10 characters long'),
    body('roleId')
      .isUUID()
      .withMessage('Role ID must be a valid UUID')
      .custom(async (roleId) => {
        // Check if the roleId exists in the Role table
        const role = await Role.findByPk(roleId);
        if (!role) {
          throw new Error('Role ID does not exist');
        }
        return true;
      })
      .withMessage('Role ID does not exist'),
];

// Fetch all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (err) {
        console.error('Error fetching users: ', err);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};

// Fetch a specific user by ID
const getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.userId);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        console.error('Error fetching user: ', err);
        res.status(500).json({ error: 'Failed to fetch user' });
    }
};

// Create a new user
async function createUser(req, res) {
    // Run validation checks
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { name, email, password, contactInfo, roleId } = req.body;

        // Check if the email already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'Email is already in use' });
        }

        // Hash the password
        // const passwordHash = await bcrypt.hash(password, 10);

        // Create the user
        const newUser = await User.create({
            name,
            email,
            passwordHash: password, // Use the hashed password here
            contactInfo,
            roleId
        });

        res.status(201).json(newUser);
    } catch (error) {
        console.error("Error creating user: ", error);
        res.status(500).json({ error: error.message });
    }
}

// Update a user
const updateUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.userId);
        if (user) {
            const { name, email, passwordHash, contactInfo, roleId } = req.body;
            await user.update({ name, email, passwordHash, contactInfo, roleId });
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        console.error('Error updating user: ', err);
        res.status(500).json({ error: 'Failed to update user' });
    }
};

// Delete a user
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.userId);
        if (user) {
            await user.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        console.error('Error deleting user: ', err);
        res.status(500).json({ error: 'Failed to delete user' });
    }
};

// Create a new role
const createRole = async (req, res) => {
    try {
        const { roleName, permissions } = req.body;
        const newRole = await Role.create({ roleName, permissions });
        res.status(201).json(newRole);
    } catch (error) {
        console.error("Error creating role:", error);
        res.status(500).json({ message: "Failed to create role" });
    }
};

// Get all roles
const getAllRoles = async (req, res) => {
    try {
        const roles = await Role.findAll({
            raw: true,
            tableName: 'roles'
        });
        res.status(200).json(roles);
    } catch (error) {
        console.error("Error fetching roles:", error);
        res.status(500).json({ message: "Failed to fetch roles" });
    }
};

// Get a single role by ID
const getRoleById = async (req, res) => {
    try {
        const role = await Role.findByPk(req.params.id);
        if (!role) return res.status(404).json({ message: "Role not found" });
        res.status(200).json(role);
    } catch (error) {
        console.error("Error fetching role:", error);
        res.status(500).json({ message: "Failed to fetch role" });
    }
};

// Update a role
const updateRole = async (req, res) => {
    try {
        const { roleName, permissions } = req.body;
        const role = await Role.findByPk(req.params.id);
        if (!role) return res.status(404).json({ message: "Role not found" });
        await role.update({ roleName, permissions });
        res.status(200).json(role);
    } catch (error) {
        console.error("Error updating role:", error);
        res.status(500).json({ message: "Failed to update role" });
    }
};

// Delete a role
const deleteRole = async (req, res) => {
    try {
        const role = await Role.findByPk(req.params.id);
        if (!role) return res.status(404).json({ message: "Role not found" });
        await role.destroy();
        res.status(200).json({ message: "Role deleted successfully" });
    } catch (error) {
        console.error("Error deleting role:", error);
        res.status(500).json({ message: "Failed to delete role" });
    }
};

// Create or update user preferences
const upsertUserPreferences = async (req, res) => {
    try {
        const { userId } = req.params;
        const { preferredGenre, areaOfInterests, isAuthor, booksSoldCount, booksBoughtCount } = req.body;

        const preferences = await UserPreferences.upsert(
            { userId, preferredGenre, areaOfInterests, isAuthor, booksSoldCount, booksBoughtCount },
            { returning: true }
        );
        
        res.status(200).json(preferences);
    } catch (error) {
        console.error("Error creating/updating user preferences:", error);
        res.status(500).json({ message: "Failed to create or update user preferences" });
    }
};

// Get user preferences by user ID
const getUserPreferences = async (req, res) => {
    try {
        const { userId } = req.params;
        const preferences = await UserPreferences.findOne({ where: { userId } });
        if (!preferences) return res.status(404).json({ message: "User preferences not found" });
        res.status(200).json(preferences);
    } catch (error) {
        console.error("Error fetching user preferences:", error);
        res.status(500).json({ message: "Failed to fetch user preferences" });
    }
};

// Delete user preferences by user ID
const deleteUserPreferences = async (req, res) => {
    try {
        const { userId } = req.params;
        const preferences = await UserPreferences.findOne({ where: { userId } });
        if (!preferences) return res.status(404).json({ message: "User preferences not found" });
        await preferences.destroy();
        res.status(200).json({ message: "User preferences deleted successfully" });
    } catch (error) {
        console.error("Error deleting user preferences:", error);
        res.status(500).json({ message: "Failed to delete user preferences" });
    }
};

module.exports = { userValidationRules, getAllUsers, getUserById, createUser, updateUser, deleteUser, getAllRoles, getRoleById, updateRole, deleteRole, createRole };
