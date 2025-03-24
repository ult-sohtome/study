export class PostManager {
  constructor(postListId, commentInputId, postButtonId){
    this.postList = document.getElementById(postListId);
    this.commentInput = document.getElementById(commentInputId);
    this.postButton = document.getElementById(postButtonId);

    this.loadAllPosts();
    this.setupEventListeners();
  }

  getPostNumber(){
    const counterKey = "comment_counter";
    const counterNum = parseInt(localStorage.getItem(counterKey) || "0", 10);
    const currentNum = counterNum + 1;
    localStorage.setItem(counterKey, currentNum);
    return currentNum;
  }

  createComment(){
    const comment = this.commentInput.value.trim();
    if(!comment) return;
    const postNum = this.getPostNumber();
    const postKey = `comment_num_${postNum}`;
    localStorage.setItem(postKey, comment);
    const createdComment = localStorage.getItem(postKey);
    this.addPostToList(postKey, createdComment);
    this.commentInput.value = "";
  }

  deleteComment(postKey, liElement){
    localStorage.removeItem(postKey);
    liElement.remove();

    const hasOtherComments = Object.keys(localStorage).some(key => key.startsWith("comment_num_"));
    if(!hasOtherComments){
      localStorage.removeItem("comment_counter");
    }
  }

  addPostToList(key, comment){
    const postNum = parseInt(key.replace("comment_num_", ""), 10);

    const li = document.createElement('li');
  
    const spanKey = document.createElement('span');
    spanKey.textContent = `${postNum}:`;
    
    const spanComment = document.createElement('span');
    spanComment.textContent = comment;
  
    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.textContent = '削除';
    deleteButton.className = 'deleteButton';
    deleteButton.setAttribute("data-key", key);
  
    li.appendChild(spanKey);
    li.appendChild(spanComment);
    li.appendChild(deleteButton);
  
    this.postList.insertBefore(li, this.postList.firstChild);
  }

  loadAllPosts(){
    const posts = [];
    for(let i = 0; i <= localStorage.length; i++){
      const postKey = localStorage.key(i);
      if(postKey && postKey.startsWith("comment_num_")){
        const comment = localStorage.getItem(postKey);
        posts.push({ postKey, comment });
      }
    }
    posts.sort((a,b) => {
      const numA = parseInt(a.postKey.replace("comment_num_", ""), 10);
      const numB = parseInt(b.postKey.replace("comment_num_", ""), 10);
      return numA - numB;
    });
    posts.forEach( post => {
      this.addPostToList(post.postKey, post.comment);
    });
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