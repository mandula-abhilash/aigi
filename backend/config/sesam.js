import dotenv from "dotenv";

dotenv.config();

export const sesamConfig = {
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRY: "900", // 15 minutes in seconds
  REFRESH_TOKEN_EXPIRY: "604800", // 7 days in seconds
  emailConfig: {
    provider: "ses",
    from: process.env.SES_EMAIL_FROM,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  },
  appUrl: process.env.APP_URL,
};
