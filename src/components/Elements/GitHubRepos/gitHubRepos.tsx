import React, { useState, useEffect } from "react";
import { GitHubQueryField, SortOrder } from "../../../graphql/queryEnums";
import { GitHubQuery } from "../../../classes/gitHubQuery";
import { fetchGitHubData } from "../../../services/graphqlApi";
import { RepoData, RepoLanguages } from "../../../classes/repoData";

export const GitHubRepos: React.FC = () => {
  const [reposData, setReposData] = useState<{ [key: string]: RepoData }>({});
  const [languagesMap, setLanguagesMap] = useState<{ [key: string]: number }>(
    {}
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (Object.keys(reposData).length > 0) return; // Check if reposData is not empty

    const reposQuery = new GitHubQuery(
      [GitHubQueryField.NAME, GitHubQueryField.LANGUAGES],
      SortOrder.ASC,
      GitHubQueryField.CREATED_AT
    );

    const fetchData = async () => {
      try {
        const data = await fetchGitHubData(reposQuery);
        handleReposData(data.viewer.repositories.edges);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [reposData]);

  const handleReposData = (reposDataEdges: any) => {
    const reposMap: { [key: string]: RepoData } = {};
    const languagesMap: { [key: string]: number } = {};

    reposDataEdges.forEach((repoEdge: any) => {
      const repoNode = repoEdge.node;
      const languagesData = repoNode.languages;
      const languages: RepoLanguages[] = [];

      languagesData.edges.forEach((langEdge: any) => {
        const languageName = langEdge.node.name;
        if (languageName === "Jupyter Notebook") {
          return;
        }
        const languageSize = langEdge.size;

        languagesMap[languageName] =
          (languagesMap[languageName] || 0) + languageSize;
        languages.push(new RepoLanguages(languageName, languageSize));
      });

      if (languages.length > 0) {
        reposMap[repoNode.name] = new RepoData(repoNode.name, languages);
      }
    });

    setLanguagesMap(languagesMap);
    setReposData(reposMap);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>My Projects</h2>
      {Object.keys(reposData).length === 0 ? ( // Check if reposData is empty
        <p>No repositories found.</p>
      ) : (
        <ul>
          {Object.keys(reposData).map((repoName) => {
            const repo = reposData[repoName];
            return (
              <li key={repoName}>
                <strong>{repo.repoName}</strong>
                <ul>
                  {repo.languages.map((language, index) => (
                    <li key={index}>
                      {language.languageName} - Size: {language.size}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default GitHubRepos;
