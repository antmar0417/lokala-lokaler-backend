"use strict";

/**
 * premise controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

// module.exports = createCoreController('api::premise.premise');

// Changed 29 Oct to get premises/me
module.exports = createCoreController("api::premise.premise", ({ strapi }) => ({
  // ----------------- Find with populate -----------------
  async find(ctx) {
    const populateList = ["image", "user"];

    // --- Push any additional query params to the array ---
    populateList.push(ctx.query.populate);
    ctx.query.populate = populateList.join(",");

    // console.log(ctx.query)

    const content = await super.find(ctx);
    return content;
  },

  // ----------------- Create user premise -----------------
  async create(ctx) {
    let entity;
    ctx.request.body.data.user = ctx.state.user;
    entity = await super.create(ctx);
    return entity;
  },

  // ----------------- Update user premise -----------------
  async update(ctx) {
    let entity;
    const { id } = ctx.params;
    const query = {
      filters: {
        id: id,
        user: { id: ctx.state.user.id },
      },
    };
    const premises = await this.find({ query: query });

    // console.log(premises);

    if (!premises.data || !premises.data.length) {
      return ctx.unauthorized(`You can't update this entry`);
    }
    entity = await super.update(ctx);
    return entity;
  },

  // ----------------- Delete a user premise -----------------
  async delete(ctx) {
    const { id } = ctx.params;

    const query = {
      filters: {
        id: id,
        user: { id: ctx.state.user.id },
      },
    };

    const premises = await this.find({ query: query });
    if (!premises.data || !premises.data.length) {
      return ctx.unauthorized(`You can't delete this entry`);
    }

    const response = await super.delete(ctx);
    return response;
  },

  // ----------------- Get logged in users -----------------
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
