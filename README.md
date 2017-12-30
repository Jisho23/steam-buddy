 Steam Buddy is a simple app that takes two steam ID and compares libraries.
 This was a small project created to practice/implement a small express server
 and multiple promise fulfillment through Promise.all.

 To Run:

 1) In the folder with the server.js, run node server.js to start the express
 server.
 2) From the same folder, boot the react app using the command npm star.
 3) Make sure the routes for the express are point to the correct local
 host (by default I have the express loading localhost:4000).
 4) Get two steamIds and have fun!

 Note: GitIgnore has my API key hidden on my local, to run you will need to
 use your own. That constants.js looks like the following:

     function define(name, value) {
       Object.defineProperty(exports, name, {
         value: value,
         enumerable: true
       });
     }

     define("KEY", <MY KEY HERE>);

 I am using the chrome extension to allow-control-allow-origin * in order to
 talk between my two local hosts (one for the react frontend, one for the
   express backend). If you are having issues, please consider adding
   this extension.
