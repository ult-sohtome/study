import { PostManager } from './postManager.js';
import { PostRepository } from "./postRepository.js";

document.addEventListener("DOMContentLoaded", ()=>{
  const postRepository = new PostRepository();

  const htmlIds = {
    postListId: "postList",
    commentInputId: "commentInput",
    postButtonId: "postButton",
    prevButtonId: "prevBtn",
    paginateId: "pagination",
    nextButtonId: "nextBtn"
  };
  new PostManager(htmlIds, postRepository);
});