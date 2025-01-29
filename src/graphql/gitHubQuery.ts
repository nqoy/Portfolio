import { GitHubQueryField, SortOrder } from "./queryEnums";

export class GitHubQuery {
  private fields: GitHubQueryField[];
  private sortOrder: SortOrder;
  private orderByField: GitHubQueryField | null = null;

  constructor(
    fields: GitHubQueryField[],
    sortOrder: SortOrder = SortOrder.DESC,
    orderByField: GitHubQueryField
  ) {
    this.fields = fields;
    this.sortOrder = sortOrder;
    this.orderByField = orderByField;
  }

  getFields(): GitHubQueryField[] {
    return this.fields;
  }

  getSortOrder(): SortOrder {
    return this.sortOrder;
  }

  getOrderByKey(): string | null {
    const entry = Object.entries(GitHubQueryField).find(([, val]) => val === this.orderByField);
    return entry ? entry[0] : null;
  }
}
