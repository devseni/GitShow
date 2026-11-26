import SearchBar from "./components/SearchBar";
import UserCard from "./components/UserCard";
import RepoList from "./components/RepoList";
import ErrorMessage from "./components/ErrorMessage";
import LoadingState from "./components/LoadingState";
import { useGithubUser } from "./hooks/useGithubUser";
import "./App.css";
import Logo from "./assets/logo.svg";

export default function App() {
  const { user, repos, loading, error, searchUser, reset } = useGithubUser();

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <div className="header-icon">
            <img
              src={Logo}
              alt="Logo"
              style={{ width: "30px", height: "30px" }}
            />
          </div>
          <h1 className="header-title">GitShow</h1>
        </header>

        <SearchBar onSearch={searchUser} loading={loading} />

        <main className="main-content">
          {loading && <LoadingState />}

          {error && !loading && (
            <ErrorMessage message={error} onRetry={reset} />
          )}

          {user && !loading && !error && (
            <>
              <UserCard user={user} />
              <RepoList repos={repos} />
            </>
          )}

          {!user && !loading && !error && (
            <div className="empty-state">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="empty-state-icon"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <p>Search for a GitHub user to get started</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
