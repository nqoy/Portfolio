export class RepoData {
    public repoName: string;
    public languages: RepoLanguages[] = []
  
    constructor(repoName: string, languages: RepoLanguages[]) {
      this.repoName = repoName;
      this.languages = languages;
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
  