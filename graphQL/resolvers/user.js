const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');

module.exports = {
  createUser: async args => {
    try {
      const currentUser = await User.findOne({
        email: args.userInput.email,
      });
      if (currentUser) {
        throw new Error('User exists already.');
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

      const user = new User({
        email: args.userInput.email,
        password: hashedPassword,
      });
      const result = await user.save();
      return { ...result._doc, password: null, _id: result.id };
    } catch (err) {
      throw err;
    }
  },

  //Everything below is either non working or just not implemented properly

  usrLogin: async ({ email, password }) => {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error('User does not exist!');
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      throw new Error('Password is incorrect!');
    }
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      'secretkey',
      { expiresIn: '1h' }
    );
    return { userId: user.id, token: token, tokenExpiration: 1 };
  },
  updateUser: async ({ userId, userInput }) => {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found.');
      }

      if (userInput.profilePicture) {
        user.profilePicture = userInput.profilePicture;
      }
      if (userInput.description) {
        user.description = userInput.description;
      }

      const updateUser = await user.save();
      return { ...updatedUser._doc, password: null };
    } catch (err) {
      throw err;
    }
  },
  user: async args => {
    try {
      const user = await User.findById(args.userId);
      if (!user) {
        throw new Error('User not found.');
      }
      return { ...user._doc, password: null };
    } catch (err) {
      throw err;
    }
  },
};
