# Personal Portfolio Website

## Tech Stack

### Frontend:
- **React** with **TypeScript**
- **Vite** for fast development and bundling

### Backend / Dynamic Data:
- **GraphQL** for fetching dynamic data (e.g., GitHub repositories)

### Deployment:
- Hosted on **Netlify**

## Features

- **Static Content**: Sections like About Me, Skills, etc., are static.
- **Dynamic Data**: Fetches project data (titles, descriptions, links) from external APIs using **GraphQL**.
- **Clean and Responsive Design**: The layout adapts to different screen sizes and devices.
- **Performance Optimization**: The website is optimized for fast performance with features like lazy loading and static site generation (SSG).

## GraphQL Query example
```graphql
query {
  viewer {
    repositories(first: 100, orderBy: { field: CREATED_AT, direction: ASC }) {
      edges {
        node {
          name
          languages(first: 10) {
            edges {
              size
              node {
                name
              }
            }
          }
        }
      }
    }
  }
}
