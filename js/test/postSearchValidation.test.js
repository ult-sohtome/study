import { PostSearchValidation } from "../validation/postSearchValidation.js";

const expect = chai.expect;

describe("PostSearchValidation", () => {
  describe("Keyword_異常系", () => {
    const testCases = [
      {
        description: "検索キーワードが空だと無効",
        input: "",
        expected: { isValid: false, errorMessage: "検索キーワードを入力してください。" }
      },
      {
        description: "検索キーワードがnullだと無効",
        input: null,
        expected: { isValid: false, errorMessage: "不正な値が入力されました。" }
      },
      {
        description: "検索キーワードが数値型だと無効",
        input: 123,
        expected: { isValid: false, errorMessage: "不正な値が入力されました。" }
      }
    ];

    testCases.forEach(({ description, input, expected }) => {
      it(description, () => {
        const result = PostSearchValidation.validateSearchKeyword(input);
        expect(result).to.deep.equal(expected);
      });
    });
  });
  describe("Keyword_正常系", () => {
    const testCases = [
      {
        description: "検索キーワードが1文字は有効",
        input: "あ",
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
        const result = PostSearchValidation.validateSearchKeyword(input);
        expect(result).to.deep.equal(expected);
      });
    });
  });
});