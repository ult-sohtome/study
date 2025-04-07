export class PostCreate {
  constructor(htmlIds, postRepository, postListController, userNameRepository){
    this.postRepository = postRepository;
    this.postListController = postListController;
    this.userNameRepository = userNameRepository;
    this.commentInput = document.getElementById(htmlIds.commentInputId);
    this.userName = document.getElementById(htmlIds.userNameId);
    this.postButton = document.getElementById(htmlIds.postButtonId);
    this.setupEventListeners();
  }

  createComment(){
    const comment = this.commentInput.value.trim();
    if(!comment) return;
    const userName = this.userName.value.trim();
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