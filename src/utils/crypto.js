
import crypto from "crypto";

const algorithm = "aes-256-cbc";

// ⚠️ SAME logic as backend (IMPORTANT)
const key = crypto
  .createHash("sha256")
  .update("jayconisthebestplacewherewecreateerp") // same as backend env
  .digest("base64")
  .substr(0, 32);

// ⚠️ SAME static IV
const iv = Buffer.alloc(16, 0);

// ✅ ENCRYPT
export const encrypt = (text) => {
  if (!text) return text;

  const cipher = crypto.createCipheriv(algorithm, key, iv);

  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  return encrypted; // ✅ only encrypted string
};

// ✅ DECRYPT (frontend me use karna ho toh)
export const decrypt = (text) => {
  if (!text) return text;

  const decipher = crypto.createDecipheriv(algorithm, key, iv);

  let decrypted = decipher.update(text, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
};