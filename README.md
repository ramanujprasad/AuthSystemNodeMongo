## Auth Project:

This repository serves as an example of a basic Node.js application for Authentication System which is using  express as and a locally configured Mongo backend.
Authentication can either be Session-based or Token-based.Session-based authentication makes use of cookie stored in the user's browser in order to verify their identity after Login while Token-based authentication makes use of JSON Web Tokens(JWT) which is sent along with every request to verify the user's identity and this makes it stateless.

Below example is an based on session-based authentication

## Perquisites:

Reference: Download and run the instance of mongo DB

Step 1: Download the mongodb

Step 2: Follow normal setup instructions and install it.

Step 3: Create the following folder
C:\data\db

Step 4: 
cd to C:\Program Files (x86)\MongoDB\Server\3.0\bin>
enter command mongod
by default, mongodb server will start at port 27017

Once server started, navigate to http://localhost:27017/, you will get below message in browser

(It looks like you are trying to access MongoDB over HTTP on the native driver port.)

## Get started: Once a local mongo instance running.

```bash
# clone the repo
$ git clone https://github.com/ramanujprasad/AuthSystemNodeMongo.git

# change directory to our repo
cd AuthSystemNodeMongo

# install dependencies for the project with npm
npm install

# start the server (Navigate to `http://localhost:9000/`)
npm start

```

## How cookie looks like?

![Design Image](https://github.com/ramanujprasad/AuthSystemNodeMongo/blob/master/images/cookie_after_login.PNG)
