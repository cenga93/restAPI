import app from './app';
import { connect } from 'mongoose';
const { errorConverter, errorHandler } = require('./middleware/error');
// import MongoConnection from './config/database';
// const databaseConnection = new MongoConnection();

/** Starting the server */
app.listen(3000, async (): Promise<void> => {
     console.log(`
     -----------------------------------------------------------
        Starting serve on port: ${3000}... ***
     -----------------------------------------------------------
     `);

     const URL: string | undefined = process.env.DATABASE_URL;

     if (URL != null) {
          await connect(URL)
               .then(({ connections }) => {
                    console.log(`==> Connected to ${connections[0].name} database`);
               })
               .catch((err) => {
                    console.log('Could not connect to the database. Exiting now...', err);
               });
     }

     console.log('==> Server is running');

     /** Error middleware */
     app.use(errorConverter);
     app.use(errorHandler);
});
