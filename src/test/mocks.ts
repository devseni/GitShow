import type { GithubRepo, GithubUser } from "../types/github";

// Mock data for John Doe
export const mockUser: GithubUser = {
  login: "johndoe",
  name: "John Doe",
  avatar_url:
    "https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff",
  bio: "Full Stack Developer passionate about building web applications and open-source projects.",
  location: "San Francisco, USA",
  public_repos: 24,
  followers: 850,
  following: 120,
  html_url: "https://github.com/johndoe",
};

// User with all optional fields as null — for testing conditional rendering
export const mockUserMinimal: GithubUser = {
  login: "johndoe-minimal",
  name: null,
  avatar_url:
    "https://ui-avatars.com/api/?name=John+Doe&background=999999&color=fff",
  bio: null,
  location: null,
  public_repos: 0,
  followers: 0,
  following: 0,
  html_url: "https://github.com/johndoe-minimal",
};

// Mock repositories for John Doe
export const mockRepos: GithubRepo[] = [
  {
    id: 1,
    name: "task-management-app",
    description:
      "A task management application built with React, TypeScript, and Node.js.",
    stargazers_count: 42,
    language: "TypeScript",
    html_url: "https://github.com/johndoe/task-management-app",
  },
  {
    id: 2,
    name: "weather-dashboard",
    description: null, // intentionally null — tests "No description" fallback
    stargazers_count: 12,
    language: null, // intentionally null — tests language badge is hidden
    html_url: "https://github.com/johndoe/weather-dashboard",
  },
  {
    id: 3,
    name: "portfolio-website",
    description:
      "Personal portfolio website built with Next.js and Tailwind CSS.",
    stargazers_count: 28,
    language: "JavaScript",
    html_url: "https://github.com/johndoe/portfolio-website",
  },
];
