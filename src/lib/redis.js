import Redis from 'ioredis';

const redis = new Redis({
  host: '127.0.0.1',
  port: 6379
});

redis.flushdb(function(err, succeeded){
  console.log(succeeded); // will be true if success
});

// or for all databases
redis.flushall(function(err, succeeded){
  console.log(succeeded); // will be true if success
});    

export default redis;