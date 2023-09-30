'use strict';

const ejs = require('ejs');
const path = require('path');

/**
 * A set of functions called "actions" for `render`
 */

module.exports = {
  /**
   * 
   * @param {import("koa").Context} ctx 
   * @param {import("koa").Next} next 
   */
  iframe: async (ctx, next) => {
    const uid = ctx.params["id"];

    try {
      const data = await strapi.service('api::render.render').iframe(uid);

      if (!data) {
        throw new Error(`404 - ${uid} not found`);
      }

      ctx.body = (await ejs.renderFile(path.resolve(__dirname, 'templates', 'iframe.ejs'), {
        data,
      }));
    } catch (err) {
      strapi.log.error(err);
      ctx.body = (await ejs.renderFile(path.resolve(__dirname, 'templates', 'error.ejs')));
    }
  }
};
