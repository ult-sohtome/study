import { PostRepository } from "./repositories/postRepository.js";
import { PostListController } from './postListController.js';
import { PostCreate } from './parts/postCreate.js';
import { PostDelete } from './parts/postDelete.js';
import { PostEdit } from './parts/postEdit.js';
import { UserNameRepository } from "./repositories/userNameRepository.js";
import { runMigrations } from "./migration/runMigrations.js";

document.addEventListener("DOMContentLoaded", ()=>{
  const htmlIds = {
    postListId: "postList",
    userNameId: "username",
    commentInputId: "commentInput",
    postButtonId: "postButton",
    prevButtonId: "prevBtn",
    paginateId: "pagination",
    nextButtonId: "nextBtn",
    errorNameId: "usernameError",
    errorCommentId: "commentError"
  };
  const postRepository = new PostRepository();
  runMigrations(postRepository);

  const userNameRepository = new UserNameRepository();
  const postListController = new PostListController(htmlIds, postRepository);
  const postCreate = new PostCreate(htmlIds, postRepository, postListController, userNameRepository );
  new PostDelete(postRepository, postListController);
  new PostEdit(postListController);

  if(userNameRepository.hasUserName()){
    postCreate.userName.value = userNameRepository.getUserName();
  }
});