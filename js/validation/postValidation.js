export class PostValidation {
  static validateUserName(userName) {
    if (typeof userName !== "string") {
      return {
        isValid: false,
        errorMessage: "不正な値が入力されました。"
      };
    }
    if(Array.from(userName).length > 20){
      return {
        isValid: false,
        errorMessage: "20文字以内でニックネームを入力してください。"
      }
    }
    return { isValid: true };
  }

  static validateCreateComment(comment) {
    if (typeof comment !== "string") {
      return {
        isValid: false,
        errorMessage: "不正な値が入力されました。"
      };
    }
    if (!comment) {
      return {
        isValid: false,
        errorMessage: "コメントを入力してください。"
      };
    }
    if (Array.from(comment).length > 255) {
      return {
        isValid: false,
        errorMessage: "255文字以内でコメントを入力してください。"
      };
    }
    return { isValid: true };
  }
}