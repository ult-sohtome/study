export class PostCreate {
  constructor(htmlIds, postRepository, postListController, userNameRepository){
    this.postRepository = postRepository;
    this.postListController = postListController;
    this.userNameRepository = userNameRepository;
    this.commentInput = document.getElementById(htmlIds.commentInputId);
    this.userName = document.getElementById(htmlIds.userNameId);
    this.postButton = document.getElementById(htmlIds.postButtonId);
    this.errorNameElem = document.getElementById(htmlIds.errorNameId);
    this.errorCommentElem = document.getElementById(htmlIds.errorCommentId);
    this.setupEventListeners();
  }

  createComment(){
    const comment = this.commentInput.value.trim();
    const userName = this.userName.value.trim();
    this.errorNameElem.textContent = "";
    this.errorCommentElem.textContent = "";
    let hasError = false;

    if(Array.from(userName).length > 20){
      this.errorNameElem.textContent = "20文字以内でニックネームを入力してください。";
      this.errorNameElem.style.display = "inline-block";
      hasError = true;
    } else {
      this.errorNameElem.style.display = "none";
    }

    if(!comment){
      this.errorCommentElem.textContent = "コメントを入力してください。";
      this.errorCommentElem.style.display = "inline-block";
      hasError = true;
    } else if(Array.from(comment).length > 255){
      this.errorCommentElem.textContent = "255文字以内でコメントを入力してください。";
      this.errorCommentElem.style.display = "inline-block";
      hasError = true;
    } else {
      this.errorCommentElem.style.display = "none";
    }

    if(hasError) return;

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