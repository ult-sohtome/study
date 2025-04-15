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

  static addErrorMessageElems(liElement) {
    const postContent = this.getPostContentElem(liElement);
    const errorName = this.createErrorNameMessage();
    const errorComment = this.createErrorCommentMessage();
    liElement.insertBefore(errorName, postContent);
    liElement.insertBefore(errorComment, postContent);
  }

  static initErrorMessage(liElement) {
    const errorNameElem = this.getErrorNameElem(liElement);
    const errorCommentElem = this.getErrorCommentElem(liElement);
    errorNameElem.textContent = "";
    errorCommentElem.textContent = "";
    errorNameElem.style.display = "none";
    errorCommentElem.style.display = "none";
  }

  static showErrorMessage(errorElem, errorMessage) {
    errorElem.textContent = errorMessage;
    errorElem.style.display = "block";
  }

  static getErrorNameElem(liElement) {
    return liElement.querySelector(".errorUpdateName");
  }

  static getErrorCommentElem(liElement) {
    return liElement.querySelector(".errorUpdateComment");
  }

  static getPostContentElem(liElement) {
    return liElement.querySelector(".postContent");
  }

  static getPostTextElem(liElement) {
    return liElement.querySelector(".postText");
  }

  static getEditUserName(liElement) {
    const postText = this.getPostTextElem(liElement);
    return postText.querySelector(".editUserName").value.trim();
  }

  static getEditComment(liElement) {
    const postText = this.getPostTextElem(liElement);
    return postText.querySelector(".editCommentText").value.trim();
  }

  static switchEditMode(postKey, liElement) {
    const postContent = this.getPostContentElem(liElement);
    const postText = this.getPostTextElem(liElement);
    const spanUsername = postText.querySelector(".userName");
    const currentUserName = spanUsername.textContent.replace("さん", "");
    const spanComment = postText.querySelector(".commentText");
    const currentComment = spanComment.textContent;
    const editUserName = this.createInputUserName(currentUserName);
    const editComment = this.createTextAreaComment(currentComment);

    postText.replaceChild(editUserName, spanUsername);
    postText.replaceChild(editComment, spanComment);

    const saveButton = this.createSaveButton(postKey);
    const cancelButton = this.createCancelButton();

    postContent.replaceChild(saveButton, postContent.querySelector(".editButton"));
    postContent.replaceChild(cancelButton, postContent.querySelector(".deleteButton"));
  }

  static switchTextMode(liElement) {
    const postContent = this.getPostContentElem(liElement);
    const postText = this.getPostTextElem(liElement);
    
    const editUserName = this.getEditUserName(liElement);
    const editComment = this.getEditComment(liElement);
    
    postContent.removeChild(liElement.querySelector(".saveButton"));
    postContent.removeChild(liElement.querySelector(".cancelButton"));

    const spanUsername = this.createSpanUserName(editUserName);
    const spanComment = this.createSpanComment(editComment);

    postText.replaceChild(spanUsername, postText.querySelector(".editUserName"));
    postText.replaceChild(spanComment, postText.querySelector(".editCommentText"));
  }

  static isEditButton(target) {
    return target.classList.contains("editButton");
  }

  static isSaveButton(target) {
    return target.classList.contains("saveButton");
  }

  static isCancelButton(target) {
    return target.classList.contains("cancelButton");
  }

  static getPostKeyFromTarget(target) {
    return target.dataset.key;
  }
  
  static findLiElementFromTarget(target) {
    return target.closest("li");
  }
}