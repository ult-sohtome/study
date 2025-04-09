export class PostCreateValidation {
  validateUserName(userName) {
    if(Array.from(userName).length > 20){
      return {
        isValid: false,
        errorMessage: "20文字以内でニックネームを入力してください。"
      }
    }
    return { isValid: true };
  }

  validateCreateComment(comment) {
    if (!comment) {
      return {
        isValid: false,
        errorMessage: "コメントを入力してください。"
      };
    } else if (Array.from(comment).length > 255) {
      return {
        isValid: false,
        errorMessage: "255文字以内でコメントを入力してください。"
      };
    }
    return { isValid: true };
  }
}