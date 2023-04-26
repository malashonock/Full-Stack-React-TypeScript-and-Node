import Redis from 'ioredis';
import RedisStore from 'connect-redis';
import session from 'express-session';

const { env } = process;

// Setup Redis client
const redisClient = new Redis({
  port: Number(env.REDIS_PORT),
  host: env.REDIS_HOST,
  password: env.REDIS_PASSWORD,
});

// Setup Redis store
const redisStore = new RedisStore({
  client: redisClient,
});

const sessionMiddleware = session({
  store: redisStore,
  name: env.COOKIE_NAME,
  secret: env.SESSION_SECRET || '',
  resave: false,
  saveUninitialized: false,
  cookie: {
    path: '/',
    httpOnly: true,
    sameSite: 'strict',
    secure: false,
    maxAge: 1_000 * 60 * 60 * 24,
  },
});

export default sessionMiddleware;
