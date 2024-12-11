import { Schema, model } from "mongoose";
import { generateUniqueSlug } from "../lib/slugUtils.js";

/**
 * Schema for the Product sub-document.
 *
 * @property {String} title - Title of the product (required).
 * @property {String} link - URL to the product (required, valid URL).
 * @property {String} description - Description of the product (required).
 * @property {String} whyItsGreat - Explanation of why this is a great gift (required).
 * @property {Array<String>} keywords - Keywords for the product (required).
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
    whyItsGreat: {
      type: String,
      required: [true, "Please explain why this is a great gift"],
      minlength: [10, "Explanation must be at least 10 characters long"],
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
  { _id: false }
);

/**
 * Schema for the GiftProfile collection.
 *
 * @property {String} title - Title of the gift profile (required).
 * @property {String} slug - URL-friendly version of the title (unique).
 * @property {String} description - Description of the gift profile (required).
 * @property {String} image - URL to the profile image (required, valid URL).
 * @property {String} creditAuthor - Name of the image author (required).
 * @property {String} creditAuthorLink - Link to the author's profile (required).
 * @property {String} creditPlatformLink - Link to the platform (required).
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
    slug: {
      type: String,
      unique: true,
      index: true,
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
    creditAuthor: {
      type: String,
      required: [true, "Image credit author is required"],
      trim: true,
    },
    creditAuthorLink: {
      type: String,
      required: [true, "Author profile link is required"],
      validate: {
        validator: (v) => {
          return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(v);
        },
        message: "Please provide a valid URL for the author profile",
      },
    },
    creditPlatformLink: {
      type: String,
      required: [true, "Platform link is required"],
      validate: {
        validator: (v) => {
          return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(v);
        },
        message: "Please provide a valid URL for the platform",
      },
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
      default: [],
    },
  },
  {
    timestamps: true,
    collection: "gift_profiles",
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret.__v;
        return ret;
      },
    },
    toObject: {
      virtuals: true,
    },
  }
);

// Pre-save middleware to generate slug
giftProfileSchema.pre("save", async function (next) {
  if (!this.isModified("title")) {
    return next();
  }

  try {
    this.slug = generateUniqueSlug(this.title);
    next();
  } catch (error) {
    next(error);
  }
});

export const GiftProfileModel = model("GiftProfile", giftProfileSchema);
