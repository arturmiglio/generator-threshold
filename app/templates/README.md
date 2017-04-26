# <%= title %>

## Tools Needed
- [node.js](http://nodejs.org/)/[npm](https://npmjs.org/) (I suggest using [Homebrew](http://brew.sh/) to [install](http://madebyhoundstooth.com/blog/install-node-with-homebrew-on-os-x/) these)
- [Gulp](http://gulpjs.com/) (`npm install -g gulp`)

## Run
- `npm install`
- `gulp`

## Build
- `gulp build`

<% if(useFirebase) { %>## Deploy
- `gulp build --deploy` #to build and deploy to environment configured in <% if(useFirebase) { %> `.firebaserc` (to firebase project, check [here](https://firebase.google.com/docs/cli/#deployment) for more info) <% } else { %> `gulp/config.json` <% } %><% } %>
