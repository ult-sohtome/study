export class PostSort {
  constructor(postRepository, postListController){
    this.postRepository = postRepository;
    this.postListController = postListController;
    this.sortSelect = document.getElementById("sortSelect");
    this.setupEventListeners();
  }

  handleSortChange(){
    const selected = this.sortSelect.value;
    this.postListController.setSortOrder(selected);
    this.postListController.refreshPostList(this.postListController.currentPage);
  }

  setupEventListeners(){
    this.sortSelect.addEventListener("change", () => {
      this.handleSortChange();
    });
  }
}