export class PostEdit {
  constructor(postListController){
    this.postListController = postListController;
    this.postList = this.postListController.postList;
    this.setupEventListeners();
  }

  setupEventListeners(){
    this.postList.addEventListener("click", e => {
      if(e.target.classList.contains("editButton")) {
        const postKey = e.target.dataset.key;
        const li = e.target.closest("li");

        if(postKey && li){
          this.postListController.editPost(postKey, li);
        }
      }
    });

    this.postList.addEventListener("click", e => {
      if(e.target.classList.contains("saveButton")) {
        const postKey = e.target.dataset.key;
        const li = e.target.closest("li");

        if(postKey && li){
          this.postListController.updatePost(postKey, li);
        }
      }
    });

    this.postList.addEventListener("click", e => {
      if(e.target.classList.contains("cancelButton")) {
        this.postListController.refreshPostList(this.postListController.currentPage);
      }
    });
  }
}