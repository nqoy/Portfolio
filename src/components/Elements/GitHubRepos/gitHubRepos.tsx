import React, { useState, useEffect } from "react";
import { GitHubQueryField, SortOrder } from "../../../graphql/queryEnums";
import { GitHubQuery } from "../../../graphql/gitHubQuery";
import { fetchGitHubData } from "../../../services/graphqlApi";

export const GitHubRepos: React.FC = () => {
  const [repos, setRepos] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (repos.length > 0) return;

    const reposQuery = new GitHubQuery(
      [GitHubQueryField.NAME, GitHubQueryField.LANGUAGE],
      SortOrder.ASC,
      GitHubQueryField.CREATED_AT
    );

    const fetchData = async () => {
      try {
        const data = await fetchGitHubData(reposQuery);
        setRepos(data.viewer.repositories.edges);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [repos]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Your Repositories</h2>
      {repos.length === 0 ? (
        <p>No repositories found.</p>
      ) : (
        <ul>
          {repos.map((repo) => (
            <li key={repo.node.name}>
              <strong>{repo.node.name}</strong>
              {repo.node.primaryLanguage && (
                <span> - Language: {repo.node.primaryLanguage.name}</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GitHubRepos;
