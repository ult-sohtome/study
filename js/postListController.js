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

  addPostToList(key, userName, comment, postNum, time){
    const li = document.createElement('li');
    const div = document.createElement('div');
    div.className = 'postText';

    const spanTime = document.createElement('span');
    spanTime.className = 'time';
    spanTime.textContent = `[${time}]`;

    const spanUsername = document.createElement('span');
    spanUsername.className = 'userName';
    spanUsername.textContent = `${userName}さん`;
  
    const spanKey = document.createElement('span');
    spanKey.className = 'postNum';
    spanKey.textContent = `${postNum}:`;
    
    const spanComment = document.createElement('span');
    spanComment.textContent = comment;
  
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
    li.appendChild(deleteButton);
  
    this.postList.insertBefore(li, this.postList.firstChild);
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