// app.js 
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
;
import profileRoute from './routes/profile.route.js';
import jobRoutes from "./routes/job.routes.js";
import educationRoutes from "./routes/education.routes.js";
import documentRoutes from './routes/document.routes.js'
import educationalDocumentRoutes from "./routes/educationalDocument.routes.js";
import authRoutes from './routes/auth.routes.js'
import bodyParser from 'body-parser';
import {newAuthRouter} from './routes/newAuthRouter.js'
import { productsRouter } from './routes/ProductsDummyRoute.js';
import paymentRoutes from './routes/paymentRoutes.js';
import { paymentWebhook} from './routes/PaymentWebhook.js';
import  router  from './routes/JobAppRouter.js';

const app = express();

app.use(cors());
app.use(morgan('dev'));

// ⚠️ Webhook must come BEFORE json middleware
app.use("/api/webhooks", paymentWebhook);

app.use(express.json());
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));


// USER API's 
app.use('/auth',authRoutes);
app.use("/api/profile", profileRoute);
app.use("/api/jobs", jobRoutes);
app.use("/api/education", educationRoutes);
app.use("/api/documents", documentRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/education-documents", educationalDocumentRoutes);


app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store');
  next();
});

// NEw Auth APis 
app.use ('/new-auth', newAuthRouter);
app.use ('/products', productsRouter);

// Payment Api's 

app.use("/api/payments", paymentRoutes);

app.use('/api/job-applications',router);


export default app;
