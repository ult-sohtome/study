export class PostDelete {
  constructor(postRepository, postListController){
    this.postRepository = postRepository;
    this.postListController = postListController;
    this.postList = this.postListController.postList;
    this.setupEventListeners();
  }

  deleteComment(postKey, liElement){
    this.postRepository.deleteComment(postKey);
    liElement.remove();
    if(!this.postRepository.hasComments()){
      this.postRepository.clearCounter();
    }
    this.postListController.allPosts = this.postRepository.getAllPosts();
    const totalPages = this.postListController.paginator.totalPages(this.postListController.allPosts);
    if(this.postListController.currentPage > totalPages) {
      this.postListController.currentPage = totalPages;
    }
    this.postListController.refreshPostList(this.postListController.currentPage);
  }

  setupEventListeners(){
    this.postList.addEventListener("click", e => {
      if(e.target.classList.contains("deleteButton")) {
        const postKey = e.target.dataset.key;
        const li = e.target.closest("li");

        if(postKey && li){
          this.deleteComment(postKey, li);
        }
      }
    });
  }
}