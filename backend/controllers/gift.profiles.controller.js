import { GiftProfileModel } from "../models/gift.profile.model.js";

/**
 * Create a new gift profile
 */
export const createGiftProfile = async (req, res) => {
  try {
    const { title, description, image, imageCredit, interests, products } =
      req.body;

    const giftProfile = new GiftProfileModel({
      title,
      description,
      image,
      imageCredit,
      interests,
      products,
    });

    await giftProfile.save();
    res
      .status(201)
      .json({ message: "Gift profile created successfully", giftProfile });
  } catch (error) {
    console.error("Error creating gift profile:", error.message);
    res.status(500).json({ error: "Failed to create gift profile" });
  }
};

/**
 * Get all gift profiles
 */
export const getGiftProfiles = async (req, res) => {
  try {
    const giftProfiles = await GiftProfileModel.find();
    res.status(200).json(giftProfiles);
  } catch (error) {
    console.error("Error fetching gift profiles:", error.message);
    res.status(500).json({ error: "Failed to fetch gift profiles" });
  }
};

/**
 * Get a single gift profile by ID
 */
export const getGiftProfileById = async (req, res) => {
  try {
    const { id } = req.params;
    const giftProfile = await GiftProfileModel.findById(id);

    if (!giftProfile) {
      return res.status(404).json({ error: "Gift profile not found" });
    }

    res.status(200).json(giftProfile);
  } catch (error) {
    console.error("Error fetching gift profile:", error.message);
    res.status(500).json({ error: "Failed to fetch gift profile" });
  }
};

/**
 * Update a gift profile by ID
 */
export const updateGiftProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image, imageCredit, interests, products } =
      req.body;

    const giftProfile = await GiftProfileModel.findByIdAndUpdate(
      id,
      { title, description, image, imageCredit, interests, products },
      { new: true }
    );

    if (!giftProfile) {
      return res.status(404).json({ error: "Gift profile not found" });
    }

    res
      .status(200)
      .json({ message: "Gift profile updated successfully", giftProfile });
  } catch (error) {
    console.error("Error updating gift profile:", error.message);
    res.status(500).json({ error: "Failed to update gift profile" });
  }
};

/**
 * Delete a gift profile by ID
 */
export const deleteGiftProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const giftProfile = await GiftProfileModel.findByIdAndDelete(id);

    if (!giftProfile) {
      return res.status(404).json({ error: "Gift profile not found" });
    }

    res.status(200).json({ message: "Gift profile deleted successfully" });
  } catch (error) {
    console.error("Error deleting gift profile:", error.message);
    res.status(500).json({ error: "Failed to delete gift profile" });
  }
};
