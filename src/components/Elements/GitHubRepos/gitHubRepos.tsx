import React, { useState, useEffect } from "react";
import { GitHubQueryField, SortOrder } from "../../../graphql/queryEnums";
import { GitHubQuery } from "../../../classes/gitHubQuery";
import { fetchGitHubData } from "../../../services/graphqlApi";
import { RepoData, RepoLanguages } from "../../../classes/repoData";
import { Chart } from "../Chart/Chart"; // Adjust import path

export const GitHubRepos: React.FC = () => {
  const [reposData, setReposData] = useState<{ [key: string]: RepoData }>({});
  const [languagesMap, setLanguagesMap] = useState<Map<string, number>>(
    new Map()
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const excludedLanguages = ["Jupyter Notebook", "CSS", "HTML"];

  useEffect(() => {
    if (Object.keys(reposData).length > 0) return;

    const reposQuery = new GitHubQuery(
      [GitHubQueryField.NAME, GitHubQueryField.LANGUAGES],
      SortOrder.ASC,
      GitHubQueryField.CREATED_AT
    );

    const fetchData = async () => {
      try {
        const data = await fetchGitHubData(reposQuery);
        handleReposFetchData(data.viewer.repositories.edges);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [reposData]);

  const handleReposFetchData = (reposDataEdges: any) => {
    const reposMap: { [key: string]: RepoData } = {};
    const languagesMapping = new Map<string, number>();

    reposDataEdges.forEach((repoEdge: any) => {
      const repoNode = repoEdge.node;
      const languagesData = repoNode.languages;
      const languages: RepoLanguages[] = [];

      languagesData.edges.forEach((langEdge: any) => {
        const languageName = langEdge.node.name;
        if (excludedLanguages.includes(languageName)) {
          return;
        }
        const languageSize = langEdge.size;

        languagesMapping.set(
          languageName,
          (languagesMapping.get(languageName) || 0) + languageSize
        );
        languages.push(new RepoLanguages(languageName, languageSize));
      });

      if (languages.length > 0) {
        reposMap[repoNode.name] = new RepoData(repoNode.name, languages);
      }
    });
    const sortedLanguages = new Map(
      [...languagesMapping.entries()]
        .sort(([, a], [, b]) => b - a)
        .filter(([, value]) => value >= 1000)
    );

    setLanguagesMap(sortedLanguages);
    setReposData(reposMap);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (Object.keys(reposData).length === 0) {
    return <div>No repositories found.</div>;
  }

  return (
    <div>
      <Chart
        title="Used Languages"
        chartType="doughnut"
        labels={Array.from(languagesMap?.keys() || [])}
        labelValues={Array.from(languagesMap?.values() || [])}
      />
      <ul>
        <h2>My Projects</h2>
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
          )
        })}
      </ul>
    </div>
  );
};

export default GitHubRepos;
