export class PostManager {
  constructor(postListId, commentInputId, postButtonId, postRepository){
    this.postList = document.getElementById(postListId);
    this.commentInput = document.getElementById(commentInputId);
    this.postButton = document.getElementById(postButtonId);
    this.postRepository = postRepository;

    this.loadAllPosts();
    this.setupEventListeners();
  }

  createComment(){
    const comment = this.commentInput.value.trim();
    if(!comment) return;
    this.postRepository.addComment(comment);
    const currentCount = this.postRepository.getCurrentCount();
    const postKey = this.postRepository.getPostKey(currentCount);
    const createdComment = this.postRepository.getComment(postKey);
    const postNum = this.postRepository.getPostNumberFromKey(postKey);
    this.addPostToList(postKey, createdComment, postNum);
    this.commentInput.value = "";
  }

  deleteComment(postKey, liElement){
    this.postRepository.deleteComment(postKey);
    liElement.remove();
    if(!this.postRepository.hasComments()){
      this.postRepository.clearCounter();
    }
  }

  addPostToList(key, comment, postNum){
    const li = document.createElement('li');
    const span = document.createElement('span');
  
    const spanKey = document.createElement('span');
    spanKey.textContent = `${postNum}:`;
    
    const spanComment = document.createElement('span');
    spanComment.textContent = comment;
  
    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.textContent = '削除';
    deleteButton.className = 'deleteButton';
    deleteButton.setAttribute("data-key", key);
  
    span.appendChild(spanKey);
    span.appendChild(spanComment);
    li.appendChild(span);
    li.appendChild(deleteButton);
  
    this.postList.insertBefore(li, this.postList.firstChild);
  }

  loadAllPosts(){
    const posts = this.postRepository.getAllPosts();
    if(posts){
      posts.forEach( post => {
        this.addPostToList(post.postKey, post.comment, post.postNum);
      });
    }
  }

  setupEventListeners(){
    this.postButton.addEventListener("click", () => {
      this.createComment();
    });

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