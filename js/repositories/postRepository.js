export class PostRepository {
  #config;

  constructor(){
    this.#config = Object.freeze({
      counterKey: "comment_counter",
      commentPrefix: "comment_num_",
      defaulData: new Date("2025-04-02T17:00:00+09:00")
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
    const commentData = {
      commentText: comment,
      createdAt: new Date().toISOString()
    };
    localStorage.setItem(postKey, JSON.stringify(commentData));
    localStorage.setItem(this.#config.counterKey, nextCount);
  }

  getComment(key){
    const localStorageData = localStorage.getItem(key);
    try {
      const commentData = JSON.parse(localStorageData);
      if (typeof commentData === "string") {
        return commentData;
      } else if (commentData && typeof commentData === "object") {
        return commentData.commentText;
      }
      return "";
    } catch {
      return localStorageData;
    }
  }

  getCommentTime(key){
    const localStorageData = localStorage.getItem(key);
    const defaulData = this.#config.defaulData;
    try {
      const commentData = JSON.parse(localStorageData);
      if(commentData && commentData.createdAt) {
        return new Date(commentData.createdAt).toLocaleString("ja-JP");
      } else {
        return defaulData.toLocaleString("ja-JP");
      }
    } catch {
      return defaulData.toLocaleString("ja-JP");
    }
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
        const createdAt = this.getCommentTime(postKey);
        posts.push({ postKey, comment, postNum, time: createdAt });
      }
    }
    posts.sort((a,b) => a.postNum - b.postNum);
    return posts;
  }
}