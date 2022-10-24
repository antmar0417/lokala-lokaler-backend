'use strict';

/**
 * lokal service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::lokal.lokal');
