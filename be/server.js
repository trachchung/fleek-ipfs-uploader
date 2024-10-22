import { FleekSdk, PersonalAccessTokenService } from "@fleek-platform/sdk/node";
import { filesFromPaths } from "files-from-path";
import express from "express";
import multer from "multer";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
dotenv.config();

// Define __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const patService = new PersonalAccessTokenService({
  personalAccessToken: process.env.PAT_TOKEN, // your PAT goes here
  projectId: process.env.PROJECT_ID, // Optional
});

const fleekSdk = new FleekSdk({ accessTokenService: patService });

const app = express();
const port = 8080;
app.use(cors());

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

// Endpoint to upload file
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    console.log("File uploaded:", req.file.originalname);
    const filePath = path.join(__dirname, "uploads", req.file.originalname);

    const file = await filesFromPaths([filePath]);

    // Upload file to fleek
    const result = await fleekSdk.storage().uploadFile({
      file: file[0],
    });

    res.status(200).json({ message: "File uploaded to fleek", data: result });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to upload file" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://127.0.0.1:${port}`);
});
