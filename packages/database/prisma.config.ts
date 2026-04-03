import path from "node:path";
import { config as loadEnv } from "dotenv";
import { defineConfig, env } from "prisma/config";

// Load DATABASE_URL from typical monorepo locations (cwd is often packages/database)
const envPaths = [
  path.join(process.cwd(), ".env"),
  path.join(process.cwd(), "../../apps/api/.env"),
  path.join(process.cwd(), "../../.env"),
  path.join(process.cwd(), "apps/api/.env"),
];
for (const p of envPaths) {
  loadEnv({ path: p });
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});
