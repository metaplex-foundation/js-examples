# Getting Started with Metaplex and Express.js

This example sets up a new express app with Metaplex.
The Express.js app works with only one route that accepts a mint address in the request and returns the NFT object from the SDK as the response.

It requires [Node.js](https://nodejs.org/) to run.
1. Clone the example

2. Navigate to repo location

3. Edit the keypair.json file and add the secret key of your keypair in the following format
```
{
    "_keypair": {
        "secretKey": [
            (The secret key goes here)
        ]
    }
}
```

3. Run the server
```sh
npm run start
```

4. Open [http://localhost:3000/getNFT?mint=xxx](http://localhost:3000/getNFT?mint=xxx) with your browser after replacing (xxx) with your mint address to return the NFT object.

If you're interested in how this example app is using the Metaplex SDK, check out the [`index.js`](./index.js).


## Learn More

To learn more about Metaplex JS SDK, take a look at the following resources:
- [Metaplex JS SDK](https://github.com/metaplex-foundation/js).
- [Metaplex JS Examples](https://github.com/metaplex-foundation/js-examples).

