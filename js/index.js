import { PostManager } from './postManager.js';
import { PostRepository } from "./postRepository.js";

document.addEventListener("DOMContentLoaded", ()=>{
  const postRepository = new PostRepository("comment_counter", "comment_num_");
  new PostManager("postList", "commentInput", "postButton", postRepository);
});