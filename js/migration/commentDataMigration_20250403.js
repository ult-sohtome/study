export class CommentDataMigration_20250403 {
  constructor(postRepository){
    this.postRepository = postRepository;
    if(this.postRepository.hasComments()){
      const postKyes = this.postRepository.getAllPostKeys();
      postKyes.forEach(postKye => {
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