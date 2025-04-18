import { PostViewRenderer } from "../view/PostViewRenderer.js";

export class PostSort {
  constructor(postRepository, postListController, postSearch){
    this.postRepository = postRepository;
    this.postListController = postListController;
    this.postSearch = postSearch;
    this.sortSelect = PostViewRenderer.getSortSeletectElem();
    this.setupEventListeners();
  }

  handleSortChange(){
    const selected = this.sortSelect.value;
    this.postListController.setSortOrder(selected);
    if(this.postSearch.isSearchMode){
      this.postSearch.searchPosts();
      return;
    }
    this.postListController.refreshPostList(this.postListController.currentPage);
  }

  setupEventListeners(){
    this.sortSelect.addEventListener("change", () => {
      this.handleSortChange();
    });
  }
}