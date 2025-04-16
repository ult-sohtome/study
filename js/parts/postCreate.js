import { PostValidation } from "../validation/postValidation.js";
import { PostViewRenderer } from "../view/PostViewRenderer.js";

export class PostCreate {
  constructor(htmlIds, postRepository, postListController, userNameRepository){
    this.postRepository = postRepository;
    this.postListController = postListController;
    this.userNameRepository = userNameRepository;
    this.commentInput = PostViewRenderer.getHtmlElem(htmlIds.commentInputId);
    this.userName = PostViewRenderer.getHtmlElem(htmlIds.userNameId);
    this.postButton = PostViewRenderer.getHtmlElem(htmlIds.postButtonId);
    this.setupEventListeners();
  }

  createComment(){
    const comment = this.commentInput.value.trim();
    const userName = this.userName.value.trim();
    PostViewRenderer.addErrorMessageIntoCreatePost();
    const createPostContent = PostViewRenderer.getCreatePostContent();
    PostViewRenderer.initErrorMessage(createPostContent);
    let isValid = true;

    const userNameValidation = PostValidation.validateUserName(userName);
    if(!userNameValidation.isValid){
      PostViewRenderer.showErrorMessage(
        PostViewRenderer.getErrorNameElem(createPostContent),
        userNameValidation.errorMessage
      );
      isValid = false;
    }

    const commentValidation = PostValidation.validateCreateComment(comment);
    if(!commentValidation.isValid){
      PostViewRenderer.showErrorMessage(
        PostViewRenderer.getErrorCommentElem(createPostContent),
        commentValidation.errorMessage
      );
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

  setupEventListeners(){
    this.postButton.addEventListener("click", () => {
      this.createComment();
    });
  }
}