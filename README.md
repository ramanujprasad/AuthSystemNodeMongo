## Auth Project
==============

This repository serves as an example of a basic Node.js application for Authentication System which is using  express as and a locally configured Mongo backend.
Authentication can either be Session-based or Token-based.Session-based authentication makes use of cookie stored in the user's browser in order to verify their identity after Login while Token-based authentication makes use of JSON Web Tokens(JWT) which is sent along with every request to verify the user's identity and this makes it stateless.

Below example is an based on session-based authentication
## Perquisites
============

Reference: Download and run the instance of mongo DB

Step 1: Download the mongodb

Step 2: Follow normal setup instructions and install it.

Step 3: Create the following folder
C:\data\db

Step 4: 
cd to C:\Program Files (x86)\MongoDB\Server\3.0\bin>
enter command mongod
by default, mongodb server will start at port 27017

## Steps to run the app
=====================
Once a local mongo instance running.

* After cloning the repo, install the dependencies by running **npm install**
* To start the server, run **npm start** on the base directory


