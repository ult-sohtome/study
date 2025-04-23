import { PostViewRenderer } from "../view/PostViewRenderer.js";

export class UpdatedAtDisplay {
  static setupEventListener(postRepository){
    const postTimeElems = PostViewRenderer.getPostTimeElems();
    const tooltip = PostViewRenderer.getHtmlElem("customTooltip");

    postTimeElems.forEach(elem => {
      elem.addEventListener("mouseover", (e) => {
        const postKey = PostViewRenderer.getPostKeyFromTarget(e.target);
        const updatedAt = postRepository.getCommentUpdatedTime(postKey);
        if(updatedAt !== "") {
          PostViewRenderer.showUpdatedAtTooltip(tooltip, updatedAt);
        }
      });

      elem.addEventListener("mousemove", (e) => {
        PostViewRenderer.moveTooltip(tooltip, e);
      });

      elem.addEventListener("mouseout", () => {
        PostViewRenderer.hiddenElem(tooltip);
      });
    });
  }
}