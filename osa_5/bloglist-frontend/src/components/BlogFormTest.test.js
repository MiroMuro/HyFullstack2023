import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import BlogForm from "./BlogForm";
import userEvent from "@testing-library/user-event";

test("<Blogform /> updates parent state and calls createBlog", async () => {
  const user = userEvent.setup();
  const createBlog = jest.fn();

  const { container } = render(<BlogForm createBlog={createBlog} />);
  const sendButton = screen.getByText("Save");

  const authorInput = container.querySelector(".authorInput");
  await user.type(authorInput, "test author");

  const titleInput = container.querySelector(".titleInput");
  await user.type(titleInput, "test title");

  const urlInput = container.querySelector(".urlInput");
  await user.type(urlInput, "test url");

  screen.debug(sendButton);

  expect(authorInput).toHaveValue("test author");
  expect(titleInput).toHaveValue("test title");
  expect(urlInput).toHaveValue("test url");

  await user.click(sendButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0]).toStrictEqual({
    title: "test title",
    author: "test author",
    url: "test url",
  });
});
