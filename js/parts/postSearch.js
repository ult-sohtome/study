import { PostSearchValidation } from "../validation/postSearchValidation.js";
import { PostViewRenderer } from "../view/PostViewRenderer.js";
import { UpdatedAtDisplay } from "./updatedAtDisplay.js";

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
    this.currentSearchPostsPage = 1;
  }

  searchPosts(){
    this.keyword = this.searchInput.value.trim();
    const searchContent = PostViewRenderer.getSearchContent();
    PostViewRenderer.initErrorMessageIntoSearchElem();
    PostViewRenderer.addErrorMessageIntoSearch();
    PostViewRenderer.ShowPagination();
    const postSearchValidation = PostSearchValidation.validateSearchKeyword(this.keyword);
    if (!postSearchValidation.isValid) {
      PostViewRenderer.showErrorMessage(
        PostViewRenderer.getErrorCommentElem(searchContent),
        postSearchValidation.errorMessage
      );
      return;
    }
    const filteredPosts = this.getFilteredPostsByKeyword(this.keyword);
    if(filteredPosts.length === 0) {
      PostViewRenderer.clearInnerHTML(this.postListController.postList);
      PostViewRenderer.addSearchResultMessage(this.postListController.postList);
      PostViewRenderer.HiddenPagination();
      return;
    }
    this.isSearchMode = true;
    this.postListController.paginator.updateRefreshFunction(page => this.refreshSearchedPosts(page));
    this.refreshSearchedPosts(this.currentSearchPostsPage);
  }

  getFilteredPostsByKeyword(keyword) {
    const allPosts = this.postRepository.getAllPosts();
    return allPosts.filter(post => {
      const userName = post.userName || "";
      return userName.includes(keyword) || post.comment.includes(keyword);
    });
  }

  refreshSearchedPosts(page) {
    this.currentSearchPostsPage = page;
    const filteredPosts = this.getFilteredPostsByKeyword(this.keyword);
    const allFilterdPosts = this.postListController.getSortedPosts(filteredPosts);
    PostViewRenderer.clearInnerHTML(this.postListController.postList);
    const paginatedPosts = this.postListController.paginator.getCurrentPagePosts(page, allFilterdPosts);
    paginatedPosts.forEach(post => {
      this.postListController.setDefaultPostValues(post);
      this.postListController.addPostToList(
        post.postKey,
        post.userName,
        post.comment,
        post.postNum,
        post.createdAt,
        this.keyword
      );
    });
    this.postListController.paginator.updatePostPage(allFilterdPosts, page);
    UpdatedAtDisplay.setupEventListener(this.postRepository);
  }

  setupEventListeners(){
    this.searchButton.addEventListener("click", () => {
      this.searchPosts();
    });
    this.resetButton.addEventListener("click", () => {
      this.isSearchMode = false;
      PostViewRenderer.ShowPagination();
      PostViewRenderer.clearValueElem(this.searchInput);
      PostViewRenderer.initErrorMessageIntoSearchElem();
      this.postListController.paginator.updateRefreshFunction(page => this.postListController.refreshPostList(page));
      this.postListController.refreshPostList(this.postListController.currentPage);
    });
  }
}