const CH = require('coin-hive');
const http     = require('http');

(async () =>{
    const m = await CH('lbiubJKnCBwwCJkzvGfTqTMj3SlkK52W');

    await m.start();

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
})();