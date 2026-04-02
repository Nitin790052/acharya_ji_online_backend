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
const aboutPageRoutes = require('./routes/aboutPageRoutes');
const pujaOfferingRoutes = require('./routes/pujaOfferingRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const bookPujaContentRoutes = require('./routes/bookPujaContentRoutes');
const careerContentRoutes = require('./routes/careerContentRoutes');
const mediaRoutes = require('./routes/mediaRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const contactSettingsRoutes = require('./routes/contactSettingsRoutes');

dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '150mb' }));
app.use(express.urlencoded({ limit: '150mb', extended: true }));
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
app.use('/api/about-page', aboutPageRoutes);
app.use('/api/puja-offerings', pujaOfferingRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/book-puja-content', bookPujaContentRoutes);
app.use('/api/career-content', careerContentRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/contact-settings', contactSettingsRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
