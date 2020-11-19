const Web3 = require('web3');
const { newKitFromWeb3 } = require('@celo/contractkit');
const provider = new Web3.providers.WebsocketProvider(
  'wss://forno.celo.org/ws',
  {
    clientConfig: {
      keepAlive: true,
      keepAliveInterval: 30000
    },
    reconnect: {
      auto: true,
      delay: 1000,
      maxAttempts: 20
    }
  }
);

const web3 = new Web3(provider);
const kit = newKitFromWeb3(web3);
const { promisify } = require('util');
const config = require('./config');

async function setupProviderAndSubscriptions() {
  const { redisClient } = config;
  const getAsync = promisify(redisClient.get).bind(redisClient);

  const stableToken = await kit.contracts.getStableToken();
  const options = { fromBlock: 'latest' };

  let setupNewProvider = false;

  const setupNewProviderAndSubs = async () => {
    console.log('Starting inside');
    // To prevent us from retrying too aggressively, but stops listening for 5000ms
    await sleep(5000);
    console.log('Waiting to start');
    // To avoid a situation where multiple error events are triggered
    if (!setupNewProvider) {
      setupNewProvider = true;
      await setupProviderAndSubscriptions();
    }
  };

  provider.on('error', async (error) => {
    console.log('WebsocketProvider encountered an error', error);
    await setupNewProviderAndSubs();
  });

  provider.on('end', async () => {
    console.log('WebsocketProvider has ended, will restart');
    await setupNewProviderAndSubs();
  });

  // goldToken.events
  //   .Transfer(options)
  //   .on('data', async data => {
  //     let datum = JSON.parse(JSON.stringify(data.returnValues));
  //     console.log('EVENT GOLD::: ', datum);
  //     console.log('EVENT GOLD HASH::: ', data.transactionHash);
  //   })
  //   .on('error', async (err, receipt) => {
  //     console.log('ERROR in gold EVENT::: ', err);
  //     await setupNewProviderAndSubs();
  //   })
  //   .on('connected', subId => {
  //     console.log('SUB ID::: ', subId);
  //   });

  stableToken.events
    .Transfer(options)
    .on('connected', (subId) => {
      console.log('cUSD Connected: ', subId);
    })
    .on('data', async (data) => {
      const datum = JSON.parse(JSON.stringify(data.returnValues));
      console.log('NEW cUSD TX: ', datum);
      console.log('cUSD TX hash: ', data.transactionHash);
      if (datum.to) {
        console.log('TO:: ', datum.to.toLowerCase());
        console.log('AMOUNT:: ', Number.parseInt(datum.value, 10) / 1e18);
        const to = await getAsync(datum.to.toLowerCase());
      } else {
        console.log('Empty datum');
      }
    })
    .on('error', async (err, receipt) => {
      console.log('ERROR in stable EVENT::: ', err);
    });
}

// setupProviderAndSubscriptions();

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

module.exports = {
  setupProviderAndSubscriptions
};
