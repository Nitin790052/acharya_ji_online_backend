const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const navbarRoutes = require('./routes/navbarRoutes');
const heroBannerRoutes = require('./routes/heroBannerRoutes');
const aboutUsRoutes = require('./routes/aboutUsRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const popularPujaRoutes = require('./routes/popularPujaRoutes');
const astrologerRoutes = require('./routes/astrologerRoutes');
const kundliRoutes = require('./routes/kundliRoutes');
const vastuRoutes = require('./routes/vastuRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');
const blogRoutes = require('./routes/blogRoutes');

const appDownloadRoutes = require('./routes/appDownloadRoutes');
const faqRoutes = require('./routes/faqRoutes');
const footerRoutes = require('./routes/footerRoutes');

dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/navbar', navbarRoutes);
app.use('/api/hero-banners', heroBannerRoutes);
app.use('/api/about-us', aboutUsRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/popular-pujas', popularPujaRoutes);
app.use('/api/astrologers', astrologerRoutes);
app.use('/api/kundli-services', kundliRoutes);
app.use('/api/vastu-services', vastuRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/app-download', appDownloadRoutes);
app.use('/api/faqs', faqRoutes);
app.use('/api/footer', footerRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
