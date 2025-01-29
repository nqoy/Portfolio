import { GitHubQueryFields, SortOrder } from './queryEnums';

export class GitHubQuery {
  private fields: GitHubQueryFields[];
  private sortOrder: SortOrder;

  constructor(fields: GitHubQueryFields[], sortOrder: SortOrder = SortOrder.DESC) {
    this.fields = fields;
    this.sortOrder = sortOrder;
  }

  // Getter methods for fields and sortOrder
  getFields(): GitHubQueryFields[] {
    return this.fields;
  }

  getSortOrder(): SortOrder {
    return this.sortOrder;
  }
}
