# Personal Portfolio Website 🖼️

This is a personal portfolio website with an OOP orientation.<br/>
Dynamically fetches GitHub project data using **GraphQL** to showcase public projects.

## Summary:
A **clean** and **responsive** personal portfolio website designed to showcase projects, experience, and any other relevant content in an **easy-to-read**, **visually appealing** layout. 🎨<br/>
Static content (About Me, Skills, etc.) is combined with dynamic project data fetched from GitHub via GraphQL.

## My Live Portfolio 🌐:
Check out the live version of the portfolio website here: [Noy Benbenishty's Portfolio](https://noybenbenishty.netlify.app/)

## Build & Run ⚙️:
1. Clone the project repository from Git: `git clone <git-repository-url>` or using GitHub CLI.
2. Set up a React project with TypeScript (e.g., `npx create-react-app my-app --template typescript`).
3. Create GitHub token for usage & use in the `.env` file 🔑.
4. Install dependencies:  `npm install` or `yarn install` 🚀.
5. Integrate **GraphQL** to fetch GitHub data and customize the needed queries with the query builder class 📊.
6. Design and build reusable React components to display projects 🛠️.
7. Deploy to a static hosting platform (e.g., **Netlify**) 🌍.

## Tech Stack 💻:
- **Frontend**: Built with **React** ⚛️ and **TypeScript** 📝 using **Vite** ⚡️ for fast development and bundling.
- **GraphQL**: Dynamically fetch project data (e.g., GitHub repositories). A query builder is used to structure and send GraphQL queries to the GitHub API to retrieve project data like titles, descriptions, and links. 🔗
- **Deployment**: Netlify (for static site hosting) 🌍

## GraphQL Query Example :
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
