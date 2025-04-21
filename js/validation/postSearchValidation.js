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
}