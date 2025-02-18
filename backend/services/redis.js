const { createClient } = require('redis');
const redisClient = createClient({
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
  socket : {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  }
});

redisClient.on("connect", () => {
console.log("Redis client connected successfully.");
});

redisClient.on("ready", () => {
    console.log("Redis client is ready to use.");
});

redisClient.on("error", (err) => {
    console.error("Redis connection error:", err);
});

redisClient.on("end", () => {
    console.log("Redis client disconnected.");
});
    
(async () => {
    await redisClient.connect(); // Ensure connection before using Redis
    console.log("Connected to Redis.");
})();

async function setData(key, value, expiration = 300) {
    await redisClient.set(key, value, {
        'EX':expiration
    },(err, reply) => {
        if(err) {
            console.error('Error setting value in redis', err);
            return 1;
        } else {
            console.log('Value set in redis',reply);
            return 0;
        }
    });
}

async function getData(key) {
    try {
        let value = await redisClient.get(key);
        return value;
    } catch(err) {
        console.error(err);
        return '0';
    }
}
module.exports = {setData, getData}