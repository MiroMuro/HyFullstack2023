import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

test("renders the blog title and the author name", async () => {
  const blog = {
    id: "123abc",
    title: "Homewine brewing",
    author: "Stephen King",
    url: "www.kiljua.com",
    likes: 130,
    user: {
      id: "123abc",
    },
  };

  const user = {
    id: "123abc",
  };

  const { container } = render(<Blog blog={blog} user={user} />);
  const div = container.querySelector(".blog");
  expect(div).toHaveTextContent("Homewine brewing");
  expect(div).toHaveTextContent("Stephen King");
  screen.debug(div);
});
test("Clicking the view button exposes the rest of the blog", async () => {
  const blog = {
    id: "123abc",
    title: "Homewine brewing",
    author: "Stephen King",
    url: "www.kiljua.com",
    likes: 130,
    user: {
      id: "123abc",
    },
  };

  const user = {
    id: "123abc",
    name: "Petteri Saarisalo",
  };

  const mockHandler = jest.fn();
  const { container } = render(
    <Blog blog={blog} user={user} updateBlog={mockHandler} />
  );
  const person = userEvent.setup();
  const button = screen.getByText("View");
  await person.click(button);

  const div = container.querySelector(".blog");

  expect(div).toHaveTextContent("Homewine brewing");
  expect(div).toHaveTextContent("Stephen King");
  expect(div).toHaveTextContent("www.kiljua.com");
  expect(div).toHaveTextContent("likes 130");
  expect(div).toHaveTextContent("Petteri Saarisalo");

  screen.debug(div);
});
test("Clicking like button twice fires the event handler twice", async () => {
  const blog = {
    id: "123abc",
    title: "Homewine brewing",
    author: "Stephen King",
    url: "www.kiljua.com",
    likes: 130,
    user: {
      id: "123abc",
    },
  };

  const user = {
    id: "123abc",
    name: "Petteri Saarisalo",
  };
  const mockHandler = jest.fn();
  const { container } = render(
    <Blog user={user} blog={blog} updateBlog={mockHandler}></Blog>
  );
  const person = userEvent.setup();
  const viewButton = screen.getByText("View");
  await person.click(viewButton);

  const div = container.querySelector(".blog");
  const likeButton = screen.getByText("like");
  await person.click(likeButton);
  screen.debug(div);
  await person.click(likeButton);
  expect(mockHandler.mock.calls).toHaveLength(2);
});
