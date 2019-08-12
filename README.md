# asd-acme
Advanced Software Development 41026 project consisting of 3 releases.

# Boilerplate
Project is created using Vue Node.js library in tandem with the Vuetify material design component framework for views.
1. Created repository with default `.gitignore` for Node.js projects
2. Installed vue: `npm install -g @vue/cli`
3. Instantiate project in current directory: `vue create .`

# Release 0
Release 0 involves a DevOps pipeline with communication channels and a simple
CI/CD pipeline.

The GitHub repository was linked to our slack server. This was configured by:
1. Adding the Github application to slack
2. Running the command `/github subscribe TimOwe/asd-acme` (Slack application must have relevant permissions on GitHub)

This allows the server to notify members of updates on the repository.

The CI/CD pipeline was configured by:
1. install firebase-tools
2. firebase login
3. firebase init
4. build and firebase deploy


# Commands
Setup project: `npm install`

Compile and hot-reload for development: `npm run serve`

Compile and minify for production: `npm run build`

Run tests: `npm run test`

Lint and fix files: `npm run lint`