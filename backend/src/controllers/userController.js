const User = require('../models/User');

async function createUser(req, res, next) {
  try {
    const { nome, email, senha } = req.body;

    const user = await User.create({ nome, email, senha });

    const safeUser = user.toObject();
    delete safeUser.senha;

    return res.status(201).json(safeUser);
  } catch (error) {
    return next(error);
  }
}

async function getUsers(req, res, next) {
  try {
    const users = await User.find().select('-senha').sort({ createdAt: -1 });
    return res.status(200).json(users);
  } catch (error) {
    return next(error);
  }
}

async function updateUser(req, res, next) {
  try {
    const { id } = req.params;
    const { nome, email, senha } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { nome, email, senha },
      { new: true, runValidators: true }
    ).select('-senha');

    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    return next(error);
  }
}

async function deleteUser(req, res, next) {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  createUser,
  getUsers,
  updateUser,
  deleteUser
};

