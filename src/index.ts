import { createServer } from './utils/createServer';

createServer({ port: 4000 }).then(({url}) => {
  console.log(`Server listening at: ${url}`);
});

