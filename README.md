# BJJ Classified

## Local development
```sh
yarn start-supporting-services
```
Spin up a neo4j instance, with username `neo4j` and password `test`.

You can access the web interface at http://localhost:7474/

Connect to your database:
```
Connect URL: neo4j://127.0.0.1:7687
Authentication type: Username / Password
Username: neo4j
Password: test
```
![neo4j browser config example](docs/images/neo4j%20browser%20example.png)

Start backend service
```sh
yarn

# terminal 1
cd db-accessor
yarn build:watch

# terminal 2
cd dn-accessor
yarn run:dev 
```
