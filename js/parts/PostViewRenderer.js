export class PostViewRenderer {
  static createSpanUserName(userName) {
    const spanUsername = document.createElement("span");
    spanUsername.className = "userName";
    spanUsername.textContent = `${userName}さん`;
    return spanUsername;
  }

  static createSpanComment(comment){
    const spanComment = document.createElement("span");
    spanComment.className = "commentText";
    spanComment.textContent = comment;
    return spanComment;
  }

  static createSpanTime(time) {
    const spanTime = document.createElement("span");
    spanTime.className = "time";
    spanTime.textContent = `[${time}]`;
    return spanTime;
  }

  static createSpanKey(postNum) {
    const spanKey = document.createElement("span");
    spanKey.className = "postNum";
    spanKey.textContent = `${postNum}:`;
    return spanKey;
  }

  static createInputUserName(currentUserName) {
    const InputUserName = document.createElement("input");
    InputUserName.value = currentUserName;
    InputUserName.className = "editUserName";
    return InputUserName;
  }

  static createTextAreaComment(currentComment) {
    const textAreaComment = document.createElement("textarea");
    textAreaComment.value = currentComment;
    textAreaComment.className = "editCommentText";
    return textAreaComment;
  }

  static createEditButton(postKey) {
    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.textContent = "編集";
    editButton.className = "editButton";
    editButton.setAttribute("data-key", postKey);
    return editButton;
  }

  static createDeleteButton(postKey) {
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "削除";
    deleteButton.className = "deleteButton";
    deleteButton.setAttribute("data-key", postKey);
    return deleteButton;
  }

  static createSaveButton(postKey) {
    const saveButton = document.createElement("button");
    saveButton.textContent = "上書き保存";
    saveButton.className = "saveButton";
    saveButton.setAttribute("data-key", postKey);
    return saveButton;
  }

  static createCancelButton() {
    const cancelButton = document.createElement("button");
    cancelButton.textContent = "編集キャンセル";
    cancelButton.className = "cancelButton";
    return cancelButton;
  }

  static createErrorNameMessage() {
    const errorName = document.createElement("p");
    errorName.classList.add("error", "errorUpdateName");
    errorName.style.display = "none";
    return errorName;
  }

  static createErrorCommentMessage() {
    const errorComment = document.createElement("p");
    errorComment.classList.add("error", "errorUpdateComment");
    errorComment.style.display = "none";
    return errorComment;
  }
}