export class PostManager {
  constructor(postListId, commentInputId, postButtonId, prevId, paginateId, nextId, postRepository){
    this.postList = document.getElementById(postListId);
    this.commentInput = document.getElementById(commentInputId);
    this.postButton = document.getElementById(postButtonId);
    this.prevButton = document.getElementById(prevId);
    this.paginateButton = document.getElementById(paginateId);
    this.nextButton = document.getElementById(nextId);
    this.active = "active";
    this.itemsPerPage = 5;
    this.postRepository = postRepository;
    this.allPosts = this.postRepository.getAllPosts();
    this.currentPage = this.totalPages();
    this.renderPagination();
    this.setActivePage(this.currentPage);
    this.loadAllPosts(this.currentPage);
    this.disabledButton();
    this.setupEventListeners();
  }

  totalPages(){
    return Math.max(1, Math.ceil(this.allPosts.length / this.itemsPerPage));
  }

  createComment(){
    const comment = this.commentInput.value.trim();
    if(!comment) return;
    this.postRepository.addComment(comment);
    this.allPosts = this.postRepository.getAllPosts();
    const totalPages = this.totalPages();
    this.renderPagination();
    this.setActivePage(totalPages);
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
    this.setActivePage(this.currentPage);
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
    const startPost = (page - 1) * this.itemsPerPage;
    const endPost = startPost + this.itemsPerPage;
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
    this.paginateButton.innerHTML = "";
    const totalPages = this.totalPages();
    for(let i = 1; i <= totalPages; i++){
      const pageButton = document.createElement("button");
      pageButton.textContent = i;
      this.paginateButton.appendChild(pageButton);
    }
  }

  setActivePage(page){
    const allPageButtons = this.paginateButton.querySelectorAll("button");
    allPageButtons.forEach(btn => btn.classList.remove(this.active));
    const targetBtn = this.paginateButton.querySelectorAll("button")[page - 1];
    if(targetBtn){
      targetBtn.classList.add(this.active);
    }
    this.currentPage = page;
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

    this.paginateButton.addEventListener("click", e => {
      if(e.target.tagName !== "BUTTON") return;
      const selectedPage = parseInt(e.target.textContent);
      this.setActivePage(selectedPage);
      this.loadAllPosts(selectedPage);
      this.disabledButton();
    });

    this.prevButton.addEventListener("click", () => {
      if(this.currentPage > 1){
        this.setActivePage(this.currentPage - 1);
        this.loadAllPosts(this.currentPage);
        this.disabledButton();
      }
    });
  
    this.nextButton.addEventListener("click", () => {
      const totalPages = this.totalPages();
      if(this.currentPage < totalPages){
        this.setActivePage(this.currentPage + 1);
        this.loadAllPosts(this.currentPage);
        this.disabledButton();
      }
    });
  }
}