import config from './property';
import app from './app';
app
  .listen(config.port, () => {
    console.log(`server running on port : ${config.port}`);
  })
  .on('error', (e) => console.error(e));

