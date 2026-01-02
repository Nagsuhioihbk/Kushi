// import cors from 'cors';
// import express, { Application } from 'express';
// import morgan from 'morgan';
// import rootRouter from './routes';
// import notFound from './middlewares/notFound';
// import globalErrorHandler from './middlewares/globalErrorhandler';

// const app: Application = express();

// app.use(express.json());
// app.use(morgan('dev'));

// app.use(cors({ origin: ['http://localhost:5173', 'https://inventory-navy.vercel.app'] }));

// // application routes
// app.use('/api/v1', rootRouter);

// app.use(globalErrorHandler);

// app.use(notFound);

// export default app;





// import cors from 'cors';
// import express, { Application } from 'express';
// import morgan from 'morgan';
// import rootRouter from './routes';
// import notFound from './middlewares/notFound';
// import globalErrorHandler from './middlewares/globalErrorhandler';

// const app: Application = express();

// app.use(express.json());
// app.use(morgan('dev'));

// app.use(
//   cors({
//     origin: ['http://localhost:5173', 'https://inventory-navy.vercel.app'],
//   })
// );

// // application routes
// app.use('/api/v1', rootRouter);

// // ✅ ADD THIS
// app.get('/', (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: 'Kushi Inventory Backend is running 🚀',
//   });
// });

// // error handlers
// app.use(globalErrorHandler);
// app.use(notFound);

// export default app;




// app.ts
import cors from 'cors';
import express, { Application } from 'express';
import morgan from 'morgan';
import rootRouter from './routes';
import notFound from './middlewares/notFound';
import globalErrorHandler from './middlewares/globalErrorhandler';

const app: Application = express();

// -------------------- MIDDLEWARES --------------------

// Body parser
app.use(express.json());

// Logger
app.use(morgan('dev'));

// CORS configuration
app.use(
  cors({
    origin: [
      'http://localhost:5173',                  // Local dev
      'https://inventory-navy.vercel.app',     // Another frontend (if needed)
      'https://kushi-frontend-code.vercel.app' // Your current Vercel frontend
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true, // if using cookies/auth headers
  })
);

// -------------------- ROUTES --------------------

// Main API routes
app.use('/api/v1', rootRouter);

// Test route to check backend is running
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Kushi Inventory Backend is running 🚀',
  });
});

// -------------------- ERROR HANDLERS --------------------
app.use(globalErrorHandler);
app.use(notFound);

export default app;
