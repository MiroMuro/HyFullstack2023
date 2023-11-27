const list_helper = require("../utils/list_helper");
const testBlogs = require("../utils/dummyblogs");
test("dummy returns one", () => {
  expect(list_helper.dummy([])).toBe(1);
});

describe("total likes", () => {
  test("of an empty array are zero", () => {
    expect(list_helper.totalLikes([])).toBe(0);
  });

  test("When list has only one blog equals the likes of that", () => {
    expect(list_helper.totalLikes(testBlogs.slice(0, 1))).toBe(
      Number(testBlogs[0].likes)
    );
  });
  test("of a bigger list is calculated right", () => {
    expect(list_helper.totalLikes(testBlogs)).toBe(50484);
  });
});

const mostLikedBlogpost = {
  title: "Running ",
  author: "David Runner",
  url: "http://blogspot.com/Running",
  likes: "41232",
};

test("Most liked blogpost found", () => {
  expect(list_helper.favouriteBlog(testBlogs)).toEqual(mostLikedBlogpost);
});
