import { PostCreateValidation } from "../validation/postCreateValidation.js";

export class PostCreate {
  constructor(htmlIds, postRepository, postListController, userNameRepository){
    this.postRepository = postRepository;
    this.postListController = postListController;
    this.userNameRepository = userNameRepository;
    this.postCreateValidation = new PostCreateValidation();
    this.commentInput = document.getElementById(htmlIds.commentInputId);
    this.userName = document.getElementById(htmlIds.userNameId);
    this.postButton = document.getElementById(htmlIds.postButtonId);
    this.errorNameElem = document.getElementById(htmlIds.errorNameId);
    this.errorCommentElem = document.getElementById(htmlIds.errorCommentId);
    this.setupEventListeners();
  }

  createComment(){
    const comment = this.commentInput.value.trim();
    const userName = this.userName.value.trim();
    this.clearFormErrors();
    let isValid = true;

    const userNameValidation = this.postCreateValidation.validateUserName(userName);
    if(!userNameValidation.isValid){
      this.errorNameElem.textContent = userNameValidation.errorMessage;
      this.errorNameElem.style.display = "inline-block";
      isValid = false;
    }

    const commentValidation = this.postCreateValidation.validateCreateComment(comment);
    if(!commentValidation.isValid){
      this.errorCommentElem.textContent = commentValidation.errorMessage;
      this.errorCommentElem.style.display = "inline-block";
      isValid = false;
    }

    if(!isValid) return;

    if(userName !== ""){
      this.userNameRepository.setUserName(userName);
    }
    this.postRepository.addComment(comment, userName);
    this.postListController.allPosts = this.postRepository.getAllPosts();
    const totalPages = this.postListController.paginator.totalPages(this.postListController.allPosts);
    this.postListController.refreshPostList(totalPages);
    this.commentInput.value = "";
  }

  clearFormErrors(){
    this.errorNameElem.textContent = "";
    this.errorCommentElem.textContent = "";
    this.errorCommentElem.style.display = "none";
    this.errorNameElem.style.display = "none";
  }

  setupEventListeners(){
    this.postButton.addEventListener("click", () => {
      this.createComment();
    });
  }
}