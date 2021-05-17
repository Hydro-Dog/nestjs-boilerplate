<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[travis-image]: https://api.travis-ci.org/nestjs/nest.svg?branch=master
[travis-url]: https://travis-ci.org/nestjs/nest
[linux-image]: https://img.shields.io/travis/nestjs/nest/master.svg?label=linux
[linux-url]: https://travis-ci.org/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="blank">Node.js</a> framework for building efficient and scalable server-side applications, heavily inspired by <a href="https://angular.io" target="blank">Angular</a>.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/dm/@nestjs/core.svg" alt="NPM Downloads" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://api.travis-ci.org/nestjs/nest.svg?branch=master" alt="Travis" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://img.shields.io/travis/nestjs/nest/master.svg?label=linux" alt="Linux" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#5" alt="Coverage" /></a>
<a href="https://gitter.im/nestjs/nestjs?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=body_badge"><img src="https://badges.gitter.im/nestjs/nestjs.svg" alt="Gitter" /></a>
<a href="https://opencollective.com/nest#backer"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec"><img src="https://img.shields.io/badge/Donate-PayPal-dc3d53.svg"/></a>
  <a href="https://twitter.com/nestframework"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support
01.
sudo -u postgres psql

02.
postgres-# CREATE ROLE djamware WITH LOGIN PASSWORD 'dj@mw@r3';
postgres-# ALTER ROLE djamware CREATEDB;

03.
postgres-# \q
psql postgres -U djamware

04.
postgres=> CREATE DATABASE node_sequelize;

05.
postgres=> GRANT ALL PRIVILEGES ON DATABASE node_sequelize TO djamware;
postgres=> \q



0. Install Postgress ([link 1](https://www.digitalocean.com/community/tutorials/how-to-install-postgresql-on-ubuntu-20-04-quickstart-ru) [link 2](https://www.djamware.com/post/5b56a6cc80aca707dd4f65a9/nodejs-expressjs-sequelizejs-and-postgresql-restful-api))

1. Create DB

go to /etc/postgresql/12/main/pg_hba.conf and set firs uncommented line to 
```bash
local   all         postgres                          ident
```

restart postgress

```bash
sudo service postgresql restart 
```

go to pg commandline

```bash
sudo -u postgres psql

postgres-# CREATE ROLE vlad WITH LOGIN PASSWORD 'helloworld';
postgres-# ALTER ROLE vlad CREATEDB;
```

Quit `psql` then log in again using the new user that previously created.

```bash
postgres-# \q
psql postgres -U vlad

postgres=> CREATE DATABASE my_db;

postgres=> GRANT ALL PRIVILEGES ON DATABASE node_sequelize TO djamware;
postgres=> \q
```
--------------------------------------------------------------------------

Postgres need uuid_generate_v4() function. So, if you get QueryFailedError: function uuid_generate_v4() does not exist error, run CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; on pqsl.

or try --------------------------------------------------------------------

```bash
psql -U postgress
create database myawesomedatabase;
```

2. Create ORMConfig

```bash
touch ormcofig.json
```

```bash
{
	"type": "postgres",
	"host": "localhost",
	"port": 5432,
	"username": "postgres",
	"password": "111111",
	"database": "myawesomedatabase",
	"synchronize": true,
	"logging": false,
	"entities": ["dist/**/*.entity{.ts,.js}"]
}
```

Warning: use for loggin entties changes and db updates

```bash
{
  "synchronize": true,
  "logging": true,
}
```
