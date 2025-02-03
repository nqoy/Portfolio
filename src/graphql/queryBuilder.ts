import { GitHubQuery } from "./gitHubQuery";
import { GitHubQueryField } from "./queryEnums";

const fieldMappings = {
  [GitHubQueryField.URL]: "url",
  [GitHubQueryField.NAME]: "name",
  [GitHubQueryField.DESCRIPTION]: "description",
  [GitHubQueryField.FORKS_COUNT]: "forkCount",
  [GitHubQueryField.CREATED_AT]: "createdAt",
  [GitHubQueryField.UPDATED_AT]: "updatedAt",
  [GitHubQueryField.OWNER]: { owner: ["login"] },
  [GitHubQueryField.IS_PRIVATE]: "isPrivate",
  [GitHubQueryField.LICENSE]: { licenseInfo: ["name"] },
  [GitHubQueryField.PARENT]: { parent: ["name"] },
  [GitHubQueryField.OPEN_ISSUES]: { issues: ["totalCount"] },
  [GitHubQueryField.STARGAZERS_COUNT]: "stargazerCount",
  [GitHubQueryField.LANGUAGE]: { primaryLanguage: ["name"] },
  [GitHubQueryField.LANGUAGES]: {
    languages: {
      first: 100,
      data: {
        edges: {
          size: null,
          node: ["name"],
        },
      },
    },
  },
};

export class QueryBuilder {
  static buildQuery(gitHubQuery: GitHubQuery): string {
    const fields = gitHubQuery
      .getFields()
      .map((field) => this.formatField(fieldMappings[field]))
      .join("\n");
    const orderByField = gitHubQuery.getOrderByKey();
    const orderByArgument = orderByField
      ? `, orderBy: { field: ${orderByField}, direction: ${gitHubQuery.getSortOrder()} }`
      : "";

    return `query {
      viewer {
        repositories(first: 100${orderByArgument}) {
          edges {
            node {
              ${fields}
            }
          }
        }
      }
    }`;
  }

  private static formatField(field: string | object): string {
    if (typeof field === "string") {
      return field;
    }
    if (Array.isArray(field)) {
      return field.join(" ");
    }
    if (field && typeof field === "object") {
      const nestParamStrings = ["node", "edges"];
      const amountParamStrings = ["first", "last"];

      return Object.entries(field)
        .map(([key, value]) => {
          if (amountParamStrings.includes(key)) {
            return `(${key}: ${value})`;
          }
          if (key === "data") {
            return `{\n${this.formatField(value)}\n}`;
          }
          if (value && typeof value === "object") {
            if (nestParamStrings.includes(key)) {
              return `${key} {\n${this.formatField(value)}\n}`;
            }
            const isWithAmountParams = Object.keys(value).some((nestedKey) =>
              amountParamStrings.includes(nestedKey)
            );
            if (isWithAmountParams) {
              return `${key}${this.formatField(value)}`;
            }
            return `${key} { ${this.formatField(value)} }`;
          }
          return `${key} ${value ? `{ ${this.formatField(value)} }` : ""}`;
        })
        .join(" ");
    }

    return "";
  }
}
