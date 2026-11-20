// Runs before `next build`: applies pending database migrations when a
// database is configured, and does nothing otherwise (the site then uses its
// built-in content).
import "dotenv/config";
import { execSync } from "node:child_process";

const url = process.env.DATABASE_URL_UNPOOLED || process.env.DIRECT_URL || process.env.DATABASE_URL;

if (!url) {
  console.log("No DATABASE_URL set: skipping database migrations.");
} else {
  console.log("Applying database migrations…");
  execSync("npx prisma migrate deploy", { stdio: "inherit" });
}
