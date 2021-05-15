# UserApp

This is a simple MERN Stack project. This project has a backend api running on ExpressJS, NodeJS framework. Frontend is React using Redux for state management.

# Instructions & Usage

## How to run project

```sh
docker-compose build # Build Containers
docker-compose up # Start Containers

# or use one command like below

docker-compose up --build
```

## Testing 

For testing the services, the API service and client service follow the steps defined below.

### Running API Server Tests

```sh
cd server # go to server directory
npm run build && npm run test:unit
```