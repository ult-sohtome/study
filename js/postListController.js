import { Paginator } from "./common/paginator.js";
import { PostViewRenderer } from "./view/PostViewRenderer.js";

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
    this.sortOrder = "newest";
    this.refreshPostList(this.currentPage);
  }

  addPostToList(key, userName, comment, postNum, time, keyWord = ""){
    const li = document.createElement('li');
    const postContent = document.createElement('div');
    postContent.className = 'postContent';
    const postText = document.createElement('div');
    postText.className = 'postText';

    const spanTime = PostViewRenderer.createSpanTime(time);
    const spanUsername = PostViewRenderer.createSpanUserName(userName, keyWord);
    const spanKey = PostViewRenderer.createSpanKey(postNum);
    const spanComment = PostViewRenderer.createSpanComment(comment, keyWord);
    const editButton = PostViewRenderer.createEditButton(key);
    const deleteButton = PostViewRenderer.createDeleteButton(key);
  
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

  loadCurrentPagePosts(page){
    this.currentPage = page;
    PostViewRenderer.clearInnerHTML(this.postList);
    const paginatedPosts = this.paginator.getCurrentPagePosts(page, this.allPosts);
    paginatedPosts.forEach( post => {
      this.setDefaultPostValues(post);
      this.addPostToList(post.postKey, post.userName, post.comment, post.postNum, post.updatedAt);
    });
  }

  refreshPostList(page){
    const posts = this.postRepository.getAllPosts();
    this.allPosts = this.getSortedPosts(posts);
    this.currentPage = page;
    this.loadCurrentPagePosts(this.currentPage);
    this.paginator.updatePostPage(this.allPosts, this.currentPage);
    PostViewRenderer.switchEnabledButtons();
  }

  setSortOrder(order) {
    this.sortOrder = order;
  }

  getSortedPosts(posts) {
    return posts.sort((a, b) => {
      const aHasDate = a.createdAt && a.createdAt !== "";
      const bHasDate = b.createdAt && b.createdAt !== "";

      if (!aHasDate && !bHasDate) {
        return this.sortOrder === "oldest"
          ? b.postNum - a.postNum
          : a.postNum - b.postNum;
      }
      if (!aHasDate) return this.sortOrder === "oldest" ? 1 : -1;
      if (!bHasDate) return this.sortOrder === "oldest" ? -1 : 1;

      const aDate = new Date(a.createdAt);
      const bDate = new Date(b.createdAt);
  
      return this.sortOrder === "oldest"
        ? bDate - aDate
        : aDate - bDate;
    });
  }

  setDefaultPostValues(post){
    if(!post.updatedAt) {
      post.updatedAt = "----/--/-- --:--:--";
    }
    if(!post.userName) {
      post.userName = "名無し";
    }
  }
}