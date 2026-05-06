const express = require('express');
const {
  registerUser,
  loginUser,
  getUserById,
  updateCurrentUser,
  updateUserPreferences,
  createUser,
  getUsers,
  updateUser,
  deleteUser
} = require('../controllers/userController');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/:id', getUserById);
router.patch('/:id/preferences', updateUserPreferences);
router.put('/:id/profile', updateCurrentUser);

router.post('/', createUser);
router.get('/', getUsers);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;

