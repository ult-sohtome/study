import { PostValidation } from "../validation/postValidation.js";
import { PostViewRenderer } from "./PostViewRenderer.js";

export class PostEdit {
  constructor(postRepository, postListController){
    this.postRepository = postRepository;
    this.postListController = postListController;
    this.postList = this.postListController.postList;
    this.setupEventListeners();
  }

  editPost(postKey, liElement){
    const postContent = liElement.querySelector(".postContent");
    const postText = liElement.querySelector(".postText");
    const spanUsername = postText.querySelector(".userName");
    const spanComment = postText.querySelector(".commentText");
    const currentUserName = spanUsername.textContent.replace("さん", "");
    const currentComment = spanComment.textContent;

    const errorName = PostViewRenderer.createErrorNameMessage();
    const errorComment = PostViewRenderer.createErrorCommentMessage();

    liElement.insertBefore(errorName, postContent);
    liElement.insertBefore(errorComment, postContent);

    const editUserName = PostViewRenderer.createInputUserName(currentUserName);
    const editComment = PostViewRenderer.createTextAreaComment(currentComment);

    postText.replaceChild(editUserName, spanUsername);
    postText.replaceChild(editComment, spanComment);

    const saveButton = PostViewRenderer.createSaveButton(postKey);
    const cancelButton = PostViewRenderer.createCancelButton();

    postContent.replaceChild(saveButton, postContent.querySelector(".editButton"));
    postContent.replaceChild(cancelButton, postContent.querySelector(".deleteButton"));
  }

  updatePost(postKey, liElement){
    const postContent = liElement.querySelector(".postContent");
    const postText = liElement.querySelector(".postText");
    const editUserName = postText.querySelector(".editUserName").value.trim();
    const editComment = postText.querySelector(".editCommentText").value.trim();
    const errorNameElem = liElement.querySelector(".errorUpdateName");
    const errorCommentElem = liElement.querySelector(".errorUpdateComment");
  
    errorNameElem.textContent = "";
    errorCommentElem.textContent = "";
    errorNameElem.style.display = "none";
    errorCommentElem.style.display = "none";
    let isValid = true;

    const userNameValidation = PostValidation.validateUserName(editUserName);
    if(!userNameValidation.isValid){
      errorNameElem.textContent = userNameValidation.errorMessage;
      errorNameElem.style.display = "block";
      isValid = false;
    }

    const commentValidation = PostValidation.validateCreateComment(editComment);
    if(!commentValidation.isValid){
      errorCommentElem.textContent = commentValidation.errorMessage;
      errorCommentElem.style.display = "block";
      isValid = false;
    }
    
    if(!isValid) return;

    this.postRepository.updateComment(postKey, editUserName, editComment);
    
    postContent.removeChild(liElement.querySelector(".saveButton"));
    postContent.removeChild(liElement.querySelector(".cancelButton"));

    const spanUsername = PostViewRenderer.createSpanUserName(editUserName);
    const spanComment = PostViewRenderer.createSpanComment(editComment);

    postText.replaceChild(spanUsername, postText.querySelector(".editUserName"));
    postText.replaceChild(spanComment, postText.querySelector(".editCommentText"));

    this.postListController.refreshPostList(this.postListController.currentPage);
  }

  setupEventListeners(){
    this.postList.addEventListener("click", e => {
      if(e.target.classList.contains("editButton")) {
        const postKey = e.target.dataset.key;
        const li = e.target.closest("li");

        if(postKey && li){
          this.editPost(postKey, li);
        }
      }
    });

    this.postList.addEventListener("click", e => {
      if(e.target.classList.contains("saveButton")) {
        const postKey = e.target.dataset.key;
        const li = e.target.closest("li");

        if(postKey && li){
          this.updatePost(postKey, li);
        }
      }
    });

    this.postList.addEventListener("click", e => {
      if(e.target.classList.contains("cancelButton")) {
        this.postListController.refreshPostList(this.postListController.currentPage);
      }
    });
  }
}