This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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
