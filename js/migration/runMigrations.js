import { CommentDataMigration_20250403 } from "./commentDataMigration_20250403.js";
import { CommentDataMigration_20250404 } from "./commentDataMigration_20250404.js";
import { CommentDataMigration_20250416 } from "./commentDataMigration_20250416.js";

const migrations = [
  {
    migrationFlagKey: 'is_comment_data_migrated_20250403',
    migrate: (postRepository) => new CommentDataMigration_20250403(postRepository)
  },
  {
    migrationFlagKey: 'is_comment_data_migrated_20250404',
    migrate: (postRepository) => new CommentDataMigration_20250404(postRepository)
  },
  {
    migrationFlagKey: 'is_comment_data_migrated_20250416',
    migrate: (postRepository) => new CommentDataMigration_20250416(postRepository)
  }
];

export function runMigrations(postRepository) {
  migrations.forEach(({ migrationFlagKey, migrate }) => {
    if(localStorage.getItem(migrationFlagKey) !== 'true'){
      migrate(postRepository);
      localStorage.setItem(migrationFlagKey, 'true');
    }
  });
}
