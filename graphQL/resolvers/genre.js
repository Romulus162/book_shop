const Genre = require('../../models/genre');

module.exports = {
  genres: async () => {
    try {
      return await Genre.find();
    } catch (err) {
      throw err;
    }
  },
  createGenre: async args => {
    try {
      const genre = new Genre({
        name: args.genreInput.name,
      });
      const result = await genre.save();

      return { ...result._doc, _id: result._doc._id.toString() };
    } catch (err) {
      throw err;
    }
  },
};
