const Navbar = require('../models/Navbar');

// Get all navbar items
const getNavbarItems = async (req, res) => {
    try {
        const items = await Navbar.find().sort({ order: 1 });
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Seed initial data
const seedNavbarItems = async (req, res) => {
    const initialItems = [
        { label: 'Home', href: '/', order: 1 },
        { label: 'About Us', href: '/about', order: 2 },
        {
            label: 'Puja Services',
            href: '/pujaServices',
            type: 'dropdown',
            order: 3,
            children: [
                { label: 'Book Puja', href: '/pujaServices/bookPuja' },
                { label: 'Griha Pravesh Puja', href: '/puja/griha-pravesh-puja' },
                { label: 'Satyanarayan Katha', href: '/puja/satyanarayan-puja' },
                { label: 'Rudrabhishek', href: '/puja/rudrabhishek-puja' },
                { label: 'Navgraha Shanti Puja', href: '/puja/navgraha-shanti-puja' },
                { label: 'Vastu Shanti Puja', href: '/puja/vastu-shanti-puja' },
                { label: 'Marriage / Vivah Puja', href: '/puja/marriage-puja' },
                { label: 'Pitru Dosh Puja', href: '/puja/pitru-dosh-puja' },
                { label: 'Havan & Yagya', href: '/puja/havan-yagya' },
                { label: 'All Puja Services', href: '/pujaServices' }
            ]
        },
        {
            label: 'Astrology Services',
            href: '#',
            type: 'dropdown',
            order: 4,
            children: [
                { label: 'Talk to Astrologer', href: '/astrologer' },
                { label: 'Career Astrology', href: '#' },
                { label: 'Marriage Astrology', href: '#' },
                { label: 'Business Astrology', href: '#' },
                { label: 'Health Astrology', href: '#' },
                { label: 'Numerology', href: '#' },
                { label: 'Tarot Reading', href: '#' },
                { label: 'Palmistry', href: '#' },
                { label: 'Gemstone Suggestion', href: '#' }
            ]
        },
        {
            label: 'Kundli',
            href: '#',
            type: 'dropdown',
            order: 5,
            children: [
                { label: 'Get Your Kundli', href: '/kundli' },
                { label: 'Kundli Matching', href: '#' },
                { label: 'Manglik Dosh Check', href: '#' },
                { label: 'Kaal Sarp Dosh', href: '#' },
                { label: 'Pitru Dosh', href: '#' },
                { label: 'Shani Sade Sati', href: '#' },
                { label: 'Dasha Analysis', href: '#' },
                { label: 'Kundli Remedies', href: '#' }
            ]
        },
        {
            label: 'Vastu',
            href: '/vastu',
            type: 'dropdown',
            order: 6,
            children: [
                { label: 'Vastu Consultation', href: '/vastu-consultation' },
                { label: 'Home / Office Vastu', href: '/home-office-vastu' },
                { label: 'Feng Shui', href: '#' },
                { label: 'Gemstones', href: '#' },
                { label: 'Rudraksha', href: '#' },
                { label: 'Yantra', href: '#' },
                { label: 'Energized Products', href: '#' }
            ]
        },
        {
            label: 'Healing',
            href: '/spiritual',
            type: 'dropdown',
            order: 7,
            children: [
                { label: 'Reiki Healing', href: '/reiki-healing' },
                { label: 'Crystal Healing', href: '/crystal-healing' },
                { label: 'Chakra Balancing', href: '#' },
                { label: 'Aura Cleansing', href: '#' },
                { label: 'Meditation Guidance', href: '#' }
            ]
        },
        {
            label: 'Shop',
            href: '/shop',
            type: 'dropdown',
            order: 8,
            children: [
                { label: 'Puja Samagri', href: '/shop-puja-samagri' },
                { label: 'Gemstones', href: '#' },
                { label: 'Yantra', href: '#' }
            ]
        },
        {
            label: 'Learn',
            href: '/learn',
            type: 'dropdown',
            order: 9,
            children: [
                { label: 'Astrology Courses', href: '/learn-astrology-courses' },
                { label: 'Puja Vidhi Guides', href: '#' },
                { label: 'Mantra Chanting', href: '#' },
                { label: 'Blogs & Articles', href: '#' }
            ]
        },
        { label: 'Career', href: '/career', order: 10 },
        { label: 'Media', href: '/media', order: 11 },
        { label: 'Gallery', href: '/gallery', order: 12 },
        { label: 'Blog', href: '/blog', order: 13 },
        { label: 'Contact', href: '/contact', order: 14 }
    ];

    try {
        await Navbar.deleteMany();
        await Navbar.insertMany(initialItems);
        res.status(201).json({ message: 'Navbar items seeded successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create new navbar item
const createNavbarItem = async (req, res) => {
    try {
        const newItem = new Navbar(req.body);
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update navbar item
const updateNavbarItem = async (req, res) => {
    try {
        const updatedItem = await Navbar.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete navbar item
const deleteNavbarItem = async (req, res) => {
    try {
        await Navbar.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getNavbarItems,
    seedNavbarItems,
    createNavbarItem,
    updateNavbarItem,
    deleteNavbarItem
};
