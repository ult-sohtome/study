import { PostRepository } from "./repositories/postRepository.js";
import { PostListController } from './postListController.js';
import { PostCreate } from './parts/postCreate.js';
import { PostDelete } from './parts/postDelete.js';
import { CommentDataMigration_20250403 } from "./migration/commentDataMigration_20250403.js";

document.addEventListener("DOMContentLoaded", ()=>{
  const htmlIds = {
    postListId: "postList",
    commentInputId: "commentInput",
    postButtonId: "postButton",
    prevButtonId: "prevBtn",
    paginateId: "pagination",
    nextButtonId: "nextBtn"
  };
  const postRepository = new PostRepository();
  const MIGRATION_KEY = 'is_comment_data_migrated_20250403';
  if(!localStorage.getItem(MIGRATION_KEY)){
    new CommentDataMigration_20250403(postRepository);
    localStorage.setItem(MIGRATION_KEY, 'true');
  }
  const postListController = new PostListController(htmlIds, postRepository);
  new PostCreate(htmlIds, postRepository, postListController);
  new PostDelete(postRepository, postListController);
});