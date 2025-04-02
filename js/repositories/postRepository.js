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

  getFormattedDataTime(){
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2,"0");
    const day = String(now.getDate()).padStart(2, "0");
    const hour = String(now.getHours()).padStart(2, "0");
    const minute = String(now.getMinutes()).padStart(2, "0");
    const second = String(now.getSeconds()).padStart(2, "0");
    return `${year}/${month}/${day} ${hour}:${minute}:${second}`;
  }

  addComment(comment){
    const currentCount = this.getCurrentCount();
    const nextCount = currentCount + 1;
    const postKey = this.getPostKey(nextCount);
    const commentData = {
      commentText: comment,
      time: this.getFormattedDataTime()
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
    return commentData.time;
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
        const time = this.getCommentTime(postKey);
        posts.push({ postKey, comment, postNum, time });
      }
    }
    posts.sort((a,b) => a.postNum - b.postNum);
    return posts;
  }
}