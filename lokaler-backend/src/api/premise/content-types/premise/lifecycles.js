const slugify = require("slugify");

module.exports = {
  beforeCreate(createdPremise) {
    const { data } = createdPremise.params;

    if (data.title) {
      data.slug = slugify(data.title, { lower: true });
    }
  },

  beforeUpdate(updatedPremise) {
    const { data } = updatedPremise.params;

    if (data.title) {
      data.slug = slugify(data.title, { lower: true });
    }
  },
};
