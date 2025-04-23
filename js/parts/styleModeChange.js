import { PostViewRenderer } from "../view/PostViewRenderer.js";

export class StyleModeChange {
  constructor(postRepository){
    this.postRepository = postRepository;
    this.modeSelectElem = PostViewRenderer.getStyleModeSelectElem();
    this.applyStyleMode();
    this.setupEventListener();
  }

  applyStyleMode(){
    if(this.postRepository.isDarkMode()){
      PostViewRenderer.switchDarkMode();
      this.modeSelectElem.value = this.postRepository.getDarkMode();
    } else {
      PostViewRenderer.switchLightMode();
      this.modeSelectElem.value = this.postRepository.getLightMode();
    }
  }

  setupEventListener(){
    this.modeSelectElem.addEventListener("change", () => {
      const selectedMode = this.modeSelectElem.value;
      this.postRepository.setSelectedMode(selectedMode);
      this.applyStyleMode();
    });
  }
}