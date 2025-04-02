export class Paginator {
  constructor(prevButton, pagination, nextButton, refreshPostList){
    this.prevButton = prevButton;
    this.pagination = pagination;
    this.nextButton = nextButton;
    this.refreshPostList = refreshPostList;
    this.allPosts = [];

    this.ITEM_PER_PAGE = Object.freeze(5);
    this.ACTIVE_CLASS = Object.freeze("active");

    this.setupEventListeners();
  }

  updatePostPage(allPosts, currentPage){
    this.allPosts = allPosts;
    this.renderPagination(allPosts);
    this.setCurrentPage(currentPage);
    this.disabledButton(allPosts);
  }

  getCurrentPagePosts(page, allPosts){
    const startPost = (page - 1) * this.ITEM_PER_PAGE;
    const endPost = startPost + this.ITEM_PER_PAGE;
    return allPosts.slice(startPost, endPost);
  }

  totalPages(allPosts){
    return Math.max(1, Math.ceil(allPosts.length / this.ITEM_PER_PAGE));
  }

  disabledButton(allPosts){
    const totalPages = this.totalPages(allPosts);
    this.prevButton.disabled = this.currentPage === 1;
    this.nextButton.disabled = this.currentPage === totalPages;
  }

  renderPagination(allPosts){
    this.pagination.innerHTML = "";
    const totalPages = this.totalPages(allPosts);
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
    this.pagination.addEventListener("click", e => {
      if(e.target.tagName !== "BUTTON") return;
      const selectedPage = parseInt(e.target.textContent);
      this.refreshPostList(selectedPage);
    });

    this.prevButton.addEventListener("click", () => {
      if(this.currentPage > 1){
        this.refreshPostList(this.currentPage - 1);
      }
    });
  
    this.nextButton.addEventListener("click", () => {
      const totalPages = this.totalPages(this.allPosts);
      if(this.currentPage < totalPages){
        this.refreshPostList(this.currentPage + 1);
      }
    });
  }
}