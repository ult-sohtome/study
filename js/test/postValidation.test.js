import { PostValidation } from "../validation/postValidation.js";

const expect = chai.expect;

describe("PostValidation", () => {
  const testCases = [
    {
      description: "コメントが空だと無効",
      input: "",
      expected: { isValid: false, errorMessage: "コメントを入力してください。" }
    },
    {
      description: "コメントが255文字を超えると無効",
      input: String("あ").repeat(256),
      expected: { isValid: false, errorMessage: "255文字以内でコメントを入力してください。" }
    },
    {
      description: "数値型を渡すと無効",
      input: 123,
      expected: { isValid: false, errorMessage: "コメントを入力してください。" }
    },
    {
      description: "nullを渡すと無効",
      input: null,
      expected: { isValid: false, errorMessage: "コメントを入力してください。" }
    },
    {
      description: "1文字は有効",
      input: "a",
      expected: { isValid: true }
    },
    {
      description: "文字の混在は有効",
      input: "あaい😊23１",
      expected: { isValid: true }
    }
  ];

  testCases.forEach(({ description, input, expected }) => {
    it(description, () => {
      const result = PostValidation.validateCreateComment(input);
      expect(result.isValid).to.equal(expected.isValid);
      if (expected.errorMessage) {
        expect(result.errorMessage).to.equal(expected.errorMessage);
      }
    });
  });
});