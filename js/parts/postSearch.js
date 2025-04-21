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
    this.keyword = "";
  }

  searchPosts(){
    this.keyword = this.searchInput.value.trim();
    const searchContent = PostViewRenderer.getSearchContent();
    PostViewRenderer.initErrorMessageIntoSearchElem();
    PostViewRenderer.addErrorMessageIntoSearch();
    const postSearchValidation = PostSearchValidation.validateSearchKeyword(this.keyword);
    if (!postSearchValidation.isValid) {
      PostViewRenderer.showErrorMessage(
        PostViewRenderer.getErrorCommentElem(searchContent),
        postSearchValidation.errorMessage
      );
      return;
    }
    const allPosts = this.postRepository.getAllPosts();
    const filteredPosts = allPosts.filter(post => {
      const userName = post.userName || "";
      return userName.includes(this.keyword) || post.comment.includes(this.keyword)
    });

    if(filteredPosts.length === 0) {
      PostViewRenderer.clearInnerHTML(this.postListController.postList);
      PostViewRenderer.addSearchResultMessage(this.postListController.postList);
      return;
    }

    this.isSearchMode = true;
    PostViewRenderer.clearInnerHTML(this.postListController.postList);
    this.postListController.getSortedPosts(filteredPosts);
    filteredPosts.forEach(post => {
      this.postListController.setDefaultPostValues(post);
      this.postListController.addPostToList(
        post.postKey,
        post.userName,
        post.comment,
        post.postNum,
        post.updatedAt,
        this.keyword
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
      PostViewRenderer.clearValueElem(this.searchInput);
      PostViewRenderer.initErrorMessageIntoSearchElem();
      PostViewRenderer.ShowPagination();
    });
  }
}