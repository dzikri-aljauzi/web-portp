import "dotenv/config";
import { defineConfig } from "prisma/config";

// Migrations should use a direct (non-pooled) connection when one is available.
// Neon's Vercel integration provides DATABASE_URL_UNPOOLED.
const url =
  process.env.DATABASE_URL_UNPOOLED || process.env.DIRECT_URL || process.env.DATABASE_URL || "";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: { url },
});
