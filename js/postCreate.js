export class PostCreate {
  constructor(htmlIds, postRepository, postListController){
    this.postRepository = postRepository;
    this.postListController = postListController;
    this.commentInput = document.getElementById(htmlIds.commentInputId);
    this.postButton = document.getElementById(htmlIds.postButtonId);
    this.setupEventListeners();
  }

  createComment(){
    const comment = this.commentInput.value.trim();
    if(!comment) return;
    this.postRepository.addComment(comment);
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