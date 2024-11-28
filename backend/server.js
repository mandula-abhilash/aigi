import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import { createAuthModule } from "visdak-sesam";
import { sesamConfig } from "./config/sesam.js";

import geoRouter from "./routes/geo.routes.js";
import suggestionsRoute from "./routes/suggestions.routes.js";

const startServer = async () => {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(helmet()); // Security headers
  app.use(compression()); // GZIP compression
  app.use(express.json());
  app.use(morgan("combined")); // Logging HTTP requests

  // Trust proxy for Nginx or other reverse proxies
  app.set("trust proxy", true);

  try {
    // Initialize the visdak-sesam auth module
    const { router: authRouter, middleware } = await createAuthModule(
      sesamConfig
    );

    // Mount the auth router
    app.use("/api/auth", authRouter);

    // Mount the geo router
    app.use("/api/geo", geoRouter);

    // Mount the suggestions route
    app.use("/api/suggestions", suggestionsRoute);

    // Example of a protected route
    app.get("/api/protected", middleware.protect, (req, res) => {
      res.json({ message: "This is a protected route.", user: req.user });
    });

    // Example of an admin-only route
    app.get("/api/admin", middleware.protect, middleware.admin, (req, res) => {
      res.json({ message: "This is an admin-only route.", user: req.user });
    });

    // Catch-all for undefined routes
    app.use((req, res) => {
      res.status(404).json({ error: "Route not found" });
    });

    // Global error handler
    app.use((err, req, res, next) => {
      console.error("Unhandled error:", err.message);
      res.status(500).json({ error: "Internal server error" });
    });

    const instanceId = parseInt(process.env.NODE_APP_INSTANCE || 0, 10);
    const basePort = Number(process.env.PORT) || 6000;

    const PORT = basePort + instanceId;

    app.listen(PORT, () => {
      console.log(
        `Server running in ${
          process.env.NODE_ENV || "development"
        } mode on port ${PORT}`
      );
    });
  } catch (error) {
    console.error("Failed to initialize the application:", error.message);
    process.exit(1);
  }
};

startServer();
