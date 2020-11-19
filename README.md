# Celo Listener
A webapp that listens for token(cUSD) transactions on the Celo Blockchain.

#### How it works

- A client or user sends a request to listen to transactions for a certain wallet address.
In essence, when the wallet address receives cUSD or any other token (will be added later)
a notification will be sent to the user's webhook url notifying them of the details of the transaction.

- The webapp is always on listening for transactions on the blockchain whenever there is a transaction
where the `to` value is in any of the addresses in the DB, then the details of that transaction
will be sent to the webhook url of whoever owns the wallet address

## Setup

```
npm install
```

## Lint

```
npm run lint
```

## Test

```
npm run test
```

## Development

```
npm run dev
```

## Docker

```
docker build -t celo-listener .
docker run -p 5000:5000 -d celo-listener
```

## To add a wallet address to listen to

```
curl --location --request POST 'localhost:5000/api/v1/wallet' \
--header 'Content-Type: application/json' \
--data-raw '{
    "address": "myaddress",
    "callbackUrl": "https://webhook.site/f70fb764-401c-42a9-ae64-e0d31539e908"
}'
```

NB: Please note that the application has not been fully developed yet.
