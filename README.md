# STC-Play Monorepo

## What is this repository for?

This is the version 3 for stc play Web and Mobile application. Written in TypeScript & React Native.

This is a monorepo approach that includes:

- FE-WEB - for Web
- FE-MOBILE - for Mobile
- FE-API - for BFF using GraphQL
- libs - for common components for Web & Mobile
  - assets
  - data access - GraphQL mutations & queries
  - helper
  - hooks
  - language
  - model
  - store
  - themes

**Branching Strategy**

- develop - development branch
- stage - uat branch
- preprod (inactive)
- prod (inactive)

* feature/ticket-number
* bugfix/ticket-number
* hotfix/ticket-number
* chore/ticket-number

## New to React/React Native?

See the following useful documentation:

- ReactNative Docs https://reactnative.dev/
- React Docs https://reactjs.org/

## Nx Monorepo

See the following useful documentation:

- Nx Monorepo https://nx.dev/

* Nx is a smart, fast and extensible build system with first class monorepo support and powerful integrations.

## How do I get setup?

These instructions assume you are using a Mac for development purposes.

- Install [Homebrew](https://brew.sh/) `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`
- **Required:** Update to macOS Monterey. This is needed to run the latest versions of XCode & latest iOS SDKs (required to build iOS apps)
- **Required:** Install [Node Version Manager](https://github.com/nvm-sh/nvm)
- **Required:** Install [Watchman](https://facebook.github.io/watchman/) via `brew install watchman` to monitor files for changes.
- **Required:** Create an [Apple ID](https://appleid.apple.com/) (doesn't matter if personal or work) & and login.
- **Required:** Go to https://xcodereleases.com/ and download 14.2 Xcode (~10GBs)
  - When you unzip the file, it will take some time (~30 mins). Drag that into the `Applications` folder & when you open it for the first time it will take ~5mins.
- **Required:** Install Xcode Command Line Tools with `xcode-select --install` for additional development tools.
- **Required:** Android Setup: Please follow the guide here: https://reactnative.dev/docs/environment-setup and select `React-native CLI`, `macOS` and `Android` and follow the steps below it.
- **Required:** Install npm install -g nx (For Nx global command)

## Suggested Version of IDEs and other plugins

- NVM : 0.39.1
- Node: v19.7.0
- Xcode: 14.2
- Android Studio: Electric Eel | 2022.1.1 Patch 2
- Postman: 9.31.0

## Run Mobile

- Run `npm run ios` for IOS.
- Run `npm run android` for Android.

### Run and Build using different Environment in Mobile

- You need to change the environment variable located in `apps/fe-mobile/.env` to your desire environment. The default is development
  - `NX_APP_ENVIRONMENT=localhost`
  - `NX_APP_ENVIRONMENT=development`
  - `NX_APP_ENVIRONMENT=staging`
  - `NX_APP_ENVIRONMENT=production`


### Pipeline Build
 - In the future if we want to use the pipeline to upload the apk or ipa, we can use the other .env files for the specific environment. Just replace the .env file with your desire environment. Example `.env.dev, .env.stg .env.prod`


### Build Android

- Run `npm run clean:android` to clean android cache
- Run `npm run build:android` to generate apk file.
- Run `npm run build:android:prod` to generate aab file.

IMPORTANT: Step 1 should be run first before running step 2 or 3.

### Build iOS
 - You can build using xcode to generate .ipa file and directly upload it in testflight 
 - Or Run `npm run build:ios:release to generate .ipa file`
   - (https://nx.dev/packages/react-native/executors/build-ios)

## Run Web

Run `npm start fe-web` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Run Web on different Environment

- Run `npm run web:dev` for a DEV server
- Run `npm run web:stage` for a STAGE server
- Run `npm run web:prod` for a PROD server

## Build Web

Run `npx nx build fe-web`


## Deployment on Web

### Develop Environment

- **FE-WEB** https://develop.d24svb28mimwq7.amplifyapp.com/
  - Environment variables should be configured in Amplify based `.dev.env` file
  - Run `npm start fe-web`
- **FE-API** https://api-bff-dev.stcplay.gg/graphql
  Run `npm run dev-api`

### Stage Environment

- **FE-WEB** https://stage.djabyy7irs319.amplifyapp.com/

  - Environment variables should be configured in Amplify based `.stage.env` file
  - Run `npm start fe-web`

- **FE-API** https://api-bff-stg.stcplay.gg/graphql
  Run `npm run stag-api`

## Understand this workspace

Run `npm nx graph` to see a diagram of the dependencies of the projects.

### Recommended Tooling:

- [Visual Studio Code] (https://code.visualstudio.com/)
- [Postman] (https://www.postman.com/)
- [iTerm2](https://iterm2.com/) with zsh (default shell in newer macOS) with [additional plugins like git](https://github.com/ohmyzsh/ohmyzsh)

## Plugins for Visual Studio

- [ESLint] (Integrates ESList JavaScript into VS Code)
- [Git History] (Visualize code authorship, View git log, history etc.) - GitKraken
- [GraphQL] (adds syntax highlighting, validation, and language feature etc.) - Orsen Kucher
- [Jest Runner] (Simple way to run or debug a single (or multiple) tests from context-menu) - firsttris
- [Prettier] - (Code formatter) - Prettier
- [Prettier ESLint] - (Format Javascript and Typescript code using prettier-eslint) - Rebecca Vest

## Commands for creating helpers, store, commons etc. under libs

- nx generate @nrwl/react:lib or npx nx generate @nrwl/react:lib
- example: nx generate @nrwl/react:lib helpers

## Add Store slice in libs/store/src/lib/

- After adding slice file under `libs/store/src/lib/` you need to import it to index.ts (libs/store/src/lib/index.ts)
  - Example: `export * from './lib/appStateSlice/appStateSlice.tsx'`
- Then include the state or slice in configureStore function
  - Example: reducer: { user: userSlice.reducer },

## How to run unit testing

- Run `npx nx test fe-mobile` for mobile unit testing
- Run `npx nx test fe-mobile -u` for snapshots to be updated


## How to run E2E

-

## M1 support - additional setup

These instructions are for Macbooks with M1 chip

To Build the App run the following commands and once the metro starts, you will have the options to run on iOS or android

`npm start`

- i - run on the iOS simulator
- a - run on the android emulator

### For iOS:

- In fe-mobile/iOS/podfile add the following at the top of the files: `require_relative '../node_modules/react-native/scripts/react_native_pods’`
- And add inside the block react_native_post_install the following: `react_native_path = "../../../node_modules/react-native",`

For additional issues while trying to build the app use the following commands:

- npm install @nrwl/react-native --save-dev
- arch -arm64 npm i @nrwl/nx-darwin-arm64

### For Android:

If SDK not found during build follow these steps:

- Create files inside the android folder “local.properties”
- Add the following inside the file `sdk.dir = /Users/@USER/Library/Android/sdk`

### General:

If watchman causes an error use the following commands in terminal

- watchman watch-del-all
- watchman shutdown-server

## Libraries

### Icons

### Translations

`import { translate } from '@fe-monorepo/helper';`

`translate(key)`

### Validators

### Hooks

- useCountdown - Allows you to manipulate calculation of timer for easy rendering and without doing same logic in repitition. See below properties.
  `import {  useCountdown } from '@fe-monorepo/hooks';`
  `const { remainingTime, formattedTime, setNewTime, resetTime, stopTimer } = useCountdown(60);`
  - remainingTime - Return the numerical time remaining as seconds.
  - formattedTime - Return the formatted time as HH:MM:SS
  - setNewTime - This is use to set new timer. `setNewTime(newTime:number)`
  - resetTime - This is use to reset the time into its initial value. `resetTime()`
  - stopTimer - This is use to stop timer. `stopTimer()`

### Functions

- replaceStringsFromJson - Allows you to change specific key in string and return its new value. See below sample of usage.
  `import { replaceStringsFromJson } from '@fe-monorepo/helper';`
  `const name = "Mobile John [lastname]"`
  `replaceStringsFromJson(name, [{ '[lastname]': "Doe" }])`

### Themes

- To use dynamic styling, first declare specific style needed for dark/light/custom in globalStyle can be found under libgs/theme/src/globralStyle.
  USAGE:
  - Import all the needed dependencies.
    `import { useSelector } from 'react-redux';`
    `import { RootState } from '@fe-monorepo/store';`
    `import { getStyle } from '@fe-monorepo/themes';`
  - Declaring the state for themes
    `const {themes} = useSelector((state: RootState) => state.app);`
  - Place the getStyle helper to get the style for specific theme. Example style property of an element below.
    For Web.
    `<div style={{backgroundColor:getStyle(themes).backgroundColor}}> </div>`
    or for Mobile
    `<View style={{backgroundColor:getStyle(themes).backgroundColor}}> </View>`

## How-To

### Create new graphql queries

1. Create Queries

   - Add query under `libs/data-access/src/graphql/queries`
   - First you need to `import apollo client (@apollo/client)`.

   Sample query:

   ```
   import { gql } from '@apollo/client';
   export const GEO_QUERY = { // Constant variable
     getAllCountries: gql` // Name of the query, you will be able to see it when you import it in postman
       query fetchAllCountries { // Name of the query function, this is the one that you need to use in your custom hooks. Example: useLazyQuery(GEO_QUERY.getAllCountries, { errorPolicy: 'all' });
         countries { // Name of the query in resolver. Example: @Query('countries')
           error_msg,
           error_code,
           is_successful,
           data {
             name,
             country_code_iso_2,
             country_code_iso_3,
             phone_code_iso,
             phone_number_length,
             is_otp_required
           }
         }
       }
     `
   };
   ```

2. Create Mutations

   - Add query under `libs/data-access/src/graphql/mutations`
     - Example: `libs/data-access/src/graphql/mutations/user.mutation.ts`
   - First you need to `import apollo client (@apollo/client)`.

   Sample mutation:

   - export const OTP_MUTATION = { // Constant variable
   - verifyOTP: gql` // Name of the mutation, you will be able to see it when you import it in postman
   - mutation verifyOTP($details: OtpInput) { // Name of the mutation function, this is the one that you need to use in your custom hooks

   Example:

   ```
   useMutation<VerifiedOtpResponse, OtpParams>( OTP_MUTATION.verifyOTP, ...
    verifyOTP(details: $details) { // Name of the mutation in resolver. Example: @Mutation('verifyOTP')
     error_msg,
     is_successful,
     error_code,
     data
     {
       token
     }
    }
   }
   ```

3. Add in `lib/data-access/src/index.ts`

- See the following useful documentation:
- https://graphql.org/

## GRAPHQL BFF (fe-api)

- The project is in TypeScript and as such all source code files should be in TypeScript.
- Uses Nestjs a progressive Nodejs framework
- Folder structures:

  - `fe-api/src/main.ts`: Entry point of the Application.

    - You can enable or disable the GRAPHQL playground here
    - Enable CORS
    - Change port `process.env.PORT || 3333`

  - `fe-api/src/main.ts`: Entry point of the Application
  - `fe-api/src/app/common`: It consists of API's endpoints, common header, error response and data response
  - `fe-api/src/app/modules/../.service.ts`: The service for the underlying APIs. In some Apollo GraphQL documentation, you may see `DataSources` which is the same thing but this is far simpler.
  - Example: `fe-api/src/app/modules/cms/category/category.service.ts`

  - `fe-api/src/app/modules/../.resolver.ts`: The resolvers for the queries & mutations
  - Example: `fe-api/src/app/modules/cms/category/category.resolver.ts`

  - `fe-api/src/app/modules/../.module.ts`: The custom module where you should declare the custom service and resolver
  - Example: `fe-api/src/app/modules/cms/category/category.module.ts`

    - `fe-api/src/app/typeDefs`: The type definitions for the data types, queries & muntations

  - Example: `fe-api/src/app/typeDefs/account.ts`

  - `fe-api/src/app/modules/../product.gql`: The gql where you can declare the queries & mutations

    - Example: Query
      - type Query {
        - getGlobalSearch(details: SearchInput): GlobalSearchResponse
      - }
    - Example: Mutation
      - type Mutation {
        - saveSearchHistory(details: SearchInput): SearchHistoryResponse,
      - }

  - `fe-api/src/app/app.controller.ts`: Common app controller
  - `fe-api/src/app/app.controller.ts`: Common app service
  - `fe-api/src/app/app.modules.ts`: Common app module, where you should declare the services, custom modules, controllers etc.

### Run API and GraphQL Playground

Run `npm start fe-api` for api and graphql playground. Navigate to http://localhost:3333/api and http://localhost:3333/graphql.

### Run API and GraphQL on different Environment

- Run `npm run dev-api` for a DEV server
- Run `npm run stag-api` for a STAGE server
- Run `npm run prod-api` for a PROD server

### Add Headers

- Add the ff. headers to test the graphql

  ```
  {
  "content-type": "application/json",
  "Access-Control-Allow-Credentials": "true",
  "x-api-token": "2fd7e137b5466ebd9cd6e183221ce3e5ee80c32af",
  "x-api-version": "115",
  "x-api-lang": "en",
  "x-api-key": "yqjouAgiad1NsUrLV2ZsW6qhjWHnVcqf75CDoMkU",
  "x-api-endpoint": "android",
  "Authorization": "eyJraWQiOiJ2YnVxOVZXS0Rxck5MUXplSTZVWFpSNitoOVQyYWpBZkZLWHlOZXZaNVhZPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI0NXBtY2VrNmk2Y201MXU5a2wwbDJwYTI5ZyIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoic3RjcGxheVwvcmVhZCIsImF1dGhfdGltZSI6MTY4MzEyNDY5NCwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLm1lLXNvdXRoLTEuYW1hem9uYXdzLmNvbVwvbWUtc291dGgtMV9JaU8zaUpkUk8iLCJleHAiOjE2ODMyMTEwOTQsImlhdCI6MTY4MzEyNDY5NCwidmVyc2lvbiI6MiwianRpIjoiY2ZlNGM0MTAtODE4OC00ZWMxLWIxMTAtMzYyYjBjZTM0YTRkIiwiY2xpZW50X2lkIjoiNDVwbWNlazZpNmNtNTF1OWtsMGwycGEyOWcifQ.O6txB_AK3LiA0PAW75l-dUN3ZGQcexwfgAHz_3TlFB-5rUGLTQLwHOWrapOuvFy2cxNXYAolrvTXQ7qSHmaQ31ukBOFHGwcGueeGdv7i67wduuGmtUAY4dQYMhiVo_yJiTodGZy4zOf0lSWemclNN8ccw1UhTz6uMXqtC1Kj_PBXJWcRcItZTlCKWg9gcNtZlnX39uor9RtJbQSikOoynqBoIon_9i1jNwcg11mjsQteHrFroADz_4-9puKjIr5GVsKNJxr6WQ_pv1DCrZp0QnR2njzeZ-zk4dHn4aEsJwDMZ0Ol1iMOJM-09savN_mhfrnDgojWT_0QXdRyCLS6Qw"
  }

  `x-api-token`: This is the generated token that comes from the successful logged-in user.
  `x-api-version`: App version
  `x-api-lang`: Language AR or EN
  `x-api-key`: This is based on the environment key
  `x-api-endpoint`: Endpoint example: web, android and ios
  `Authorization`: This is from `https://api-dev.stcplay.gg/v3/OAuth/token` api
  ```

- See the following useful documentation:
  - https://nestjs.com/
  - https://nx.dev/packages/nest
  - https://graphql.org/


### Troubleshooting GRAPHQL BFF
  - If you're encountering problem like no response in GraphQL please make sure that the port is running in your localhost (http://localhost:3333/graphql), or if the problem is in the staging or development env please make sure that the GraphQL is successfully running in the server after your code commit or merged. Contact AWS team if you encountered any issues on the pipeline. 


## Repo is React Native Web ready

What is react native web?

- It enables reactJS to read and use react native exclusive components and APIs

How to create a component for both mobile and web platforms?

- You can check created example components in libs/components/button/Button.tsx or libs/components/switch/Switch.tsx

How to use it on a reactJS page?

- You can check created example components in fe-web/src/app/pages/Page404.tsx for the implementation.

How to modify the component props?

- To modify styles or component props kindly see below steps.

1.  Add a type which you want to add. (If type is not existing in the curent component creation).
2.  Pass value of style to the component from the screen which you used the component.

IMPORTANT NOTE: If some react native libraries may not work or recognize by the reactJS during the component creation, we need to manually add and configure it in the fe-web's webpack.config

## Algolia Mobile POC
- For Algolia Mobile POC we used `stcplay` index name to get the specific data from algolia
- We also used `react-instantsearch-native` library to customize the search component of the app. This is the suggested library of algolia for react-native.  
- Please see the branch below for Aloglia Mobile POC
   - (https://github.com/STC-Play/FE-MONOREPO/tree/tech/STCACNMOB-178-POC-for-Algolia-autocomplete)    
- Please navigate to `apps/fe-mobile/src/app/screens/search/component/Active.tsx` to see the sample code 

- See the following useful documentation:
   - https://www.algolia.com/doc/guides/building-search-ui/going-further/native/react/
   - https://www.npmjs.com/package/react-instantsearch-native 
   - https://github.com/algolia/algoliasearch-client-javascript#readme