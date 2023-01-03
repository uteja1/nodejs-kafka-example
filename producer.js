const {Kafka} = require('kafkajs');
msg = process.argv[2];

run ();

async function run() {
    
    try {
        
        const kafka = new Kafka({
            'clientId' : 'app',
            'brokers' : ['localhost:29092']
        });

        const producer = kafka.producer();
        await producer.connect();
        console.log('connected');
        // A-M 0 , N-Z 1
        const partition = msg[0] < 'N' ? 0 : 1;
        const result = await producer.send({
            'topic' : 'users',
            'messages' : [
                {
                    'value' : msg,
                    'partition': partition
                }
            ]
        });

        console.log(`sent successfully ===> ${JSON.stringify(result)}`);

        await producer.disconnect();
    } catch (error) {
        console.error(`error : ${error}`);
    } finally {
        process.exit(0);
    }
}