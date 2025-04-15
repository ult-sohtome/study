import { Paginator } from "./common/paginator.js";
import { PostValidation } from "./validation/postValidation.js";

export class PostListController{
  constructor(htmlIds, postRepository){
    this.postList = document.getElementById(htmlIds.postListId);
    this.postRepository = postRepository;

    const prevButton = document.getElementById(htmlIds.prevButtonId);
    const pagination = document.getElementById(htmlIds.paginateId);
    const nextButton = document.getElementById(htmlIds.nextButtonId);

    this.paginator = new Paginator(
      prevButton,
      pagination,
      nextButton,
      page => this.refreshPostList(page)
    );
    this.allPosts = this.postRepository.getAllPosts();
    this.currentPage = this.paginator.totalPages(this.allPosts);
    this.refreshPostList(this.currentPage);
  }

  createSpanUserName(userName){
    const spanUsername = document.createElement("span");
    spanUsername.className = "userName";
    spanUsername.textContent = `${userName}さん`;
    return spanUsername;
  }

  createSpanComment(comment){
    const spanComment = document.createElement("span");
    spanComment.className = "commentText";
    spanComment.textContent = comment;
    return spanComment;
  }

  addPostToList(key, userName, comment, postNum, time){
    const li = document.createElement('li');
    const postContent = document.createElement('div');
    postContent.className = 'postContent';
    const postText = document.createElement('div');
    postText.className = 'postText';

    const spanTime = document.createElement('span');
    spanTime.className = 'time';
    spanTime.textContent = `[${time}]`;

    const spanUsername = this.createSpanUserName(userName);
  
    const spanKey = document.createElement('span');
    spanKey.className = 'postNum';
    spanKey.textContent = `${postNum}:`;
    
    const spanComment = this.createSpanComment(comment);

    const editButton = document.createElement('button');
    editButton.type = 'button';
    editButton.textContent = '編集';
    editButton.className = 'editButton';
    editButton.setAttribute("data-key", key);
  
    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.textContent = '削除';
    deleteButton.className = 'deleteButton';
    deleteButton.setAttribute("data-key", key);
  
    postText.appendChild(spanTime);
    postText.appendChild(spanUsername);
    postText.appendChild(spanKey);
    postText.appendChild(spanComment);
    postContent.appendChild(postText);
    postContent.appendChild(editButton);
    postContent.appendChild(deleteButton);
    li.appendChild(postContent);
  
    this.postList.insertBefore(li, this.postList.firstChild);
  }

  editPost(postKey, liElement){
    const postContent = liElement.querySelector(".postContent");
    const postText = liElement.querySelector(".postText");
    const spanUsername = postText.querySelector(".userName");
    const spanComment = postText.querySelector(".commentText");
    const currentUserName = spanUsername.textContent.replace("さん", "");
    const currentComment = spanComment.textContent;

    const errorName = document.createElement("p");
    errorName.classList.add("error", "errorUpdateName");
    errorName.style.display = "none";
  
    const errorComment = document.createElement("p");
    errorComment.classList.add("error", "errorUpdateComment");
    errorComment.style.display = "none";

    liElement.insertBefore(errorName, postContent);
    liElement.insertBefore(errorComment, postContent);

    const editUserName = document.createElement("input");
    editUserName.value = currentUserName;
    editUserName.className = "editUserName";

    const editComment = document.createElement("textarea");
    editComment.value = currentComment;
    editComment.className = "editCommentText";

    postText.replaceChild(editUserName, spanUsername);
    postText.replaceChild(editComment, spanComment);

    const saveButton = document.createElement("button");
    saveButton.textContent = "上書き保存";
    saveButton.className = "saveButton";
    saveButton.setAttribute("data-key", postKey);

    const cancelButton = document.createElement("button");
    cancelButton.textContent = "編集キャンセル";
    cancelButton.className = "cancelButton";

    postContent.replaceChild(saveButton, postContent.querySelector(".editButton"));
    postContent.replaceChild(cancelButton, postContent.querySelector(".deleteButton"));
  }

  updatePost(postKey, liElement){
    const postContent = liElement.querySelector(".postContent");
    const postText = liElement.querySelector(".postText");
    const editUserName = postText.querySelector(".editUserName").value.trim();
    const editComment = postText.querySelector(".editCommentText").value.trim();
    const errorNameElem = liElement.querySelector(".errorUpdateName");
    const errorCommentElem = liElement.querySelector(".errorUpdateComment");
  
    errorNameElem.textContent = "";
    errorCommentElem.textContent = "";
    errorNameElem.style.display = "none";
    errorCommentElem.style.display = "none";
    let isValid = true;

    const userNameValidation = PostValidation.validateUserName(editUserName);
    if(!userNameValidation.isValid){
      errorNameElem.textContent = userNameValidation.errorMessage;
      errorNameElem.style.display = "block";
      isValid = false;
    }

    const commentValidation = PostValidation.validateCreateComment(editComment);
    if(!commentValidation.isValid){
      errorCommentElem.textContent = commentValidation.errorMessage;
      errorCommentElem.style.display = "block";
      isValid = false;
    }

    if(!isValid) return;
    const createdAt = this.postRepository.getCommentTime(postKey);
    this.postRepository.updateComment(postKey, editUserName, editComment, createdAt);
    
    postContent.removeChild(liElement.querySelector(".saveButton"));
    postContent.removeChild(liElement.querySelector(".cancelButton"));

    const spanUsername = this.createSpanUserName(editUserName);
    const spanComment = this.createSpanComment(editComment);

    postText.replaceChild(spanUsername, postText.querySelector(".editUserName"));
    postText.replaceChild(spanComment, postText.querySelector(".editCommentText"));

    this.refreshPostList(this.currentPage);
  }

  loadCurrentPagePosts(page){
    this.currentPage = page;
    this.postList.innerHTML = "";
    const paginatedPosts = this.paginator.getCurrentPagePosts(page, this.allPosts);
    paginatedPosts.forEach( post => {
      if(!post.createdAt) {
        post.createdAt = "----/--/-- --:--:--";
      }
      if(!post.userName) {
        post.userName = "名無し";
      }
      this.addPostToList(post.postKey, post.userName, post.comment, post.postNum, post.createdAt);
    });
  }

  refreshPostList(page){
    this.allPosts = this.postRepository.getAllPosts();
    this.currentPage = page;
    this.loadCurrentPagePosts(this.currentPage);
    this.paginator.updatePostPage(this.allPosts, this.currentPage);
  }
}