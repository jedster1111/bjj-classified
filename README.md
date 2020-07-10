# BJJ Classified

Install dependencies.
```sh
yarn
```

## Running locally

### frontend

```sh
cd frontend
yarn start
```
The `frontend` project should open in a browser and refresh whenever you update a file.

### db-accessor

#### Neo4j

```sh
yarn start-supporting-services
```
**Note:** The above command relies on Docker running since it uses `docker-compose`.

The above command spins up a neo4j instance, with username `neo4j` and password `test`.

You can access the web interface at http://localhost:7474/
```
Connect URL: neo4j://127.0.0.1:7687
Authentication type: Username / Password
Username: neo4j
Password: test
```
![neo4j browser config example](docs/images/neo4j%20browser%20example.png)

#### YouTube Api

Rename `db-accessor/.env.template` to `db-accessor/.env` and replace the example value with a real YouTube api key.  
Follow https://developers.google.com/youtube/v3/getting-started for instructions on how to get an api key.

#### Db-accessor Service

```sh
cd db-accessor
```

Build and watch for changes:
```sh
yarn build:watch
```
Start the `db-accessor` service with:
```sh
yarn run:dev 
```
