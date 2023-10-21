const bcrypt = require('bcryptjs');
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
};
