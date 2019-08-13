const { promisify } = require('util');

const redis = require('redis');
const config = require('config');

const client = redis.createClient(config.redis);

const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);
const setexAsync = promisify(client.setex).bind(client);
const delAsync = promisify(client.del).bind(client);

class Cache {
  constructor(prefix = '', expire) {
    this.prefix = prefix;
    this.expire = expire;
  }

  prefixKey(key) {
    if (this.prefix) {
      return `${this.prefix}:${key}`;
    }
    return key;
  }

  get(key) {
    return getAsync(this.prefixKey(key));
  }

  set(key, value) {
    if (this.expire) {
      return setexAsync(this.prefixKey(key), this.expire, value);
    }
    return setAsync(this.prefixKey(key), value);
  }

  async has(key) {
    const result = await this.get(key);
    return result !== null;
  }

  delete(key) {
    return delAsync(this.prefixKey(key));
  }
}

module.exports = Cache;
