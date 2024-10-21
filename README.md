## Project Description

![Application Screenshot](image.png)

This is a web application using Nextjs, Fleek SDK + CLI, IPFS Storage.

It allows users to upload images to IPFS via Fleek SDK

It is deployed by using fleek-next CLI https://github.com/fleek-platform/fleek-next

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# FE: Nextjs Web

## Create a next js app

```bash
npx create-next-app
✔ What is your project named? … fleek-ipfs-uploader
✔ Would you like to use TypeScript? … Yes
✔ Would you like to use ESLint? … Yes
✔ Would you like to use Tailwind CSS? …  Yes
✔ Would you like to use `src/` directory? … No
✔ Would you like to use App Router? (recommended) … Yes
✔ Would you like to customize the default import alias (@/*)? … Yes
✔ What import alias would you like configured? … @/*
```

## Build and run it

```bash
npm run build
npm run dev
```

## Get the project id

```bash
fleek projects create --name fleek-ipfs-uploader

✅ Success! The project "fleek-ipfs-uploader" has been successfully created with the project ID "cm2css5d1000tgqiqz5wd9iaa", and you've automatically been switched to it.
```

## Create fleek.json

create fleek.json

```bash
{
    "FLEEK_PROJECT_ID": "cm2css5d1000tgqiqz5wd9iaa"
}
```

## Install Fleek SDK

install sdk https://fleek.xyz/docs/sdk/

```bash
npm install @fleek-platform/sdk
```

## Create Fleek Applications

```bash
fleek applications create
✔ Enter the name of the new application: … fleek-ipfs-uploader
✔ Enter one or more domain names to whitelist, separated by commas (e.g. example123.com, site321.com) …

✅ Success! New application Client ID created: client_HTtzw0FEqxXyl2ic4dRU
```

## ENV

```bash
PAT_TOKEN=
PROJECT_ID=
BE_SERVER_URL=https://36b3-104-28-254-75.ngrok-free.app
```

# BE: Nodejs Webserver

### Nodejs setup

### Ngok installation

[ngrok](https://ngrok.com/download)

[ngrok signup](https://dashboard.ngrok.com/signup)

```bash
# add auth token to ngrok, can be get here:
# https://dashboard.ngrok.com/get-started/your-authtoken
ngrok config add-authtoken <your_ngrok_auth_token>
✅ Authtoken saved to configuration file: ~/.config/ngrok/ngrok.yml

# Start the ngrok server
ngrok http 8080
forwarding: <url_to_the_server> (e.g. https://36b3-104-28-254-75.ngrok-free.app) -> http://localhost:8080
```

### ENV config

PAT_TOKEN=
PROJECT_ID=
