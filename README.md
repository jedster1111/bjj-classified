# BJJ Classified

Install dependencies.
```sh
yarn
```

## Running locally

Build all TS in watch mode. This means updates to `bjj-common` will be reflected
in both the `frontend` and `db-accessor` projects.
```sh
yarn build-ts:watch
```

### frontend

```sh
cd frontend
yarn start
```
The `frontend` project should open in a browser and refresh whenever you update a file.

### db-accessor
```sh
yarn start-supporting-services
```
**Note:** The above command relies on Docker running since it uses `docker-compose`.

Spin up a neo4j instance, with username `neo4j` and password `test`.

You can access the web interface at http://localhost:7474/
```
Connect URL: neo4j://127.0.0.1:7687
Authentication type: Username / Password
Username: neo4j
Password: test
```
![neo4j browser config example](docs/images/neo4j%20browser%20example.png)

Start `db-accessor` service
```sh
cd db-accessor
yarn run:dev 
```
