import { type FC, memo } from "react";
import styles from "./SearchBar.module.scss";

interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
}

export const SearchBar: FC<SearchBarProps> = memo(({ value, onChange }) => (
  <div className={styles.searchBar}>
    <input
      className={styles.input}
      type="text"
      placeholder="Search GitHub users by login..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      autoFocus
    />
  </div>
));
