Cypress.Commands.add("login", ({ username, password }) => {
  cy.request("POST", `${Cypress.env("BACKEND")}/login`, {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem("loggedBlogger", JSON.stringify(body));
    cy.visit("");
  });
});

Cypress.Commands.add("addBlog", (blog) => {
  console.log(blog);
  cy.request({
    url: `${Cypress.env("BACKEND")}/blogs`,
    method: "POST",
    body: {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes,
      user: localStorage.getItem("loggedBlogger").id,
    },
    headers: {
      Authorization: `bearer ${
        JSON.parse(localStorage.getItem("loggedBlogger")).token
      }`,
    },
  });
  cy.visit("");
});
