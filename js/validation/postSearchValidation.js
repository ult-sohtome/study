export class PostSearchValidation {
  static validateSearchKeyword(keyword) {
    if (typeof keyword !== "string") {
      return {
        isValid: false,
        errorMessage: "不正な値が入力されました。"
      };
    }
    if(!keyword){
      return {
        isValid: false,
        errorMessage: "検索キーワードを入力してください。"
      }
    }
    return { isValid: true };
  }
}