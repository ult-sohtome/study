export class PostManager {
  constructor(postListId, commentInputId, postButtonId){
    this.postList = document.getElementById(postListId);
    this.commentInput = document.getElementById(commentInputId);
    this.postButton = document.getElementById(postButtonId);

    this.loadAllPosts();
    this.setupEventListeners();
  }

  getPostNumber(){
    let maxNum = 0;
    for(let key in localStorage){
      if(!isNaN(key)){
        maxNum = Math.max(maxNum, parseInt(key));
      }
    }
    return maxNum + 1;
  }

  saveComment(){
    const comment = this.commentInput.value.trim();
    if(!comment) return;
    const postNum = this.getPostNumber();
    localStorage.setItem(postNum, comment);
    const savedComment = localStorage.getItem(postNum);
    this.addPostToList(postNum, savedComment);
    this.commentInput.value = "";
  }

  deleteComment(postKey, liElement){
    localStorage.removeItem(postKey);
    liElement.remove();
  }

  addPostToList(key, comment){
    const li = document.createElement('li');
  
    const spanKey = document.createElement('span');
    spanKey.textContent = `${key}:`;
    
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
    const postKeys = [];
    for(let i = 0; i < localStorage.length; i++){
      const postKey = localStorage.key(i);
      if(!isNaN(postKey)){
        postKeys.push(parseInt(postKey));
      }
    }
    postKeys.sort((a,b) => a - b);
    postKeys.forEach( postKey => {
      const comment = localStorage.getItem(postKey);
      this.addPostToList(postKey, comment);
    });
  }

  setupEventListeners(){
    this.postButton.addEventListener("click", () => {
      this.saveComment();
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