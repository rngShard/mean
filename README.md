# Welcome to the mean stack (own boilerplate app)

The mean stack is intended to provide a simple and fun starting point for cloud native fullstack javascript applications.   
MEAN is a set of Open Source components that together, provide an end-to-end framework for building dynamic web applications; starting from the top (code running in the browser) to the bottom (database). The stack is made up of:

- **M**ongoDB : Document database – used by your back-end application to store its data as JSON (JavaScript Object Notation) documents
- **E**xpress (sometimes referred to as Express.js): Back-end web application framework running on top of Node.js
- **A**ngular (formerly Angular.js): Front-end web app framework; runs your JavaScript code in the user's browser, allowing your application UI to be dynamic
- **N**ode.js : JavaScript runtime environment – lets you implement your application back-end in JavaScript


## Boilerplate Featureset

This boilerpalte packs ootb functionality of

- User-management
  - deployment-script automatically generates 2 default system-users (admin- + test-user)
  - incorporated role-management (predefined roles: _verified_, _trusted_, _admin_, _system_)
- Internationalized (via Angular) to support multiple languages
  - extraction & merging of i18n-strings automated via npm script
  - predefined languages: _en_, _de_ (default = en)


## Setup

This includes requirements, installation & deploy.

### Pre-requisites
* git - [Installation guide](https://www.linode.com/docs/development/version-control/how-to-install-git-on-linux-mac-and-windows/) .  
* node.js - [Download page](https://nodejs.org/en/download/) .  
* npm - comes with node or download yarn - [Download page](https://yarnpkg.com/lang/en/docs/install) .  
* mongodb - [Download page](https://www.mongodb.com/download-center/community) .  

### Installation 
``` bash
git clone https://github.com/rngShard/mean.git
cd mean
npm install
cp .env.example .env  # then adjust config params
node setupUtils/createSystemUsers.js  # to create initial System-User accounts
```
Initial system accounts have login credentials of admin@system.com & test@system.com with passwords as specified in the _.env_-file. 
For development, continue with
```bash
npm start
```
where as production requires
```bash
npm run-script deploy
``` 

### Deployment
For linux-based systems, [PM2](http://pm2.keymetrics.io/) can be nciely used to deploy & monitor node applications as services.
For Windows-Server, one may consider [NSSM](https://nssm.cc/) to deploy the Node-Executable linked to `server/index.js`.


## Credits 

- The MEAN name was coined by Valeri Karpov.
- Initial concept and development was done by Amos Haviv and sponsered by Linnovate.
- Inspired by the great work of Madhusudhan Srinivasa.
