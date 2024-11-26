## 🛠 Prerequisites

Before you take off, make sure you have the right env variables loaded for each part (rocket science at its best):

Strapi (example in `./strapi/.env.example`):
  - `STRAPI_ADMIN_CLIENT_URL=<url-of-nextjs>`
  - `STRAPI_ADMIN_CLIENT_PREVIEW_SECRET=<a-random-token>`

- Create a `./strapi/.env` file with these variables

Next.js (example in `./next/.env.sample`):
  - `NEXT_PUBLIC_API_URL=<url-of-strapi>` (mandatory)
  - `PREVIEW_SECRET=<the-same-random-token-as-for-strapi>`

- Create a `./next/.env` file with these variables

## 1. Start Strapi

Take a deep breath. It's time to power up the Strapi engines. Navigate to your ./my-projects/launchpad/strapi folder by running:

Navigate to your `./my-projects/launchpad/strapi` folder by running `cd strapi` from your command line.

- Run the following command in your `./launchpad/strapi` folder:

```
pnpm && pnpm seed && pnpm develop
```

This will install dependencies, sprinkle in some data magic, and run the server. 

## 2. Start Next.js

We're almost ready for lift-off! Next.js is your sleek, futuristic interface for getting all that glorious content out into the world. 🚀

Navigate to your `./my-projects/launchpad/next` folder by running `cd next` from your command line.

- Run the following command in your `./launchpad/next` folder

```
pnpm && pnpm build && pnpm start
```

This installs dependencies, builds your project, and starts your server. You’re now a spacefaring content master!
