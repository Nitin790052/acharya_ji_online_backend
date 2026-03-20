const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    category: { type: String, required: true },
    readTime: { type: String, required: true },
    date: { type: String, required: true },
    author: { type: String },
    imageUrl: { type: String },
    url: { type: String, required: true },
    rating: { type: Number, default: 4.8 },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
