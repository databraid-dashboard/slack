[ ![Codeship Status for databraid-dashboard/slack-api](https://app.codeship.com/projects/623bb170-6021-0135-e845-2e6fa0f02ff3/status?branch=master)](https://app.codeship.com/projects/239348)

# Databraid Slack API

## Description

An Express server/router which serves as the backend for the Databraid Slack Widget.  This is used in conjunction with the Databraid Slack SPA.  It is built to run as a container within Docker.

The Databraid Slack API handles all interaction with Slack's Event API.  It authenticates with Slack during an OAuth sign-in.  It makes requests to the Slack Event API to fetch information about a Slack team's users and channels.  It interfaces with a PostgreSQL database to store and retrieve data. It interfaces with Google's Natural Language Processor API to perform sentiment analysis on the channel's content. It is also responsible for setting up a web socket and, once the Databraid Slack SPA connects with that socket, pushing new event and sentiment information to the client.

## Usage

There are a number of things that need to be in place prior to having this server function correctly.  You must:

- Have a __Slack team__ to which you hold administrative privileges.
- Set up a __Slack App__ at [api.slack.com](https://api.slack.com/) which listens for new events for that team and pushes these to the client.  You will also need to verify the server with the Slack App using the servers `/slack/events` endpoint.
- Get a __Google Account__ and license key for Google NLP API.
- If this is being run locally, you will need Docker installed.
- If this is being set up as a local development environment, you may also need to __expose your localhost__ and port using a tool such as [localtunnel](https://localtunnel.github.io/www/) or [ngrok](https://ngrok.com/download).

Once these are set up, you will need to do the following to run the API:

1. Create a `.env` file locally which will hold all of the variables needed to run
    - `GOOGLE_APPLICATION_CREDENTIALS`: The filepath to the service account file containing google's API credentials.  (e.g. "./google-credentials/service-account.json")
    - `SLACK_CLIENT_ID`: The client ID found in the _Basic Information_ section of the Slack App.
    - `SLACK_CLIENT_SECRET`: The client secret found in the _Basic Information_ section of the Slack App.
    - `SLACK_VERIFICATION_TOKEN`: The verification token found in the _Basic Information_ section of the Slack App.
    - `REDIRECT_URI`: This is the URI on this API built to handle the OAuth redirect.  It will be at `<your_domain>/slack/auth/redirect`
    - `DB_HOST`: Host for the PostgreSQL database instance being used.
    - `DB_PORT`: 5432
    - `DB_USERNAME`: "databraid"
    - `DB_PASSWORD`: your password for the database
    - `DB_NAME`: name of the database being used.
1. If this is local, start Docker.
1. In the slack-api directory, run `npm install` to get all the needed dependencies.
1. If this is local, start localtunnel or ngrok.
1. In a terminal window, navigate to your slack-api files and run `npm start`.
1. If you need to shutdown or restart the server, exit out of the running process and then run `npm run down` to stop the container.

Testing and linting can all be done respectively with:

```
npm test
npm run lint
```