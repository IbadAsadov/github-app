import { type FC, useCallback, useState } from "react";
import styles from "./App.module.scss";
import { useGetUserQuery, useSearchUsersQuery } from "./api/githubApi";
import { Loader, SearchBar, UserDetails, UserList } from "./components";
import { useDebounce } from "./hooks/useDebounce";

const App: FC = () => {
  const [search, setSearch] = useState("");
  const [selectedLogin, setSelectedLogin] = useState<string | null>(null);
  const debouncedSearch = useDebounce(search, 500);

  const { data, isLoading, isError, error } = useSearchUsersQuery(debouncedSearch, {
    skip: !debouncedSearch,
  });

  const handleSelect = useCallback((login: string) => setSelectedLogin(login), []);

  const { data: userDetails } = useGetUserQuery(selectedLogin!, {
    skip: !selectedLogin,
  });

  if (selectedLogin && userDetails) {
    return (
      <div className={styles.container}>
        <UserDetails user={userDetails} onClose={() => setSelectedLogin(null)} />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>GitHub User Search</div>
      <div className={styles.subtitle}>Find users by login, view their profile and details instantly.</div>
      <SearchBar value={search} onChange={setSearch} />
      <hr className={styles.divider} />
      {isLoading && <Loader />}
      {isError && (
        <div style={{ color: "#ff6c6c", textAlign: "center", margin: "1rem 0" }}>
          {(error as { data?: { message?: string } })?.data?.message ?? "Failed to fetch users."}
        </div>
      )}
      {data?.items && <UserList users={data.items} onSelect={handleSelect} />}
    </div>
  );
};

export default App;
