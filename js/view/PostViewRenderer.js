export class PostViewRenderer {
  static createSpanUserName(userName, keyword = "") {
    const spanUsername = document.createElement("span");
    spanUsername.className = "userName";
    spanUsername.innerHTML = keyword ? `${this.highlightText(userName, keyword)}さん` : `${userName}さん`;
    return spanUsername;
  }

  static createSpanComment(comment, keyword = "") {
    const spanComment = document.createElement("span");
    spanComment.className = "commentText";
    spanComment.innerHTML = keyword ? this.highlightText(comment, keyword) : comment;
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

  static createLiElem() {
    return document.createElement('li');
  }

  static createDivElem() {
    return document.createElement('div');
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

  static addErrorMessageIntoCreatePost() {
    const createPostContent = this.getCreatePostContent();
    const setNameContent = document.querySelector(".setUsername");
    const setCommentContent = document.querySelector(".setComment");
    const errorName = this.createErrorNameMessage();
    const errorComment = this.createErrorCommentMessage();
    createPostContent.insertBefore(errorName, setNameContent);
    createPostContent.insertBefore(errorComment, setCommentContent);
  }

  static addErrorMessageIntoSearch() {
    const searchContent = this.getSearchContent();
    const searchErrorMessageElem = this.createErrorCommentMessage();
    searchContent.insertBefore(searchErrorMessageElem, searchContent.firstChild);
  }

  static addSearchResultMessage(postListElem) {
    const li = this.createLiElem();
    const postContent = this.createDivElem();
    postContent.className = 'postContent';
    postContent.textContent = "指定されたキーワードに該当する投稿は見つかりませんでした。";
    postContent.style.justifyContent = "center";
    li.appendChild(postContent);
    postListElem.insertBefore(li, postListElem.firstChild);
  }

  static initErrorMessage(liElement) {
    const errorNameElem = this.getErrorNameElem(liElement);
    const errorCommentElem = this.getErrorCommentElem(liElement);
    errorNameElem.textContent = "";
    errorCommentElem.textContent = "";
    errorNameElem.style.display = "none";
    errorCommentElem.style.display = "none";
  }

  static initErrorMessageIntoSearchElem() {
    const searchContent = this.getSearchContent();
    const searchErrorMessageElem = this.getErrorCommentElem(searchContent);
    if(searchErrorMessageElem) {
      searchErrorMessageElem.remove();
    }
  }

  static showErrorMessage(errorElem, errorMessage) {
    errorElem.textContent = errorMessage;
    errorElem.style.display = "block";
  }

  static getHtmlElem(getHtmlElemId) {
    return document.getElementById(getHtmlElemId);
  }

  static getSortSeletectElem() {
    return document.getElementById("sortSelect");
  }

  static getSearchContent() {
    return document.querySelector(".search");
  }

  static getCreatePostContent() {
    return document.querySelector(".createPost");
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

  static getPostButton(){
    return document.getElementById("postButton");
  }

  static getPostButtonWrapper(){
    return document.getElementById("postButtonWrapper");
  }

  static getDeleteButtons(){
    return document.querySelectorAll(".deleteButton");
  }

  static getEditButtons(){
    return document.querySelectorAll(".editButton");
  }

  static getPaginationContainer(){
    return document.getElementById("paginationContainer")
  }

  static getSearchButton(){
    return document.getElementById("searchButton");
  }

  static getResetButton(){
    return document.getElementById("resetButton");
  }

  static HiddenPagination() {
    const paiginationContainer = this.getPaginationContainer();
    paiginationContainer.style.display = "none";
  }

  static ShowPagination() {
    const paiginationContainer = this.getPaginationContainer();
    paiginationContainer.style.display = "";
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

  static switchTextMode(liElement, keyword = "") {
    const postContent = this.getPostContentElem(liElement);
    const postText = this.getPostTextElem(liElement);
    const editUserName = this.getEditUserName(liElement);
    const editComment = this.getEditComment(liElement);
    const postKey = this.getPostKeyFromTarget(postContent.querySelector(".saveButton"));
    const spanUsername = this.createSpanUserName(editUserName, keyword);
    const spanComment = this.createSpanComment(editComment, keyword);
    const editButton = this.createEditButton(postKey);
    const deleteButton = this.createDeleteButton(postKey);

    postContent.removeChild(liElement.querySelector(".saveButton"));
    postContent.removeChild(liElement.querySelector(".cancelButton"));

    postContent.appendChild(editButton);
    postContent.appendChild(deleteButton);

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

  static isDeleteButton(target) {
    return target.classList.contains("deleteButton");
  }

  static isDisabledPostButton(){
    const postButton = this.getPostButton();
    if(postButton.disabled){
      return true;
    }
    return false;
  }

  static getPostKeyFromTarget(target) {
    return target.dataset.key;
  }
  
  static findLiElementFromTarget(target) {
    return target.closest("li");
  }

  static switchDisabledPostButton(){
    const postButton = this.getPostButton();
    const postButtonWrapper = this.getPostButtonWrapper();
    postButton.disabled = true;
    postButtonWrapper.classList.add("disabled-button");
  }

  static switchEnabledPostButton(){
    const postButton = this.getPostButton();
    const postButtonWrapper = this.getPostButtonWrapper();
    postButton.disabled = false;
    postButtonWrapper.classList.remove("disabled-button");
  }

  static switchDisabledSearchButton() {
    const searchButton = this.getSearchButton();
    searchButton.disabled = true;
    searchButton.classList.add("disabled-button");
  }

  static switchEnabledSearchButton() {
    const searchButton = this.getSearchButton();
    searchButton.disabled = false;
    searchButton.classList.remove("disabled-button");
  }

  static switchDisabledResetButton() {
    const resetButton = this.getResetButton();
    resetButton.disabled = true;
    resetButton.classList.add("disabled-button");
  }

  static switchEnabledResetButton() {
    const resetButton = this.getResetButton();
    resetButton.disabled = false;
    resetButton.classList.remove("disabled-button");
  }

  static switchDisabledButtons(postKey) {
    const deleteButtons = this.getDeleteButtons();
    const editButtons = this.getEditButtons();
    deleteButtons.forEach(button => {
      if(button.dataset.key !== postKey){
        button.disabled = true;
        button.classList.add("disabled-button");
      }
    });
    editButtons.forEach(button => {
      if(button.dataset.key !== postKey){
        button.disabled = true;
        button.classList.add("disabled-button");
      }
    });
    this.switchDisabledPostButton();
    this.switchDisabledSearchButton();
    this.switchDisabledResetButton();
  }

  static switchEnabledButtons() {
    this.switchEnabledPostButton();
    this.switchEnabledSearchButton();
    this.switchEnabledResetButton();
  }

  static switchEnabledAllButtons() {
    const deleteButtons = this.getDeleteButtons();
    const editButtons = this.getEditButtons();
    deleteButtons.forEach(button => {
      button.disabled = false;
      button.classList.remove("disabled-button");
    });
    editButtons.forEach(button => {
      button.disabled = false;
      button.classList.remove("disabled-button");
    });
    this.switchEnabledButtons();
  }

  static highlightText(text, keyword) {
    const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedKeyword})`, "gi");
    return text.replace(regex, `<mark>$1</mark>`);
  }

  static clearValueElem(elem) {
    elem.value = "";
  }

  static clearInnerHTML(elem) {
    elem.innerHTML = "";
  }
}