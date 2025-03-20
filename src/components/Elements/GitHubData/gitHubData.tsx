import { useState, useEffect } from "react";
import {
  GitHubQueryField,
  SortOrder,
} from "../../../classes/graphql/queryEnums.ts";
import { GitHubQuery } from "../../../classes/gitHubQuery.ts";
import { FetchGitHubData } from "../../../services/graphqlApi.ts";
import { RepoData, RepoLanguages } from "../../../classes/repoData.ts";
import { Chart } from "../Chart/chart.tsx";
import { FadeInBox } from "../EffectBoxes/FadeInBox/fadeInBox.tsx";
import { ImageSlider } from "../ImageSlider/imageSlider.tsx";
import styles from "./gitHubData.module.css";

export const GitHubData = () => {
  const [reposData, setReposData] = useState<{ [key: string]: RepoData }>({});
  const [languagesMap, setLanguagesMap] = useState<Map<string, number>>(
    new Map()
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const excludedLanguages = ["Jupyter Notebook", "CSS", "HTML"];
  const excludedRepoSubNames = ["Ex", "demo", "Project"];
  const nameExcludeRegex = new RegExp(excludedRepoSubNames.join("|"), "i");

  useEffect(() => {
    if (Object.keys(reposData).length > 0) return;

    const reposQuery = new GitHubQuery(
      [
        GitHubQueryField.NAME,
        GitHubQueryField.URL,
        GitHubQueryField.LANGUAGES,
        GitHubQueryField.IS_PRIVATE,
      ],
      SortOrder.ASC,
      GitHubQueryField.CREATED_AT
    );

    const fetchData = async () => {
      try {
        const data = await FetchGitHubData(reposQuery);
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
      const isExcluded =
        repoNode.isPrivate ||
        nameExcludeRegex.test(repoNode.name) ||
        languagesData.edges.length == 0;

      if (isExcluded) {
        return;
      }
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
        reposMap[repoNode.name] = new RepoData(
          repoNode.name,
          repoNode.url,
          languages
        );
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

  if (!loading && error) {
    return <div>Error: {error}</div>;
  }

  if (!loading && Object.keys(reposData).length === 0) {
    return <div>No repositories found.</div>;
  }

  return (
    <section id="projects">
      <FadeInBox className={styles.projectsContainer}>
        <h1>Projects</h1>
        <div className={styles.gitHubData}>
          <Chart
            chartType="doughnut"
            labels={Array.from(languagesMap?.keys() || [])}
            labelValues={Array.from(languagesMap?.values() || [])}
          />
          <ul>
            <div className={styles.reposContainer}>
              {Object.keys(reposData).map((repoName) => {
                const repo = reposData[repoName];
                return (
                  <li className={styles.repo} key={repoName}>
                    <strong>
                      <a
                        href={repo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {repo.repoName}
                      </a>
                    </strong>
                  </li>
                );
              })}
            </div>
          </ul>
        </div>
        <ImageSlider totalImages={10} />
      </FadeInBox>
    </section>
  );
};
