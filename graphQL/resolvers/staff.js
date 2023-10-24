const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Staff = require('../../models/staff');

module.exports = {
  createStaff: async args => {
    try {
      const currentStaff = await Staff.findOne({
        email: args.staffInput.email,
      });
      if (currentStaff) {
        throw new Error('Staff exists already.');
      }
      const hashedPassword = await bcrypt.hash(args.staffInput.password, 12);

      const staff = new Staff({
        email: args.staffInput.email,
        password: hashedPassword,
      });
      const result = await staff.save();
      return { ...result._doc, password: null, _id: result.id };
    } catch (err) {
      throw err;
    }
  },
  login: async ({ email, password }) => {
    const staff = await Staff.findOne({ email: email });
    if (!staff) {
      throw new Error('Staff does not exist!');
    }
    const isEqual = await bcrypt.compare(password, staff.password);
    if (!isEqual) {
      throw new Error('Password is incorrect!');
    }
    const token = jwt.sign(
      { staffId: staff.id, email: staff.email },
      'secretkey',
      { expiresIn: '1h' }
    );
    return { staffId: staff.id, token: token, tokenExpiration: 1 };
  },
};
