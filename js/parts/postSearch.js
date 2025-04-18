import { PostSearchValidation } from "../validation/postSearchValidation.js";
import { PostViewRenderer } from "../view/PostViewRenderer.js";

export class PostSearch {
  constructor(htmlIds, postRepository, postListController){
    this.postRepository = postRepository;
    this.postListController = postListController;
    this.searchInput = PostViewRenderer.getHtmlElem(htmlIds.searchInputId);
    this.searchButton = PostViewRenderer.getHtmlElem(htmlIds.searchButtonId);
    this.resetButton = PostViewRenderer.getHtmlElem(htmlIds.resetButtonId);
    this.setupEventListeners();
    this.isSearchMode = false;
  }

  searchPosts(){
    const keyword = this.searchInput.value.trim();
    const searchContent = PostViewRenderer.getSearchContent();
    PostViewRenderer.initErrorMessageIntoSearchElem();
    PostViewRenderer.addErrorMessageIntoSearch();
    let isValid = true;
    const postSearchValidation = PostSearchValidation.validateSearchKeyword(keyword);
    if (!postSearchValidation.isValid) {
      PostViewRenderer.showErrorMessage(
        PostViewRenderer.getErrorCommentElem(searchContent),
        postSearchValidation.errorMessage
      );
      isValid = false;
    }
    const allPosts = this.postRepository.getAllPosts();
    const filteredPosts = allPosts.filter(post => {
      const userName = post.userName || "";
      return userName.includes(keyword) || post.comment.includes(keyword)
    });
    const notSearchPostsValidation = PostSearchValidation.validateNotSearchPosts(filteredPosts);
    if(!notSearchPostsValidation.isValid) {
      PostViewRenderer.showErrorMessage(
        PostViewRenderer.getErrorCommentElem(searchContent),
        notSearchPostsValidation.errorMessage
      );
      isValid = false;
    }
    if(!isValid) return;

    this.isSearchMode = true;
    this.postListController.postList.innerHTML = "";
    this.postListController.getSortedPosts(filteredPosts);
    filteredPosts.forEach(post => {
      if(!post.updatedAt) {
        post.updatedAt = "----/--/-- --:--:--";
      }
      if(!post.userName) {
        post.userName = "名無し";
      }
      this.postListController.addPostToList(
        post.postKey,
        post.userName,
        post.comment,
        post.postNum,
        post.updatedAt,
        keyword
      );
    });
    PostViewRenderer.HiddenPagination();
  }

  setupEventListeners(){
    this.searchButton.addEventListener("click", () => {
      this.searchPosts();
    });
    this.resetButton.addEventListener("click", () => {
      this.isSearchMode = false;
      this.postListController.refreshPostList(this.postListController.currentPage);
      this.searchInput.value = "";
      PostViewRenderer.initErrorMessageIntoSearchElem();
      PostViewRenderer.ShowPagination();
    });
  }
}