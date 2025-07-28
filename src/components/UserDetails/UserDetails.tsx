import { type FC, memo } from "react";
import type { GithubRepo, GithubUserDetails } from "../../api/githubApi";
import { useGetUserReposQuery } from "../../api/githubApi";
import styles from "./UserDetails.module.scss";

interface UserDetailsProps {
  user: GithubUserDetails & {
    company?: string;
    location?: string;
    blog?: string;
    email?: string;
    followers?: number;
    following?: number;
    twitter_username?: string;
    created_at?: string;
  };
  onClose: () => void;
}

export const UserDetails: FC<UserDetailsProps> = memo(({ user, onClose }) => {
  const { data: repos, isLoading: reposLoading, isError: reposError } = useGetUserReposQuery(user.login);
  return (
    <div className={styles.details}>
      <button className={styles.closeBtn} onClick={onClose} aria-label="Close user details" type="button">
        ×
      </button>

      <div className={styles.cardHeader}>
        <img src={user.avatar_url} alt={user.login} className={styles.avatar} />
        <div className={styles.headerInfo}>
          <div className={styles.name}>{user.name || user.login}</div>
          <div className={styles.login}>@{user.login}</div>
          {user.bio && <div className={styles.bio}>{user.bio}</div>}
          <div className={styles.profileStats}>
            <span>
              Repos: <b>{user.public_repos}</b>
            </span>
            {user.followers !== undefined && (
              <span>
                Followers: <b>{user.followers}</b>
              </span>
            )}
            {user.following !== undefined && (
              <span>
                Following: <b>{user.following}</b>
              </span>
            )}
          </div>
        </div>
      </div>
      <div className={styles.extraInfo}>
        {user.company && (
          <div>
            <b>Company:</b> {user.company}
          </div>
        )}
        {user.location && (
          <div>
            <b>Location:</b> {user.location}
          </div>
        )}
        {user.email && (
          <div>
            <b>Email:</b>{" "}
            <a href={`mailto:${user.email}`} className={styles.link}>
              {user.email}
            </a>
          </div>
        )}
        {user.blog && (
          <div>
            <b>Website:</b>{" "}
            <a
              href={user.blog.startsWith("http") ? user.blog : `https://${user.blog}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              {user.blog}
            </a>
          </div>
        )}
        {user.twitter_username && (
          <div>
            <b>Twitter:</b>{" "}
            <a
              href={`https://twitter.com/${user.twitter_username}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              @{user.twitter_username}
            </a>
          </div>
        )}
        {user.created_at && (
          <div>
            <b>Joined:</b> {new Date(user.created_at).toLocaleDateString()}
          </div>
        )}
      </div>
      <a href={user.html_url} className={styles.link} target="_blank" rel="noopener noreferrer">
        View GitHub Profile
      </a>
      <div className={styles.reposSection}>
        <div className={styles.reposTitle}>Public Repositories</div>
        {reposLoading && <div>Loading repos...</div>}
        {reposError && <div style={{ color: "#ff6c6c" }}>Failed to load repos.</div>}
        {repos && repos.length > 0 ? (
          <ul className={styles.repoList}>
            {repos.map((repo: GithubRepo) => (
              <li key={repo.id} className={styles.repoItem}>
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className={styles.repoLink}>
                  {repo.name}
                </a>
                {repo.description && <div className={styles.repoDesc}>{repo.description}</div>}
                <div className={styles.repoStats}>
                  ⭐ {repo.stargazers_count} &nbsp;|&nbsp; 🍴 {repo.forks_count}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          !reposLoading && <div>No public repositories.</div>
        )}
      </div>
    </div>
  );
});
