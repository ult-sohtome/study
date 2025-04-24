import { PostValidation } from "../validation/postValidation.js";
import { PostViewRenderer } from "../view/PostViewRenderer.js";

export class PostEdit {
  constructor(postRepository, postListController, postSearch){
    this.postRepository = postRepository;
    this.postListController = postListController;
    this.postList = this.postListController.postList;
    this.postSearch = postSearch;
    this.setupEventListeners();
  }

  editPost(postKey, liElement){
    PostViewRenderer.addErrorMessageElems(liElement);
    PostViewRenderer.switchEditMode(postKey, liElement);
  }

  updatePost(postKey, liElement){
    PostViewRenderer.initErrorMessage(liElement);
    let isValid = true;

    const editUserName = PostViewRenderer.getEditUserName(liElement);
    const editComment = PostViewRenderer.getEditComment(liElement);
    const userNameValidation = PostValidation.validateUserName(editUserName);
    const commentValidation = PostValidation.validateCreateComment(editComment);

    if(!userNameValidation.isValid){
      PostViewRenderer.showErrorMessage(PostViewRenderer.getErrorNameElem(liElement), userNameValidation.errorMessage);
      isValid = false;
    }

    if(!commentValidation.isValid){
      PostViewRenderer.showErrorMessage(PostViewRenderer.getErrorCommentElem(liElement), commentValidation.errorMessage);
      isValid = false;
    }

    if(!isValid) return;

    this.postRepository.updateComment(postKey, editUserName, editComment);

    if(this.postSearch.isSearchMode){
      PostViewRenderer.switchTextMode(liElement, this.postSearch.keyword);
      PostViewRenderer.switchEnabledAllButtons();
      return;
    }
    PostViewRenderer.switchTextMode(liElement);
    this.postListController.refreshPostList(this.postListController.currentPage);
  }

  setupEventListeners(){
    this.postList.addEventListener("click", e => {
      const target = e.target;
      if(PostViewRenderer.isEditButton(target)) {
        const postKey = PostViewRenderer.getPostKeyFromTarget(target);
        const li = PostViewRenderer.findLiElementFromTarget(target);

        if(postKey && li){
          this.editPost(postKey, li);
          PostViewRenderer.switchDisabledButtons(postKey);
        }
      }
      if(PostViewRenderer.isSaveButton(target)) {
        const postKey = PostViewRenderer.getPostKeyFromTarget(target);
        const li = PostViewRenderer.findLiElementFromTarget(target);

        if(postKey && li){
          this.updatePost(postKey, li);
        }
      }
      if(PostViewRenderer.isCancelButton(target)) {
        if(this.postSearch.isSearchMode){
          this.postSearch.refreshSearchedPosts(this.postSearch.currentSearchPostsPage);
          PostViewRenderer.switchEnabledButtons();
          return;
        }
        this.postListController.refreshPostList(this.postListController.currentPage);
      }
    });
  }
}