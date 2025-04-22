import { PostViewRenderer } from "../view/PostViewRenderer.js";
import { PostRepository } from "../repositories/postRepository.js";

export class UpdatedAtDisplay {
  static setupEventListener(){
    const postTimeElems = PostViewRenderer.getPostTimeElems();
    const postRepository = new PostRepository();
    const tooltip = document.getElementById("customTooltip");

    postTimeElems.forEach(elem => {
      elem.addEventListener("mouseover", (e) => {
        const postKey = PostViewRenderer.getPostKeyFromTarget(e.target);
        const updatedAt = postRepository.getCommentUpdatedTime(postKey);
        if(updatedAt !== "") {
          tooltip.textContent = `最終更新日時: ${updatedAt}`;
          tooltip.style.display = "block";
        }
      });

      elem.addEventListener("mousemove", (e) => {
        tooltip.style.left = `${e.pageX + 10}px`;
        tooltip.style.top = `${e.pageY + 10}px`;
      });

      elem.addEventListener("mouseout", () => {
        tooltip.style.display = "none";
      });
    });
  }
}