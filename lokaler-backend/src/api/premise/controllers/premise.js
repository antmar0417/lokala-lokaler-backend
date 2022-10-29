"use strict";

/**
 * premise controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

// module.exports = createCoreController('api::premise.premise');

// Changed 29 Oct to get premises/me
module.exports = createCoreController("api::premise.premise", ({ strapi }) => ({
  // Get logged in users
  async me(ctx) {
    const user = ctx.state.user;

    if (!user) {
      return ctx.badRequest(null, [
        { message: "No authorization header was found" },
      ]);
    }

    const data = await strapi.db.query("api::premise.premise").findMany({
      where: {
        user: { id: user.id },
      },
      populate: { user: true, image: true },
    });
    if (!data) {
      return ctx.notFound();
    }

    const res = await this.sanitizeOutput(data, ctx);
    return res;
  },
}));
