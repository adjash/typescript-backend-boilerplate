markdown

# My Node.js TypeScript Project

A simple Node.js project using TypeScript and Express, featuring a basic `'/'` endpoint that returns `"Hello World"`. This setup follows best practices for scalability and maintainability.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Running the Application](#running-the-application)
- [Testing the Endpoint](#testing-the-endpoint)
- [Scripts](#scripts)
- [License](#license)

## Prerequisites

Before getting started, ensure you have the following installed:

- **Node.js**: Version `20.16.0` (managed via [NVM](https://github.com/nvm-sh/nvm))
- **NVM (Node Version Manager)**: To easily switch Node.js versions
- **Git**: For version control
- **npm**: Comes with Node.js

### Installing NVM

If you don't have NVM installed, use the following commands:

```bash
# For Unix/Linux/MacOS
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash

# Reload shell configuration
source ~/.bashrc
# or
source ~/.zshrc
```

For Windows, consider using [nvm-windows](https://github.com/coreybutler/nvm-windows).

## Installation

Follow these steps to set up the project locally:

1. **Switch to the Project's Node.js Version**

   The project includes a `.nvmrc` file specifying Node.js version `20.16.0`. Use NVM to switch to this version:

   ```bash
   nvm install
   nvm use
   ```

   > **Note:** If Node.js `20.16.0` isn't installed, `nvm install` will download and install it.

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Configure Environment Variables**

   Create a `.env` file in the root directory:

   ```env
   PORT=3000
   ```

   You can adjust the `PORT` value as needed.

## Project Structure

```
my-node-ts-project/
├── src/
│   ├── controllers/
│   │   └── helloController.ts
│   ├── middlewares/
│   │   └── errorHandler.ts
│   ├── routes/
│   │   └── helloRoute.ts
│   ├── app.ts
│   └── server.ts
├── .env
├── .nvmrc
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

### Folder Descriptions

- **`src/controllers/`**: Contains functions that handle the logic for each route. For example, `helloController.ts` manages the response for the `'/'` endpoint.

- **`src/middlewares/`**: Holds middleware functions that process requests and responses. `errorHandler.ts` is used for handling errors globally.

- **`src/routes/`**: Defines the application's routes. `helloRoute.ts` sets up the `'/'` endpoint and links it to its controller.

- **`src/app.ts`**: Initializes the Express application, sets up middleware, and registers routes.

- **`src/server.ts`**: Starts the server and listens on the specified port.

## Running the Application

### Development Mode

Runs the application using `ts-node` for a seamless TypeScript development experience.

```bash
npm run dev
```

### Production Mode

1. **Build the Project**

   Compile TypeScript to JavaScript:

   ```bash
   npm run build
   ```

2. **Start the Server**

   ```bash
   npm start
   ```

   The server will run on the port specified in the `.env` file (default is `3000`).

## Testing the Endpoint

After starting the server, you can test the `'/'` endpoint to ensure it's working correctly.

### Using Curl

```bash
curl http://localhost:3000/
```

**Expected Response:**

```json
{
  "message": "Hello World"
}
```

### Using a Web Browser

Navigate to [http://localhost:3000/](http://localhost:3000/) in your browser. You should see the JSON response.

## Scripts

- **`npm run dev`**: Runs the application in development mode using `ts-node`.
- **`npm run build`**: Compiles TypeScript files into JavaScript in the `dist/` directory.
- **`npm start`**: Starts the compiled application using Node.js.
- **`npm run lint`**: (If set up) Runs ESLint to check code quality.
- **`npm run format`**: (If set up) Formats the code using Prettier.
