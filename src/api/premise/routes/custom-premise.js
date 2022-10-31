"use strict";

/**
 * custom router.
 */

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/premises/me",
      handler: "premise.me",
      config: {},
    },
  ],
};
