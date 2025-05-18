# Onachi App Template

A full-stack application template built with Turborepo, featuring a React client, Node.js server, and shared packages.

## Project Structure

- **client**: React frontend built with Vite and TypeScript
- **server**: Node.js backend with TypeScript
- **packages/\***: Shared Packages
- **scripts**: Build and packaging scripts

## Prerequisites

- [Node.js](https://nodejs.org/) (v20 or later recommended)
- [pnpm](https://pnpm.io/) (v8 or later)
- [Docker](https://www.docker.com/) (optional, for containerization)

## Quick Start

```bash
# Install dependencies
pnpm install

# Start development servers
pnpm dev

# Build docker image
pnpm build

# Run docker container
docker run -d -p 24500:24500 --name onachi-app onachi-app-template
```
