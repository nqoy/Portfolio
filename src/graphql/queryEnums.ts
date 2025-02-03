export enum GitHubQueryField {
  URL = "url",
  NAME = "name",
  CREATED_AT = "createdAt",
  UPDATED_AT = "updatedAt",
  IS_PRIVATE = "isPrivate",
  OWNER = "owner { login }",
  PARENT = "parent { name }",
  OPEN_ISSUES = "issues { totalCount }",
  FORKS_COUNT = "forkCount",
  DESCRIPTION = "description",
  LICENSE = "licenseInfo { name }",
  LANGUAGE = "primaryLanguage { name }",
  STARGAZERS_COUNT = "stargazerCount",
  LANGUAGES = "languages"
}

export enum SortOrder {
  ASC = "ASC",
  DESC = "DESC",
}
