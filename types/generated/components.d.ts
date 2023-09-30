import type { Schema, Attribute } from '@strapi/strapi';

export interface GallerySlide extends Schema.Component {
  collectionName: 'components_gallery_slides';
  info: {
    displayName: 'Slide';
    icon: 'picture';
  };
  attributes: {
    Image: Attribute.Media;
    Caption: Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Shared {
    export interface Components {
      'gallery.slide': GallerySlide;
    }
  }
}
