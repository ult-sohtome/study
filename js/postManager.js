export class PostManager {
  constructor(postListId, commentInputId, postButtonId, prevId, paginateId, nextId, postRepository){
    this.postList = document.getElementById(postListId);
    this.commentInput = document.getElementById(commentInputId);
    this.postButton = document.getElementById(postButtonId);
    this.prevButton = document.getElementById(prevId);
    this.pagination = document.getElementById(paginateId);
    this.nextButton = document.getElementById(nextId);
    this.ACTIVE_CLASS = Object.freeze("active");
    this.ITEM_PER_PAGE = Object.freeze(5);
    this.postRepository = postRepository;
    this.allPosts = this.postRepository.getAllPosts();
    this.currentPage = this.totalPages();
    this.renderPagination();
    this.setCurrentPage(this.currentPage);
    this.loadAllPosts(this.currentPage);
    this.disabledButton();
    this.setupEventListeners();
  }

  totalPages(){
    return Math.max(1, Math.ceil(this.allPosts.length / this.ITEM_PER_PAGE));
  }

  createComment(){
    const comment = this.commentInput.value.trim();
    if(!comment) return;
    this.postRepository.addComment(comment);
    this.allPosts = this.postRepository.getAllPosts();
    const totalPages = this.totalPages();
    this.renderPagination();
    this.setCurrentPage(totalPages);
    this.loadAllPosts(totalPages);
    this.disabledButton();
    this.commentInput.value = "";
  }

  deleteComment(postKey, liElement){
    this.postRepository.deleteComment(postKey);
    liElement.remove();
    if(!this.postRepository.hasComments()){
      this.postRepository.clearCounter();
    }
    this.allPosts = this.postRepository.getAllPosts();
    this.renderPagination();
    const totalPages = this.totalPages();
    if(this.currentPage > totalPages) {
      this.currentPage = totalPages;
    }
    this.setCurrentPage(this.currentPage);
    this.loadAllPosts(this.currentPage);
    this.disabledButton();
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

  loadAllPosts(page){
    this.currentPage = page;
    this.postList.innerHTML = "";
    const startPost = (page - 1) * this.ITEM_PER_PAGE;
    const endPost = startPost + this.ITEM_PER_PAGE;
    const paginatedPosts = this.allPosts.slice(startPost, endPost);
    paginatedPosts.forEach( post => {
      this.addPostToList(post.postKey, post.comment, post.postNum);
    });
  }

  disabledButton(){
    const totalPages = this.totalPages();
    this.prevButton.disabled = this.currentPage === 1;
    this.nextButton.disabled = this.currentPage === totalPages;
  }

  renderPagination(){
    this.pagination.innerHTML = "";
    const totalPages = this.totalPages();
    for(let i = 1; i <= totalPages; i++){
      const pageButton = document.createElement("button");
      pageButton.textContent = i;
      this.pagination.appendChild(pageButton);
    }
  }

  updatePageBtnUI(page){
    const allPageButtons = this.pagination.querySelectorAll("button");
    allPageButtons.forEach(btn => btn.classList.remove(this.ACTIVE_CLASS));
    const targetBtn = this.pagination.querySelectorAll("button")[page - 1];
    if(targetBtn){
      targetBtn.classList.add(this.ACTIVE_CLASS);
    }
  }

  setCurrentPage(page){
    this.currentPage = page;
    this.updatePageBtnUI(page);
  }

  setupEventListeners(){
    this.postButton.addEventListener("click", () => {
      this.createComment();
    });

    this.postList.addEventListener("click", e => {
      if(e.target.classList.contains("deleteButton")) {
        const postKey = e.target.dataset.key;
        const li = e.target.closest("li");

        if(postKey && li){
          this.deleteComment(postKey, li);
        }
      }
    });

    this.pagination.addEventListener("click", e => {
      if(e.target.tagName !== "BUTTON") return;
      const selectedPage = parseInt(e.target.textContent);
      this.setCurrentPage(selectedPage);
      this.loadAllPosts(selectedPage);
      this.disabledButton();
    });

    this.prevButton.addEventListener("click", () => {
      if(this.currentPage > 1){
        this.setCurrentPage(this.currentPage - 1);
        this.loadAllPosts(this.currentPage);
        this.disabledButton();
      }
    });
  
    this.nextButton.addEventListener("click", () => {
      const totalPages = this.totalPages();
      if(this.currentPage < totalPages){
        this.setCurrentPage(this.currentPage + 1);
        this.loadAllPosts(this.currentPage);
        this.disabledButton();
      }
    });
  }
}