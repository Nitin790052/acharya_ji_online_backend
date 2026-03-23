const mongoose = require('mongoose');

const pujaOfferingSchema = new mongoose.Schema({
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    title: {
        type: String,
        required: true
    },
    shortDescription: {
        type: String,
        required: true
    },
    longDescription: {
        type: String,
    },
    price: {
        type: Number,
        required: true
    },
    originalPrice: {
        type: Number,
    },
    duration: {
        type: String,
        default: '2-3 Hours'
    },
    benefits: [String],
    faqs: [{
        question: String,
        answer: String
    }],
    serviceModes: [{
        mode: String,
        title: String,
        description: String,
        price: Number,
        points: [String],
        imageUrl: String
    }],
    imageUrl: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    order: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('PujaOffering', pujaOfferingSchema);
