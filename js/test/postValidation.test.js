import { PostValidation } from "../validation/postValidation.js";

const expect = chai.expect;

describe("PostValidation", () => {
  it("コメントが空だと無効", () => {
    const result = PostValidation.validateCreateComment("");
    expect(result.isValid).to.be.false;
    expect(result.errorMessage).to.equal("コメントを入力してください。");
  });

  it("コメントが255文字を超えると無効", () => {
    const longComment = String("あ").repeat(256);
    const result = PostValidation.validateCreateComment(longComment);
    expect(result.isValid).to.be.false;
    expect(result.errorMessage).to.equal("255文字以内でコメントを入力してください。");
  });
});