import { Schema, model } from "mongoose";

/**
 * Schema for the Product sub-document.
 *
 * @property {String} title - Title of the product (required).
 * @property {String} link - URL to the product (required, valid URL).
 * @property {String} description - Description of the product (required).
 */
const productSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Product title is required"],
      trim: true,
    },
    link: {
      type: String,
      required: [true, "Product link is required"],
      validate: {
        validator: (v) => {
          return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(v);
        },
        message: "Please provide a valid URL for the product link",
      },
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      minlength: [10, "Description must be at least 10 characters long"],
      trim: true,
    },
    keywords: {
      type: [String],
      required: [true, "At least one keyword is required"],
      validate: {
        validator: (v) => Array.isArray(v) && v.length > 0,
        message: "At least one keyword is required",
      },
    },
  },
  { _id: false } // Sub-document schema, no separate _id
);

/**
 * Schema for the GiftProfile collection.
 *
 * @property {String} title - Title of the gift profile (required).
 * @property {String} description - Description of the gift profile (required).
 * @property {String} image - URL to the profile image (required, valid URL).
 * @property {Array<String>} interests - Array of interests associated with the profile.
 * @property {Array<Object>} products - Array of products associated with the profile.
 */
const giftProfileSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Profile title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Profile description is required"],
      minlength: [10, "Description must be at least 10 characters long"],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Image URL is required"],
      validate: {
        validator: (v) => {
          return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(v);
        },
        message: "Please provide a valid URL for the image",
      },
    },
    imageCredit: {
      type: String,
      required: [true, "Image credit is required"],
      trim: true,
    },
    interests: {
      type: [String],
      validate: {
        validator: (v) => Array.isArray(v) && v.length > 0,
        message: "At least one interest is required",
      },
    },
    products: {
      type: [productSchema],
      validate: {
        validator: (v) => Array.isArray(v) && v.length > 0,
        message: "At least one product is required",
      },
    },
  },
  {
    timestamps: true,
    collection: "giftProfiles",
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret.__v; // Remove Mongoose version key
        return ret;
      },
    },
    toObject: {
      virtuals: true,
    },
  }
);

/**
 * Mongoose model for the GiftProfile schema.
 */
export const GiftProfileModel = model("GiftProfile", giftProfileSchema);
