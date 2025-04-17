import { PostRepository } from "./repositories/postRepository.js";
import { PostListController } from './postListController.js';
import { PostCreate } from './parts/postCreate.js';
import { PostDelete } from './parts/postDelete.js';
import { PostEdit } from './parts/postEdit.js';
import { UserNameRepository } from "./repositories/userNameRepository.js";
import { runMigrations } from "./migration/runMigrations.js";
import { PostSearch } from "./parts/postSearch.js";

document.addEventListener("DOMContentLoaded", ()=>{
  const htmlIds = {
    postListId: "postList",
    userNameId: "username",
    commentInputId: "commentInput",
    postButtonId: "postButton",
    prevButtonId: "prevBtn",
    paginateId: "pagination",
    nextButtonId: "nextBtn",
    searchInputId: "searchInput",
    searchButtonId: "searchButton",
    resetButtonId: "resetButton"
  };
  const postRepository = new PostRepository();
  runMigrations(postRepository);

  const userNameRepository = new UserNameRepository();
  const postListController = new PostListController(htmlIds, postRepository);
  const postCreate = new PostCreate(htmlIds, postRepository, postListController, userNameRepository );
  new PostDelete(postRepository, postListController);
  new PostEdit(postRepository, postListController);
  new PostSearch(htmlIds, postRepository, postListController);

  if(userNameRepository.hasUserName()){
    postCreate.userName.value = userNameRepository.getUserName();
  }
});