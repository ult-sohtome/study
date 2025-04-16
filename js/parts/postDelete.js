import { PostViewRenderer } from "../view/PostViewRenderer.js";

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
      const target = e.target;
      if(PostViewRenderer.isDeleteButton(target)) {
        const postKey = PostViewRenderer.getPostKeyFromTarget(target);
        const li = PostViewRenderer.findLiElementFromTarget(target);

        if(postKey && li){
          this.deleteComment(postKey, li);
        }
      }
    });
  }
}