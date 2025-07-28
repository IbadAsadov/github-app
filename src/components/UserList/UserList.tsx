import { type FC, memo } from "react";
import type { GithubUser } from "../../api/githubApi";
import styles from "./UserList.module.scss";

interface UserListProps {
  users: GithubUser[];
  onSelect: (login: string) => void;
}

export const UserList: FC<UserListProps> = memo(({ users, onSelect }) => (
  <div className={styles.list}>
    {users.map((user) => (
      <div
        key={user.id}
        className={styles.userItem}
        onClick={() => onSelect(user.login)}
        tabIndex={0}
        role="button"
        aria-label={`Show details for ${user.login}`}
      >
        <img src={user.avatar_url} alt={user.login} className={styles.avatar} />
        <span className={styles.login}>{user.login}</span>
      </div>
    ))}
  </div>
));
