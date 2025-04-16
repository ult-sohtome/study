export class CommentDataMigration_20250416 {
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
    const parsedData = JSON.parse(localStorageData);
    const migratedData = {
      commentText: parsedData.commentText,
      createdAt: parsedData.createdAt,
      userName: parsedData.userName,
      updatedAt: ""
    };
    localStorage.setItem(key, JSON.stringify(migratedData));
  }

}