import { PostValidation } from "../validation/postValidation.js";

const expect = chai.expect;

describe("UserNameValidation", () => {
  const testCases = [
    {
      description: "数値型を渡すと無効",
      input: 123,
      expected: { isValid: false, errorMessage: "不正な値が入力されました。" }
    },
    {
      description: "nullを渡すと無効",
      input: null,
      expected: { isValid: false, errorMessage: "不正な値が入力されました。" }
    },
    {
      description: "ニックネームが20文字を超えると無効",
      input: String("あ").repeat(21),
      expected: { isValid: false, errorMessage: "20文字以内でニックネームを入力してください。" }
    },
    {
      description: "ニックネームが空は有効",
      input: "",
      expected: { isValid: true }
    },
    {
      description: "ニックネームが1文字は有効",
      input: "a",
      expected: { isValid: true }
    },
    {
      description: "文字の混在は有効",
      input: "あaい😊23１",
      expected: { isValid: true }
    },
    {
      description: "ニックネームが20文字は有効",
      input: "😊".repeat(20),
      expected: { isValid: true }
    }
  ];

  testCases.forEach(({ description, input, expected }) => {
    it(description, () => {
      const result = PostValidation.validateUserName(input);
      expect(result).to.deep.equal(expected);
    });
  });
});

describe("CommentValidation", () => {
  const testCases = [
    {
      description: "数値型を渡すと無効",
      input: 123,
      expected: { isValid: false, errorMessage: "不正な値が入力されました。" }
    },
    {
      description: "nullを渡すと無効",
      input: null,
      expected: { isValid: false, errorMessage: "不正な値が入力されました。" }
    },
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
      description: "1文字は有効",
      input: "a",
      expected: { isValid: true }
    },
    {
      description: "文字の混在は有効",
      input: "あaい😊23１",
      expected: { isValid: true }
    },
    {
      description: "255文字は有効",
      input: String("あ").repeat(255),
      expected: { isValid: true }
    }
  ];

  testCases.forEach(({ description, input, expected }) => {
    it(description, () => {
      const result = PostValidation.validateCreateComment(input);
      expect(result).to.deep.equal(expected);
    });
  });
});