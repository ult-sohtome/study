import { PostViewRenderer } from "../view/PostViewRenderer.js";

export class PostSearch {
  constructor(htmlIds, postRepository, postListController){
    this.postRepository = postRepository;
    this.postListController = postListController;
    this.searchInput = PostViewRenderer.getHtmlElem(htmlIds.searchInputId);
    this.searchButton = PostViewRenderer.getHtmlElem(htmlIds.searchButtonId);
    this.resetButton = PostViewRenderer.getHtmlElem(htmlIds.resetButtonId);
    this.setupEventListeners();
  }

  searchPosts(){
    const keyword = this.searchInput.value.trim();
    if (!keyword) {
      alert("検索キーワードを入力してください。");
      return;
    }
    const allPosts = this.postRepository.getAllPosts();
    const filteredPosts = allPosts.filter(post => {
      const userName = post.userName || "";
      return userName.includes(keyword) || post.comment.includes(keyword)
    });
    if(filteredPosts.length === 0) {
      alert("指定されたキーワードに該当する投稿は見つかりませんでした。");
      return;
    }
    this.postListController.postList.innerHTML = "";
    filteredPosts.forEach(post => {
      if(!post.updatedAt) {
        post.updatedAt = "----/--/-- --:--:--";
      }
      if(!post.userName) {
        post.userName = "名無し";
      }
      this.postListController.addPostToList(
        post.postKey,
        post.userName,
        post.comment,
        post.postNum,
        post.updatedAt,
        keyword
      );
    });
    PostViewRenderer.HiddenPagination();
  }

  setupEventListeners(){
    this.searchButton.addEventListener("click", () => {
      this.searchPosts();
    });
    this.resetButton.addEventListener("click", () => {
      this.postListController.refreshPostList(this.postListController.currentPage);
      this.searchInput.value = "";
      PostViewRenderer.ShowPagination();
    });
  }
}