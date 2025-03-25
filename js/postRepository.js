export class PostRepository {
  #config;

  constructor(){
    this.#config = Object.freeze({
      counterKey: "comment_counter",
      commentPrefix: "comment_num_"
    });
  }
  
  addComment(comment){
    const count = parseInt(localStorage.getItem(this.#config.counterKey) || "0", 10) + 1;
    const postKey = this.#config.commentPrefix + count;
    localStorage.setItem(postKey, comment);
    localStorage.setItem(this.#config.counterKey, count);
    return postKey;
  }

  getComment(key){
    return localStorage.getItem(key);
  }

  deleteComment(key){
    localStorage.removeItem(key);
  }

  clearCounterIfNoComments(){
    const hasComments = Object.keys(localStorage).some(key => key.startsWith(this.#config.commentPrefix));
    if(!hasComments){
      localStorage.removeItem(this.#config.counterKey);
    }
  }

  getPostNumberFromKey(key){
    return parseInt(key.replace(this.#config.commentPrefix, ""), 10);
  }

  getAllPosts(){
    const posts = [];
    for(let i = 0; i < localStorage.length; i++){
      const postKey = localStorage.key(i);
      if(postKey && postKey.startsWith(this.#config.commentPrefix)){
        const comment = this.getComment(postKey);
        const postNum = this.getPostNumberFromKey(postKey);
        posts.push({ postKey, comment, postNum });
      }
    }
    posts.sort((a,b) => a.postNum - b.postNum);
    return posts;
  }
}