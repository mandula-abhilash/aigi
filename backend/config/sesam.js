import dotenv from "dotenv";

dotenv.config();

export const sesamConfig = {
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  accessTokenExpiry: "15m",
  refreshTokenExpiry: "7d",
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
