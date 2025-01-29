export enum GitHubQueryField {
  NAME = "name",
  DESCRIPTION = "description",
  STARGAZERS_COUNT = "stargazersCount",
  FORKS_COUNT = "forksCount",
  LANGUAGE = "primaryLanguage",
  CREATED_AT = "createdAt",
  UPDATED_AT = "updatedAt",
  OWNER = "owner { login }",
  IS_PRIVATE = "isPrivate",
  LICENSE = "license { name }",
  PARENT = "parent { name }",
  URL = "url",
  OPEN_ISSUES = "openIssues",
}

export enum SortOrder {
    ASC = "ASC",
    DESC = "DESC",
  }