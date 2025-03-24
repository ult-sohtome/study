export class PostRepository {
  constructor(counterKey, commentPrefix){
    this.counterKey = counterKey;
    this.commentPrefix = commentPrefix;
  }
  
  addComment(comment){
    const count = parseInt(localStorage.getItem(this.counterKey) || "0", 10) + 1;
    const postKey = this.commentPrefix + count;
    localStorage.setItem(postKey, comment);
    localStorage.setItem(this.counterKey, count);
    return postKey;
  }

  getComment(key){
    return localStorage.getItem(key);
  }

  deleteComment(key){
    localStorage.removeItem(key);
  }

  clearCounterIfNoComments(){
    const hasComments = Object.keys(localStorage).some(key => key.startsWith(this.commentPrefix));
    if(!hasComments){
      localStorage.removeItem(this.counterKey);
    }
  }

  getPostNumberFromKey(key){
    return parseInt(key.replace(this.commentPrefix, ""), 10);
  }

  getAllPosts(){
    const posts = [];
    for(let i = 0; i < localStorage.length; i++){
      const postKey = localStorage.key(i);
      if(postKey && postKey.startsWith(this.commentPrefix)){
        const comment = this.getComment(postKey);
        const postNum = this.getPostNumberFromKey(postKey);
        posts.push({ postKey, comment, postNum });
      }
    }
    posts.sort((a,b) => a.postNum - b.postNum);
    return posts;
  }
}