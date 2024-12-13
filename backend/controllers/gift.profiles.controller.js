import { GiftProfileModel } from "../models/gift.profile.model.js";

/**
 * Create a new gift profile
 */
export const createGiftProfile = async (req, res) => {
  try {
    const {
      title,
      description,
      image,
      creditAuthor,
      creditAuthorLink,
      creditPlatformLink,
      interests,
    } = req.body;

    const giftProfile = new GiftProfileModel({
      title,
      description,
      image,
      creditAuthor,
      creditAuthorLink,
      creditPlatformLink,
      interests,
      products: [], // Initialize with empty products array
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
 * Add a product to a gift profile
 */
export const addProductToProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const productData = req.body;

    const giftProfile = await GiftProfileModel.findById(id);
    if (!giftProfile) {
      return res.status(404).json({ error: "Gift profile not found" });
    }

    giftProfile.products.push(productData);
    await giftProfile.save();

    res.status(200).json({
      message: "Product added successfully",
      giftProfile,
    });
  } catch (error) {
    console.error("Error adding product:", error.message);
    res.status(500).json({ error: "Failed to add product" });
  }
};

/**
 * Get all gift profiles with search and sort functionality
 */
export const getGiftProfiles = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";

    let query = {};

    if (search) {
      const searchRegex = new RegExp(search, "i");
      query = {
        $or: [
          { title: searchRegex },
          { description: searchRegex },
          { interests: searchRegex },
        ],
      };
    }

    // Get total count for pagination
    const total = await GiftProfileModel.countDocuments(query);

    // Get paginated results
    const profiles = await GiftProfileModel.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    // Calculate if there are more pages
    const hasMore = total > page * limit;

    res.status(200).json({
      profiles,
      hasMore,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Error fetching gift profiles:", error.message);
    res.status(500).json({ error: "Failed to fetch gift profiles" });
  }
};

/**
 * Get a single gift profile by ID or slug
 */
export const getGiftProfileById = async (req, res) => {
  try {
    const { id } = req.params;
    let giftProfile;

    // First try to find by slug
    giftProfile = await GiftProfileModel.findOne({ slug: id });

    // If not found by slug, try to find by ID
    if (!giftProfile) {
      giftProfile = await GiftProfileModel.findById(id);
    }

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
    const {
      title,
      description,
      image,
      creditAuthor,
      creditAuthorLink,
      creditPlatformLink,
      interests,
    } = req.body;

    const giftProfile = await GiftProfileModel.findByIdAndUpdate(
      id,
      {
        title,
        description,
        image,
        creditAuthor,
        creditAuthorLink,
        creditPlatformLink,
        interests,
      },
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
