import { Paginator } from "./common/paginator.js";

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
    const div = document.createElement('div');
    div.className = 'postText';

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
  
    div.appendChild(spanTime);
    div.appendChild(spanUsername);
    div.appendChild(spanKey);
    div.appendChild(spanComment);
    li.appendChild(div);
    li.appendChild(editButton);
    li.appendChild(deleteButton);
  
    this.postList.insertBefore(li, this.postList.firstChild);
  }

  editPost(postKey, liElement){
    const div = liElement.querySelector(".postText");
    const spanUsername = div.querySelector(".userName");
    const spanComment = div.querySelector(".commentText");
    const currentUserName = spanUsername.textContent.replace("さん", "");
    const currentComment = spanComment.textContent;

    const editUseName = document.createElement("input");
    editUseName.value = currentUserName;
    editUseName.className = "editUserName";

    const editComment = document.createElement("textarea");
    editComment.value = currentComment;
    editComment.className = "editCommentText";

    div.replaceChild(editUseName, spanUsername);
    div.replaceChild(editComment, spanComment);

    const saveButton = document.createElement("button");
    saveButton.textContent = "上書き保存";
    saveButton.className = "saveButton";
    saveButton.setAttribute("data-key", postKey);

    const cancelButton = document.createElement("button");
    cancelButton.textContent = "編集キャンセル";
    cancelButton.className = "cancelButton";

    liElement.replaceChild(saveButton, liElement.querySelector(".editButton"));
    liElement.replaceChild(cancelButton, liElement.querySelector(".deleteButton"));
  }

  updatePost(postKey, liElement){
    const div = liElement.querySelector(".postText");
    const editUserName = div.querySelector(".editUserName").value.trim();
    const editComment = div.querySelector(".editCommentText").value.trim();

    this.postRepository.updateComment(postKey, editUserName, editComment);
    
    liElement.removeChild(liElement.querySelector(".saveButton"));
    liElement.removeChild(liElement.querySelector(".cancelButton"));

    const spanUsername = this.createSpanUserName(editUserName);
    const spanComment = this.createSpanComment(editComment);

    div.replaceChild(spanUsername, div.querySelector(".editUserName"));
    div.replaceChild(spanComment, div.querySelector(".editCommentText"));

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