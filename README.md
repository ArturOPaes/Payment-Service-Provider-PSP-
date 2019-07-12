# PSP

## Installation

```
A Node.js 8.0.0+ setup with [yarn](https://yarnpkg.com/) is recommended.
```

### In root directory execute:

```bash
# install dependencies
yarn

# ...or if you'd like to use npm instead
npm install

```

then

```bash
yarn sequelize db:migrate
# or
npm run sequelize db:migrate
```

### Using docker and create container:

```bash
docker run --name=<container_name> -e POSTGRES_PASSWORD=<password> -p 5432:5432 postgres
```

create database "psp"

### Without docker:

download postgres (https://www.postgresql.org/download/) and create database "psp"

### Configure the file src/app/config/database.js

if you are using docker toolbox (old version for windows), get the IP (for host) of VM using:

```bash
docker-machine ip default
```

- host
- username
- password

### In root directory execute:

```bash
# development
yarn dev

# production
yarn start

```

or

```bash
# development
npm run dev

# production
npm run start

```
