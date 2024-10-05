import { type Config } from "drizzle-kit";

import { env } from "~/env";

export default {
  schema: "./src/lib/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.POSTGRES_URL,
  },
  tablesFilter: ["belly-bites_*"],
} satisfies Config;
