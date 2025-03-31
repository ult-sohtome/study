import { PostManager } from './postManager.js';
import { PostRepository } from "./postRepository.js";

document.addEventListener("DOMContentLoaded", ()=>{
  const postRepository = new PostRepository();
  new PostManager("postList", "commentInput", "postButton", "prev", "paginateButton", "next", postRepository);
});