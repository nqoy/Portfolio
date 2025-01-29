export enum GitHubQueryField {
  URL = "url",
  NAME = "name",
  CREATED_AT = "createdAt",
  UPDATED_AT = "updatedAt",
  IS_PRIVATE = "isPrivate",
  OWNER = "owner { login }",
  PARENT = "parent { name }",
  OPEN_ISSUES = "openIssues",
  FORKS_COUNT = "forksCount",
  DESCRIPTION = "description",
  LICENSE = "license { name }",
  LANGUAGE = "primaryLanguage",
  STARGAZERS_COUNT = "stargazersCount",
}

export enum SortOrder {
  ASC = "ASC",
  DESC = "DESC",
}
