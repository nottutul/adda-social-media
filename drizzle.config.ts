import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  schemaFilter: ['public'],
  tablesFilter: ['users', 'posts'],
  dbCredentials: {
    url: process.env.DATABASE_URL!.replace(':6543/', ':5432/'),
  },
});
