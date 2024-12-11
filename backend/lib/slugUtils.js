import shortid from "shortid";
import slugify from "slugify";

// Configure shortid to use only alphanumeric characters
shortid.characters(
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_"
);

export const generateUniqueSlug = (title) => {
  const baseSlug = slugify(title, {
    lower: true,
    strict: true,
    trim: true,
  });

  const uniqueId = shortid.generate();
  return `${baseSlug}-${uniqueId}`;
};
