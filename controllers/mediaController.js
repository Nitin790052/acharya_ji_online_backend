const Media = require('../models/Media');
const fs = require('fs');
const path = require('path');

exports.getAllMedia = async (req, res) => {
    try {
        const media = await Media.find().sort({ createdAt: -1 });
        res.status(200).json(media);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching media', error: error.message });
    }
};

exports.getMediaByType = async (req, res) => {
    try {
        const { type } = req.params;
        const media = await Media.find({ type }).sort({ createdAt: -1 });
        res.status(200).json(media);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching media by type', error: error.message });
    }
};

exports.createMedia = async (req, res) => {
    try {
        const mediaData = { ...req.body };
        
        if (req.file) {
            mediaData.image = `/uploads/media/${req.file.filename}`;
        }

        const newMedia = new Media(mediaData);
        await newMedia.save();
        res.status(201).json({ message: 'Media created successfully', media: newMedia });
    } catch (error) {
        res.status(500).json({ message: 'Error creating media', error: error.message });
    }
};

exports.updateMedia = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = { ...req.body };

        if (req.file) {
            updates.image = `/uploads/media/${req.file.filename}`;

            // Delete old image
            const existingMedia = await Media.findById(id);
            if (existingMedia && existingMedia.image && existingMedia.image.startsWith('/uploads/')) {
                const oldImagePath = path.join(__dirname, '..', existingMedia.image);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
        }

        const updatedMedia = await Media.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedMedia) {
            return res.status(404).json({ message: 'Media not found' });
        }

        res.status(200).json({ message: 'Media updated successfully', media: updatedMedia });
    } catch (error) {
        res.status(500).json({ message: 'Error updating media', error: error.message });
    }
};

exports.deleteMedia = async (req, res) => {
    try {
        const { id } = req.params;
        const media = await Media.findById(id);

        if (!media) {
            return res.status(404).json({ message: 'Media not found' });
        }

        if (media.image && media.image.startsWith('/uploads/')) {
            const imagePath = path.join(__dirname, '..', media.image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        await Media.findByIdAndDelete(id);
        res.status(200).json({ message: 'Media deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting media', error: error.message });
    }
};

exports.seedMedia = async (req, res) => {
    try {
        await Media.deleteMany();
        const sampleMedia = [
            // NEWS
            {
                type: 'news',
                title: 'Acharya Ji Explains Importance of Navgraha Shanti',
                excerpt: 'Leading astrologer shares insights on planetary remedies and their significance in modern times.',
                publication: 'Spiritual Times',
                date: '15 Dec 2024',
                image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&q=80',
                link: '#'
            },
            {
                type: 'news',
                title: 'Vastu Remedies for Modern Homes - Expert Opinion',
                excerpt: 'Practical Vastu solutions for contemporary living spaces without major renovations.',
                publication: 'Home & Living Magazine',
                date: '3 Jan 2025',
                image: 'https://images.unsplash.com/photo-1627483262268-9c2b5b2834b5?w=800&q=80',
                link: '#'
            },
            {
                type: 'news',
                title: 'Ancient Wisdom Meets Modern Astrology',
                excerpt: 'How traditional Vedic practices are helping people navigate contemporary challenges.',
                publication: 'Daily Dharma',
                date: '28 Nov 2024',
                image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&q=80',
                link: '#'
            },
            // VIDEOS
            {
                type: 'video',
                title: 'Understanding Shani Sade Sati - Complete Guide',
                duration: '12:45',
                views: '25K',
                date: '10 Jan 2025',
                image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80',
                videoId: 'dQw4w9WgXcQ'
            },
            {
                type: 'video',
                title: 'Navratri Puja Vidhi - Step by Step',
                duration: '18:30',
                views: '42K',
                date: '5 Oct 2024',
                image: 'https://images.unsplash.com/photo-1604608672516-f1b9b1a4a0f5?w=800&q=80',
                videoId: 'dQw4w9WgXcQ'
            },
            {
                type: 'video',
                title: 'Career Astrology Q&A Session',
                duration: '22:15',
                views: '18K',
                date: '20 Dec 2024',
                image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
                videoId: 'dQw4w9WgXcQ'
            },
            // EVENTS
            {
                type: 'event',
                title: 'Vedic Astrology Workshop - Delhi',
                location: 'Connaught Place, New Delhi',
                date: '18 Nov 2024',
                attendees: '200+',
                description: 'Two-day intensive workshop on Vedic astrology fundamentals and practical applications.',
                image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80'
            },
            {
                type: 'event',
                title: 'Maha Shivaratri Special Seminar',
                location: 'Community Hall, Dwarka',
                date: '8 Mar 2024',
                attendees: '350+',
                description: 'Special discourse on significance of Maha Shivaratri and powerful remedies.',
                image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80'
            },
            // AWARDS
            {
                type: 'award',
                title: 'Best Vedic Astrologer Award 2024',
                organization: 'Indian Astrology Council',
                year: '2024',
                image: 'https://images.unsplash.com/photo-1578574515323-c3c8ef01456e?w=800&q=80'
            },
            {
                type: 'award',
                title: 'Excellence in Traditional Knowledge',
                organization: 'Spiritual Leaders Forum',
                year: '2023',
                image: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6?w=800&q=80'
            },
            // SOCIAL
            {
                type: 'social',
                platform: 'instagram',
                title: 'Daily Astrology Tips',
                engagement: '15K likes',
                date: '2 days ago',
                image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80'
            },
            {
                type: 'social',
                platform: 'youtube',
                title: 'Remedies for Mercury Retrograde',
                engagement: '8K views',
                date: '1 week ago',
                image: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&q=80'
            }
        ];
        await Media.insertMany(sampleMedia);
        res.status(201).json({ message: 'Media seeded successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error seeding media', error: error.message });
    }
};
