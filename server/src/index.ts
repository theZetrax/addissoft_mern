import { createServer } from './utils/server';
import dbconnection from './utils/db';

// Entry point for our app.
dbconnection.open()
    .then(() => createServer())
    .then(server => {
        server.listen(8081, () => {
            console.log('[server] Server running at http://localhost:8081');
        });
    })
    .catch(err => {
        console.log(`[App] Error encountered: ${err}`);
    })
