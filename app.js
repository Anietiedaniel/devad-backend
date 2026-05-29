const express = require('express');

const helmet = require('helmet');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const hpp = require('hpp');

const session = require('express-session');

const passport = require('./config/passport');



// ROUTES
const authRoutes = require('./routes/auth.routes');


// MIDDLEWARES
const errorMiddleware = require('./middlewares/error.middleware');
const notFoundMiddleware = require('./middlewares/notFound.middleware');



const app = express();



// =============================
// BODY PARSER
// =============================
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));



// =============================
// SECURITY
// =============================
app.use(helmet());
app.use(compression());
app.use(hpp());
app.use(cookieParser());



// =============================
// CORS
// =============================
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));



// =============================
// RATE LIMIT
// =============================
const rateLimit = require('express-rate-limit');

app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests, try again later',
}));



// =============================
// SESSION (NO REDIS - SIMPLE MEMORY STORE)
// =============================
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,

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

// =============================
// DIAGNOSTIC TEST ROUTE
// =============================
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
