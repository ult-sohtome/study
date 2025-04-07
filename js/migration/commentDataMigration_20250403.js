export class CommentDataMigration_20250403 {
  constructor(postRepository){
    this.postRepository = postRepository;
    if(this.postRepository.hasComments()){
      const postKeys = this.postRepository.getAllPostKeys();
      postKeys.forEach(postKye => {
        this.migrateCommentData(postKye);
      });
    }
  }

  migrateCommentData(key){
    const localStorageData = localStorage.getItem(key);
    const migratedData = { commentText: localStorageData, createdAt: "" };
    localStorage.setItem(key, JSON.stringify(migratedData));
  }

}