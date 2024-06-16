# Grow Waco

## React/Node/MongoDb/Express

This project was designed to offer the city of Waco the opportunity to have a sort of public suggestion box to facilitate communication. As a secondary aim, it was intended to continue practicing MERN fluency.

Additionally, I learned:

- Sending authentication emails. A new frontier for me and a critical step for authentication.

- better server-side code and error checking

- react-table - A very different take on setting up a table in react, quite handy after the setup

- react-hot-toast - A new toast package for me and I loved it's simplicity; style-wise it worked with the aesthetic.

- RTK Query - The next stage of Redux and a bit neater than thunks, I enjoyed RTK and still have more to review

- I experimented with different svg properties and CSS combinations for a new look; balancing the seriousness of city governance but keeping it light enough to render it informal and inviting.

![Grow Waco home page](https://res.cloudinary.com/duysbh0j0/image/upload/v1718384342/iqpjsmvagyxcngfecjxx.png)

## Growing the Community and Networking

I experimented using a generic class for handling similar blocks of css in different pages using one class for many. I will create css variables/mixins to simplify the css further.

I also look forward to taking suggestions from users and adding features, like perhaps user photos, badges, or city feedback.

## Growing the Community and Networking

I like the idea of presenting ideas that could affect change; especially in my city. It also seems likely this will increase the odds of developing connections locally.

It features:

- Multi-users encouraged for idea generation

- Voting system to rank the popular suggestions

- RTK for reduced redundancy and updating data on the fly

- Legitimate authorization, email authentication, and HTML validation

- Images for plans uploadable through Cloudinary

- Stable performance through the MongoDb

## Content License

This blog content is licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.

## To run on your own machine:

Prerequisites:

Node.js and npm (or yarn): Ensure you have Node.js and either npm (Node Package Manager) or yarn installed on your system. You can download them from the official websites:
Node.js: https://nodejs.org/en
npm (included with Node.js installation)
yarn: https://yarnpkg.com/
Git version control (optional): While not strictly necessary, having Git installed allows you to clone the project from GitHub and manage your local copy. You can download it from: https://git-scm.com/downloads
Steps:

Clone the Repository:

Open a terminal window.

Navigate to the directory where you want to clone the project.

Use the git clone command followed by the URL of your GitHub repository. For example:

Bash
git clone https://github.com/your-username/your-repo-name.git
Use code with caution.
content_copy
Replace your-username with your GitHub username and your-repo-name with the actual name of your repository.

Install Dependencies:

Navigate to the cloned project directory using cd your-repo-name.

Install the project's dependencies using either npm install or yarn install:

Bash

`npm install # or yarn install`

This command will download all the necessary packages listed in your project's package.json file.

Start the Development Server (Optional):

If your project has a development server script defined in package.json (usually named start), you can run it to launch the application locally:

Bash

`npm start  # or yarn start`

This will typically start a development server that allows you to see the application running in your browser (usually at http://localhost:3000 or a similar address).

Additional Notes:

Environment Variables: This project uses environment variables, you might need to set your own before running it.

Fork the Repository: Instead of cloning, you can fork the repository on GitHub to create your own copy. This allows you to make changes and contribute back to the original project.
Pull Updates: Periodically pull updates from the original repository to keep your local copy in sync with the latest changes.
