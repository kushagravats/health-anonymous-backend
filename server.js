const mongoose = require("mongoose");
require("dotenv").config();

const uri =
  process.env.MONGODB_URI || "mongodb://localhost:27017/health_anonymous";

mongoose
  .connect(uri, {
    // @ts-ignore
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));
