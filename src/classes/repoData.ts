export class RepoData {
  public repoName: string;
  public url: string;
  public languages: RepoLanguages[] = [];


  constructor(repoName: string, url: string, languages: RepoLanguages[]) {
    this.repoName = repoName;
    this.languages = languages;
    this.url = url;
  }
}

export class RepoLanguages {
  public languageName: string;
  public size: number;

  constructor(languageName: string, size: number) {
    this.languageName = languageName;
    this.size = size;
  }
}
