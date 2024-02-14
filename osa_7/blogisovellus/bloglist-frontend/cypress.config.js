import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {},
    baseUrl: "http://localhost:5173",
  },
  env: {
    BACKEND: "http://localhost:3003/api",
    blog: {
      title: "Ninja skills",
      author: "Jackie Chan",
      url: "www.ninjaskills.com",
      likes: 500,
    },
    blogWith123likes: {
      title: "Parhaat kalapaikat",
      author: "Minna Kalastaja",
      url: "http://parhaatkalapaikat.com",
      likes: 123,
    },
    blogWith100likes: {
      title: "Kuntosali blogi",
      author: "Kalle Kuntoilija",
      url: "http://bestymtips.fi",
      likes: 100,
    },
  },
});
