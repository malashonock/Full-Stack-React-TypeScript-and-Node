import Redis from 'ioredis';
import RedisStore from 'connect-redis';
import session from 'express-session';

// Setup Redis client
const redisClient = new Redis({
  port: Number(process.env.REDIS_PORT),
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD,
});

// Setup Redis store
const redisStore = new RedisStore({
  client: redisClient,
});

const sessionMiddleware = session({
  store: redisStore,
  name: process.env.COOKIE_NAME,
  secret: process.env.SESSION_SECRET || '',
  resave: false,
  saveUninitialized: false,
  cookie: {
    path: '/',
    httpOnly: true,
    sameSite: 'strict',
    secure: false,
    maxAge: 1_000 * 60 * 60 * 24,
  }
});

export default sessionMiddleware;