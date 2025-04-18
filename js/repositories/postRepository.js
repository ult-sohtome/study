export class PostRepository {
  #config;

  constructor(){
    this.#config = Object.freeze({
      counterKey: "comment_counter",
      commentPrefix: "comment_num_"
    });
  }
  
  getCurrentCount(){
    return parseInt(localStorage.getItem(this.#config.counterKey) || "0", 10);
  }

  getPostKey(count){
    return this.#config.commentPrefix + count;
  }

  addComment(comment, userName){
    const currentCount = this.getCurrentCount();
    const nextCount = currentCount + 1;
    const postKey = this.getPostKey(nextCount);
    const commentData = {
      userName,
      commentText: comment,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(postKey, JSON.stringify(commentData));
    localStorage.setItem(this.#config.counterKey, nextCount);
  }

  getComment(key){
    const commentData = JSON.parse(localStorage.getItem(key));
    return commentData.commentText;
  }

  getCommentTime(key){
    const commentData = JSON.parse(localStorage.getItem(key));
    if(!commentData.createdAt){
      return "";
    }
    return new Date(commentData.createdAt).toLocaleString("ja-JP");
  }

  getCommentUpdatedTime(key){
    const commentData = JSON.parse(localStorage.getItem(key));
    if(!commentData.updatedAt){
      return "";
    }
    return new Date(commentData.updatedAt).toLocaleString("ja-JP");
  }

  getUserName(key){
    const commentData = JSON.parse(localStorage.getItem(key));
    return commentData.userName;
  }

  deleteComment(key){
    localStorage.removeItem(key);
  }

  clearCounter(){
    localStorage.removeItem(this.#config.counterKey);
  }

  hasComments(){
    return Object.keys(localStorage).some(key => key.startsWith(this.#config.commentPrefix));
  }

  getPostNumberFromKey(key){
    return parseInt(key.replace(this.#config.commentPrefix, ""), 10);
  }

  getAllPostKeys(){
    const postKeys = [];
    for(let i = 0; i < localStorage.length; i++){
      const postKey = localStorage.key(i);
      if(postKey && postKey.startsWith(this.#config.commentPrefix)){
        postKeys.push(postKey);
      }
    }
    return postKeys;
  }

  getAllPosts(){
    const posts = [];
    for(let i = 0; i < localStorage.length; i++){
      const postKey = localStorage.key(i);
      if(postKey && postKey.startsWith(this.#config.commentPrefix)){
        const comment = this.getComment(postKey);
        const postNum = this.getPostNumberFromKey(postKey);
        const userName = this.getUserName(postKey);
        const updatedAt = this.getCommentUpdatedTime(postKey);
        posts.push({ postKey, comment, postNum, userName, updatedAt });
      }
    }
    return posts;
  }

  updateComment(postKey, userName, comment){
    const commentData = {
      userName,
      commentText: comment,
      createdAt: JSON.parse(localStorage.getItem(postKey)).createdAt,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(postKey, JSON.stringify(commentData));
  }
}