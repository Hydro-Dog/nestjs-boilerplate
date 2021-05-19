<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>


## Pre-implemented

```bash
Http Error Handler
Logger Interceptor
```

## Support
01.
```bash
sudo -u postgres psql
```
02.
```bash
postgres-# CREATE ROLE djamware WITH LOGIN PASSWORD 'dj@mw@r3';
postgres-# ALTER ROLE djamware CREATEDB;
```
03.
```bash
postgres-# \q
psql postgres -U djamware
```
04.
```bash
postgres=> CREATE DATABASE node_sequelize;
```
05.
```bash
postgres=> GRANT ALL PRIVILEGES ON DATABASE node_sequelize TO djamware;
postgres=> \q
```
If instructions overhead didn't hepl try one below. Almost the same but anyway. 

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
