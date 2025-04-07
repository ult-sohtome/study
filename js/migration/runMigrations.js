import { CommentDataMigration_20250403 } from "./commentDataMigration_20250403.js";
import { CommentDataMigration_20250404 } from "./commentDataMigration_20250404.js";

const MIGRATION_KEY = Object.freeze('migration_comment_data_20250403');
const MIGRATION_VERSION_KEY = Object.freeze('comment_migration_version');

const migrations = [
  {
    version: 1,
    migrate: (postRepository) => new CommentDataMigration_20250403(postRepository)
  },
  {
    version: 2,
    migrate: (postRepository) => new CommentDataMigration_20250404(postRepository)
  }
];

export function runMigrations(postRepository) {
  if(localStorage.getItem(MIGRATION_KEY)){
    localStorage.setItem(MIGRATION_VERSION_KEY, '1');
    localStorage.removeItem(MIGRATION_KEY);
  }
  const currentVersion = parseInt(localStorage.getItem(MIGRATION_VERSION_KEY) || '0', 10);

  const pendingMigrations = migrations.filter(migration => migration.version > currentVersion);

  for (const migration of pendingMigrations) {
    migration.migrate(postRepository);
    localStorage.setItem(MIGRATION_VERSION_KEY, migration.version.toString());
  }
}
