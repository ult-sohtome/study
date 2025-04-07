import { CommentDataMigration_20250403 } from "./commentDataMigration_20250403.js";
import { CommentDataMigration_20250404 } from "./commentDataMigration_20250404.js";

const MIGRATION_FLAG_TRUE = Object.freeze('true');

const migrations = [
  {
    version: 'is_comment_data_migrated_20250403',
    migrate: (postRepository) => new CommentDataMigration_20250403(postRepository)
  },
  {
    version: 'is_comment_data_migrated_20250404',
    migrate: (postRepository) => new CommentDataMigration_20250404(postRepository)
  }
];

export function runMigrations(postRepository) {
  migrations.forEach(({ version, migrate }) => {
    if(localStorage.getItem(version) !== MIGRATION_FLAG_TRUE){
      migrate(postRepository);
      localStorage.setItem(version, MIGRATION_FLAG_TRUE);
    }
  });
}
