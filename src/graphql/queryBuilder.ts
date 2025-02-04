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
      first: 10,
      data: {
        edges: {
          size: null,
          node: ["name"],
        },
      },
    },
  },
};
const nestParams = { node: true, edges: true };
const amountParams = { first: true, last: true };

export class QueryBuilder {
  static buildQuery(gitHubQuery: GitHubQuery): string {
    const structuredFields = gitHubQuery
      .getFields()
      .map((field) => this.formatField(fieldMappings[field]))
      .join(",\n");
    const orderByField = gitHubQuery.getOrderByKey();
    const orderByArgument = orderByField
      ? `, orderBy: { field: ${orderByField}, direction: ${gitHubQuery.getSortOrder()} }`
      : "";

    return `query {
      viewer {
        repositories(first: 100${orderByArgument}) {
          edges {
            node {
              ${structuredFields}
            }
          }
        }
      }
    }`;
  }

  private static formatField(field: string | object): string {
    if (typeof field === "string") return field;
    if (Array.isArray(field)) return field.join(" ");
    if (!field || typeof field !== "object") return "";

    return Object.entries(field)
      .map(([currentField, fieldValue], index, array) => {
        let result = "";

        switch (true) {
          case currentField in amountParams:
            result = `(${currentField}: ${fieldValue})`;
            break;

          case currentField === "data":
            result = `{\n${this.formatField(fieldValue)}\n}`;
            break;

          case fieldValue && typeof fieldValue === "object": {
            if (currentField in nestParams) {
              result = `${currentField} {\n${this.formatField(fieldValue)}\n}`;
            } else {
              const isWithAmountParams = Object.keys(fieldValue).some(
                (nestedKey) => nestedKey in amountParams
              );
              result = isWithAmountParams
                ? `${currentField}${this.formatField(fieldValue)}`
                : `${currentField} { ${this.formatField(fieldValue)} }`;
            }
            break;
          }

          default:
            result = `${currentField} ${
              fieldValue ? `{ ${this.formatField(fieldValue)} }` : ""
            }`;
            break;
        }
        const isLastField = index === array.length - 1;

        return `${result}${isLastField ? "" : ","}`;
      })
      .join(" ");
  }
}
