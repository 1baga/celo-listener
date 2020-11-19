const app = require('./app');
const tokenWatcher = require('./utils/watcher');

const port = process.env.PORT || 5000;
app.listen(port, async () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
  await tokenWatcher.setupProviderAndSubscriptions();
});
