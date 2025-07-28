import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface GithubUser {
  login: string;
  id: number;
  avatar_url: string;
  url: string;
  html_url: string;
  type: string;
  site_admin: boolean;
  score?: number;
  node_id?: string;
  gravatar_id?: string;
  followers_url?: string;
  following_url?: string;
  gists_url?: string;
  starred_url?: string;
  subscriptions_url?: string;
  organizations_url?: string;
  repos_url?: string;
  events_url?: string;
  received_events_url?: string;
}

export interface GithubUserDetails {
  login: string;
  name: string;
  bio: string;
  public_repos: number;
  html_url: string;
  avatar_url: string;
}

export interface GithubRepo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
}

export const githubApi = createApi({
  reducerPath: "githubApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.github.com/" }),
  endpoints: (builder) => ({
    searchUsers: builder.query<{ items: GithubUser[] }, string>({
      query: (search) => `search/users?q=${search}`,
      keepUnusedDataFor: 60,
    }),
    getUser: builder.query<GithubUserDetails, string>({
      query: (login) => `users/${login}`,
      keepUnusedDataFor: 60,
    }),
    getUserRepos: builder.query<GithubRepo[], string>({
      query: (login) => `users/${login}/repos?per_page=30&sort=updated`,
      keepUnusedDataFor: 60,
    }),
  }),
});

export const { useSearchUsersQuery, useGetUserQuery, useGetUserReposQuery } = githubApi;
