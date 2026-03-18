const HeroBanner = require('../models/HeroBanner');
const fs = require('fs');
const path = require('path');

exports.getAllBanners = async (req, res) => {
    try {
        const banners = await HeroBanner.find().sort({ createdAt: -1 });
        res.status(200).json(banners);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching banners', error: error.message });
    }
};

exports.getActiveBanners = async (req, res) => {
    try {
        const banners = await HeroBanner.find({ isActive: true }).sort({ createdAt: -1 });
        res.status(200).json(banners);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching active banners', error: error.message });
    }
};

exports.createBanner = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Image is required' });
        }

        const imageUrl = `/uploads/carousels/${req.file.filename}`;
        const bannerData = { ...req.body, imageUrl };

        // Ensure proper boolean conversion for isActive
        if (bannerData.isActive !== undefined) {
            bannerData.isActive = bannerData.isActive === 'true' || bannerData.isActive === true;
        }

        const newBanner = new HeroBanner(bannerData);
        await newBanner.save();
        res.status(201).json({ message: 'Banner created successfully', banner: newBanner });
    } catch (error) {
        res.status(500).json({ message: 'Error creating banner', error: error.message });
    }
};

exports.updateBanner = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = { ...req.body };
        
        if (updates.isActive !== undefined) {
             updates.isActive = updates.isActive === 'true' || updates.isActive === true;
        }

        if (req.file) {
            updates.imageUrl = `/uploads/carousels/${req.file.filename}`;
            
            // Try to delete old image
            const existingBanner = await HeroBanner.findById(id);
            if (existingBanner && existingBanner.imageUrl) {
                const oldImagePath = path.join(__dirname, '..', existingBanner.imageUrl);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
        }

        const updatedBanner = await HeroBanner.findByIdAndUpdate(id, updates, { new: true });
        
        if (!updatedBanner) {
            return res.status(404).json({ message: 'Banner not found' });
        }

        res.status(200).json({ message: 'Banner updated successfully', banner: updatedBanner });
    } catch (error) {
        res.status(500).json({ message: 'Error updating banner', error: error.message });
    }
};

exports.deleteBanner = async (req, res) => {
    try {
        const { id } = req.params;
        const banner = await HeroBanner.findById(id);
        
        if (!banner) {
            return res.status(404).json({ message: 'Banner not found' });
        }

        if (banner.imageUrl) {
            const imagePath = path.join(__dirname, '..', banner.imageUrl);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        await HeroBanner.findByIdAndDelete(id);
        res.status(200).json({ message: 'Banner deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting banner', error: error.message });
    }
};
