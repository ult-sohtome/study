import { PostRepository } from "./repositories/postRepository.js";
import { PostListController } from './postListController.js';
import { PostCreate } from './parts/postCreate.js';
import { PostDelete } from './parts/postDelete.js';

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
  const postListController = new PostListController(htmlIds, postRepository);
  new PostCreate(htmlIds, postRepository, postListController);
  new PostDelete(postRepository, postListController);
});