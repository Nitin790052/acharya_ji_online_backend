const mongoose = require('mongoose');

const heroBannerSchema = new mongoose.Schema({
    badge: {
        type: String,
        default: 'Authentic Vedic Services',
    },
    titleHighlight1: {
        type: String,
        default: 'Experience',
    },
    titleHighlight2: {
        type: String,
        default: 'Divine',
    },
    titleHighlight3: {
        type: String,
        default: 'Blessings',
    },
    titleEnd: {
        type: String,
        default: 'At Your Doorstep',
    },
    subtitle: {
        type: String,
        default: 'Connect with sacred traditions through authentic rituals, expert consultations, and premium spiritual essentials delivered with devotion.',
    },
    linkText: {
        type: String,
        default: '',
    },
    linkUrl: {
        type: String,
        default: '',
    },
    imageUrl: {
        type: String,
        required: true,
    },
    pagePath: {
        type: String,
        default: '/', // default to home page
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('HeroBanner', heroBannerSchema);
