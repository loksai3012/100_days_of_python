const path = require('path');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const { authenticate, authorizeAdmin } = require('./middleware/auth');
const errorHandler = require('./middleware/errorHandler');

const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const supplierRoutes = require('./routes/supplierRoutes');
const productRoutes = require('./routes/productRoutes');
const stockRoutes = require('./routes/stockRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const reportRoutes = require('./routes/reportRoutes');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));
app.use('/uploads', express.static(path.resolve(process.cwd(), 'uploads')));

app.get('/health', (req, res) => res.json({ success: true, message: 'OK' }));

app.use('/api/auth', authRoutes);
app.use('/api/categories', authenticate, authorizeAdmin, categoryRoutes);
app.use('/api/suppliers', authenticate, authorizeAdmin, supplierRoutes);
app.use('/api/products', authenticate, authorizeAdmin, productRoutes);
app.use('/api/stock', authenticate, authorizeAdmin, stockRoutes);
app.use('/api/dashboard', authenticate, authorizeAdmin, dashboardRoutes);
app.use('/api/reports', authenticate, authorizeAdmin, reportRoutes);

app.use(errorHandler);

module.exports = app;
