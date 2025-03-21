import { PostManager } from './postManager.js';

document.addEventListener("DOMContentLoaded", ()=>{
  new PostManager("postList", "commentInput", "postButton");
});