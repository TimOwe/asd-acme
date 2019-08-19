# asd-acme
Advanced Software Development 41026 project consisting of 3 releases.

# Instructions
1. Install Node.js
2. Run `npm install`
3. Start the development server 'npm run serve'

- To build and deploy to firebase: `npm run deploy`

- Commiting to master branch on github will deploy via Codeship

- url: https://acme-asd.web.app/

- The backend database is visible on firebase.
- tim demo
- thai demo

# Boilerplate
Project is created using Vue Node.js library in tandem with the Vuetify material design component framework for views.
1. Created repository with default `.gitignore` for Node.js projects
2. Installed vue: `npm install -g @vue/cli`
3. Instantiate project in current directory: `vue create .`

# Release 0
Release 0 involves a DevOps pipeline with communication channels and a simple
CI/CD pipeline.

### Code flow management setup
Code is updated on developer devices and then pushed to each developer's branch for their feature
on the github repository.
For code to be merged into the master branch (which is deployed via CI/CD pipeline) it must first
be tested locally and then a pull request created.
After this is reviewed by at least one other
team member it may be merged.
### Communications
The GitHub repository was linked to our slack server. This allows the server to notify members of updates on the repository. This was configured by:
1. Adding the Github application to slack
2. Running the command `/github subscribe TimOwe/asd-acme` (Slack application must have relevant permissions on GitHub)

The CodeShip project was also linked to Slack:
1. Go to the notifications tab for the project
2. Click `New Notification` ands elect slack
3. Enter the branch name (`master`), copy the webhook URL and clicking `save`

### CI/CD
This project uses CodeShip for building and test running (configured on the master branch only) and
is then deployed onto the FireBase application via a custom deployment script within `package.json`.
The CI/CD pipeline was configured by:
1. Creating a codeship application with the default setup commands for Vue.js (`npm install`)
2. Adding a custom deployment script to deploy to firebase:
```
cd functions // change directory and install dependencies
npm i
cd .. // change back to original directory
npm run deploy // run deployment script
```
2. Installing firebase into the project: `npm install -g firebase-tools`
3. Initialising the project: `firebase init` (Only needs to be run once per project)
4. Running the command `firebase login:ci` to get an access token
5. Adding the deployment script which uses the token to deploy the project when run on CodeShip:
```
npm run build && firebase --token <token> && firebase deploy --token <token>
```

### Logging and monitoring
The firebase project was integrated with slack to enable monitoring of important system events. This process was:
1. Go to the integrations page of the firebase project
2. Click `install` on the slack button
3. On slack, create a new application, enable integrations and copy the webhook URL
4. Paste this webhook url into the firebase configuration page and select a channel and name for the integration

# Commands
Setup project: `npm install`

Compile and hot-reload for development: `npm run serve`

Compile and minify for production: `npm run build`

Run tests: `npm run test`

Lint and fix files: `npm run lint`