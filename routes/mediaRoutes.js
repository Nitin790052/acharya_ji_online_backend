const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mediaController = require('../controllers/mediaController');

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '..', 'uploads', 'media');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir)
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage });

router.get('/', mediaController.getAllMedia);
router.get('/type/:type', mediaController.getMediaByType);
router.post('/', upload.single('image'), mediaController.createMedia);
router.put('/:id', upload.single('image'), mediaController.updateMedia);
router.delete('/:id', mediaController.deleteMedia);
router.post('/seed', mediaController.seedMedia);

module.exports = router;
