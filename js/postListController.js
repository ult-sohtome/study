import { Paginator } from "./common/paginator.js";
import { UpdatedAtDisplay } from "./parts/updatedAtDisplay.js";
import { PostViewRenderer } from "./view/PostViewRenderer.js";

export class PostListController{
  constructor(htmlIds, postRepository){
    this.postList = PostViewRenderer.getHtmlElem(htmlIds.postListId);
    this.postRepository = postRepository;

    const prevButton = PostViewRenderer.getHtmlElem(htmlIds.prevButtonId);
    const pagination = PostViewRenderer.getHtmlElem(htmlIds.paginateId);
    const nextButton = PostViewRenderer.getHtmlElem(htmlIds.nextButtonId);

    this.paginator = new Paginator(
      prevButton,
      pagination,
      nextButton,
      page => this.refreshPostList(page)
    );
    this.allPosts = this.postRepository.getAllPosts();
    this.currentPage = 1;
    this.sortOrder = "newest";
    this.refreshPostList(this.currentPage);
  }

  addPostToList(postKey, userName, comment, postNum, time, keyWord = ""){
    const li = PostViewRenderer.createLiElem();
    const postContent = PostViewRenderer.createPostContentElem();
    const postText = PostViewRenderer.createPostTextElem();

    const spanTime = PostViewRenderer.createSpanTime(time, postKey);
    const spanUsername = PostViewRenderer.createSpanUserName(userName, keyWord);
    const spanKey = PostViewRenderer.createSpanKey(postNum);
    const spanComment = PostViewRenderer.createSpanComment(comment, keyWord);
    const editButton = PostViewRenderer.createEditButton(postKey);
    const deleteButton = PostViewRenderer.createDeleteButton(postKey);
  
    postText.appendChild(spanTime);
    postText.appendChild(spanUsername);
    postText.appendChild(spanKey);
    postText.appendChild(spanComment);
    postContent.appendChild(postText);
    postContent.appendChild(editButton);
    postContent.appendChild(deleteButton);
    li.appendChild(postContent);
    this.postList.appendChild(li);
  }

  loadCurrentPagePosts(page){
    this.currentPage = page;
    PostViewRenderer.clearInnerHTML(this.postList);
    const paginatedPosts = this.paginator.getCurrentPagePosts(page, this.allPosts);
    paginatedPosts.forEach( post => {
      this.setDefaultPostValues(post);
      this.addPostToList(post.postKey, post.userName, post.comment, post.postNum, post.createdAt);
    });
  }

  refreshPostList(page){
    const posts = this.postRepository.getAllPosts();
    this.allPosts = this.getSortedPosts(posts);
    this.currentPage = page;
    this.loadCurrentPagePosts(this.currentPage);
    this.paginator.updatePostPage(this.allPosts, this.currentPage);
    PostViewRenderer.switchEnabledButtons();
    UpdatedAtDisplay.setupEventListener(this.postRepository);
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
          ? a.postNum - b.postNum
          : b.postNum - a.postNum;
      }
      if (!aHasDate) return this.sortOrder === "oldest" ? -1 : 1;
      if (!bHasDate) return this.sortOrder === "oldest" ? 1 : -1;

      const aDate = new Date(a.createdAt);
      const bDate = new Date(b.createdAt);
  
      return this.sortOrder === "oldest"
        ? aDate - bDate
        : bDate - aDate;
    });
  }

  setDefaultPostValues(post){
    if(!post.createdAt) {
      post.createdAt = "----/--/-- --:--:--";
    }
    if(!post.userName) {
      post.userName = "名無し";
    }
  }
}