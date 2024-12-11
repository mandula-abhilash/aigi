import { connect } from "mongoose";
import dotenv from "dotenv";
import { GiftProfileModel } from "../../models/gift.profile.model.js";
import { generateUniqueSlug } from "../../lib/slugUtils.js";

dotenv.config();

async function addSlugsToExistingProfiles() {
  try {
    // Connect to MongoDB
    await connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    // Get all profiles without slugs
    const profiles = await GiftProfileModel.find({ slug: { $exists: false } });
    console.log(`Found ${profiles.length} profiles without slugs`);

    // Update each profile
    for (const profile of profiles) {
      profile.slug = generateUniqueSlug(profile.title);
      await profile.save();
      console.log(
        `Updated profile: ${profile.title} with slug: ${profile.slug}`
      );
    }

    console.log("Migration completed successfully");
    process.exit(0);
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
}

addSlugsToExistingProfiles();
