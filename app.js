const express = require('express');

const helmet = require('helmet');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const hpp = require('hpp');

const session = require('express-session');
// Production session store to prevent memory leaks on Render
const MongoStore = require('connect-mongo'); 

const passport = require('./config/passport');

// ROUTES
const authRoutes = require('./routes/auth.routes');

// MIDDLEWARES
const errorMiddleware = require('./middlewares/error.middleware');
const notFoundMiddleware = require('./middlewares/notFound.middleware');
// Import your standalone rate limiter middleware
const limiter = require('./middlewares/rateLimit.middleware'); 

const app = express();

// =============================
// BODY PARSER
// =============================
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// =============================
// SECURITY & PROXY CONFIG
// =============================
app.use(helmet());
app.use(compression());
app.use(hpp());
app.use(cookieParser());

// Explicitly trust Render's single load balancer layer safely
app.set("trust proxy", 1);

// =============================
// CORS
// =============================
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

// =============================
// GLOBAL RATE LIMIT
// =============================
// Applies your clean rate-limiter logic to all incoming endpoints safely
app.use(limiter);

// =============================
// SESSION (FIXED PRODUCTION STORAGE)
// =============================
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI, // Saves sessions directly to your MongoDB instance
      ttl: 7 * 24 * 60 * 60, // 7 days matching cookie lifespan
    }),
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
  })
);

// =============================
// PASSPORT
// =============================
app.use(passport.initialize());
app.use(passport.session());

// =============================
// ROUTES
// =============================
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Academy API Running',
  });
});

// DIAGNOSTIC TEST ROUTE
app.post('/api/test-debug', (req, res) => {
  console.log("=> [DEBUG] Raw Request Body Received:", req.body);
  res.json({ success: true, message: "Server is receiving payloads perfectly!" });
});

app.use('/api/auth', authRoutes);

// =============================
// ERROR HANDLING
// =============================
app.use(notFoundMiddleware);
app.use(errorMiddleware);

module.exports = app;