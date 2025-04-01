import { PostRepository } from "./postRepository.js";
import { PostListController } from './postListController.js';
import { PostCreate } from './postCreate.js';
import { PostDelete } from './postDelete.js';

export class PostManager {
  constructor(htmlIds){
    const postRepository = new PostRepository();
    const postListController = new PostListController(htmlIds, postRepository);
    new PostCreate(htmlIds, postRepository, postListController);
    new PostDelete(postRepository, postListController);
  }
}