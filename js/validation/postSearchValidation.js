export class PostSearchValidation {
  static validateSearchKeyword(keyword) {
    if(!keyword){
      return {
        isValid: false,
        errorMessage: "検索キーワードを入力してください。"
      }
    }
    return { isValid: true };
  }

  static validateNotSearchPosts(filteredPosts) {
    if (filteredPosts.length === 0) {
      return {
        isValid: false,
        errorMessage: "指定されたキーワードに該当する投稿は見つかりませんでした。"
      };
    }
    return { isValid: true };
  }
}