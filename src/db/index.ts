import { AppDataSource } from './data-source';

AppDataSource.initialize()
  .then(() => {
    console.log('Database initialized');
  })
  .catch((error) => console.log('Error: ', error));
