# RF backend services
- Monorepo for all the backend services used to power [RF](https://github.com/Enkel-Digital/rf-portal)
- Scaffolded using [ClassExpress server](https://github.com/Enkel-Digital/class-server)

## Running the services
- Start the services individually
    - Enter the folders and use "npm run serve" or their respective start scripts.
- Use script to spin all of the services locally as a cluster, execute these in root
    - npm install
    - npm run serve:cluster
- Use docker compose to spin all of the services in docker containers
    - Run all the containers using "docker-compose up"
    - To build and run the images, use "docker-compose up --build"
    - To run only selected services, use "docker-compose up core" for example for the "core" service
- The commands in the services for docker are for pushing to gcr and running on gcp/cloud-run

## Repos and contents
- config.json
    - Bunch of configuration values that is used throughout the mono repo
    - Used more for documentation purposes then as a IaC module
- DB
    - main.dbml
        - dbml file for SQL schema definition of the main database
    - BillingService.dbml
        - dbml file for SQL schema definition of Billing Service's database
    - sql_management
        - Used to manage SQL databases used by any service
    - ce-sql
        - Wrapper library around knex to use within this monorepo to skip setting up knex everytime with defaults pre-injected already.
- api
    - The main API service for the portal and more. Built with typescript
- billing
    - Billing Service wraps around the strip service for core and partners services.
- error
    - Service used for error reporting and application monitoring.

## License, Author and Contributing
This project is made available under the ["AGPL License"](./LICENSE)  
If you have any questions, contact us via [email](mailto:tech@enkeldigital.com)  

Authors:
- [JJ](https://github.com/Jaimeloeuf)
- [ClassExpress server developers](https://github.com/Enkel-Digital/class-server#license-author-and-contributing)