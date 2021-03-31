[![DOI](https://zenodo.org/badge/349752104.svg)](https://zenodo.org/badge/latestdoi/349752104) [![Netlify Status](https://api.netlify.com/api/v1/badges/608d28c1-597c-4437-9a68-d94077244ca4/deploy-status)](https://app.netlify.com/sites/nervous-payne-efa831/deploys)

# UKRN Open Research Resources Browser

## About

The [UK Reproducibility Network (UKRN)](https://ukrn.org/) is an organisation that promotes open research practices in the United Kingdom. 
As part of its operations, it maintains a list of open research resources.
These resources are listed in a Google Sheets document.
This Browser makes exploring, viewing, and filtering the resources easier.

## Local development

This project's dependencies are managed by npm. 
To get started, fork this repository and then navigate to the project directory and follow the instructions below:

### Project setup
To install the project dependencies run:
```
npm install
```

#### `.env` file
The project is powered by its connectivity to the Google Sheets API.
It therefore needs a `.env` file with the following keys:
* `GOOGLE_SPREADSHEET_ID_FROM_URL` - the URL of the Google Sheet to represent
* `GOOGLE_SERVICE_ACCOUNT_EMAIL` - the email of the [Google Service Account](https://cloud.google.com/iam/docs/service-accounts) responsible for the API calls
* `GOOGLE_PRIVATE_KEY` - the private key of the above for authorisation

#### Serve for local testing
Uses webpack compiling and supports hot-reloading of files.
```
npm run serve
```

#### Compiles and minifies for production
```
npm run build
```

#### Lints and fixes files
```
npm run lint
```

#### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Component Guides
The project is built on several core components.
If you run into difficulty with them, more information can be found at:
* [VueJS](https://vuejs.org/)
* [VueX](https://vuex.vuejs.org/)
* [Bulma](https://bulma.io/) / [Buefy](https://buefy.org/)
* [Google Sheets API](https://developers.google.com/sheets/api)
* [Netlify](https://docs.netlify.com/)

## License
This project is licensed under the [MIT license](https://github.com/UKRN-Open-Research/ukrn-open-research-resources/blob/master/LICENSE.txt).
