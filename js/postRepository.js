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

  addComment(comment){
    const currentCount = this.getCurrentCount();
    const nextCount = currentCount + 1;
    const postKey = this.getPostKey(nextCount);
    localStorage.setItem(postKey, comment);
    localStorage.setItem(this.#config.counterKey, nextCount);
  }

  getComment(key){
    return localStorage.getItem(key);
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