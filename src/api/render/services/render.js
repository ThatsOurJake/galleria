'use strict';

/**
 * render service
 */

module.exports = () => ({
  /**
   * 
   * @param {string} uid 
   */
  iframe: async (uid) => {
    const entry = await strapi.entityService.findMany('api::gallery.gallery', {
      filters: {
        uid
      },
      fields: ["uid"],
      populate: {
        Slide: {
          fields: ["Caption"],
          populate: {
            Image: {
              fields: ["url", "width", "height"]
            }
          }
        }
      }
    });

    return (entry && entry[0]) || null;
  }
});
