import { Paginator } from "./paginator.js";

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

  addPostToList(key, comment, postNum){
    const li = document.createElement('li');
    const span = document.createElement('span');
  
    const spanKey = document.createElement('span');
    spanKey.textContent = `${postNum}:`;
    
    const spanComment = document.createElement('span');
    spanComment.textContent = comment;
  
    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.textContent = '削除';
    deleteButton.className = 'deleteButton';
    deleteButton.setAttribute("data-key", key);
  
    span.appendChild(spanKey);
    span.appendChild(spanComment);
    li.appendChild(span);
    li.appendChild(deleteButton);
  
    this.postList.insertBefore(li, this.postList.firstChild);
  }

  loadCurrentPagePosts(page){
    this.currentPage = page;
    this.postList.innerHTML = "";
    const paginatedPosts = this.paginator.getCurrentPagePosts(page, this.allPosts);
    paginatedPosts.forEach( post => {
      this.addPostToList(post.postKey, post.comment, post.postNum);
    });
  }

  refreshPostList(page){
    this.allPosts = this.postRepository.getAllPosts();
    this.currentPage = page;
    this.loadCurrentPagePosts(this.currentPage);
    this.paginator.updatePostPage(this.allPosts, this.currentPage);
  }
}