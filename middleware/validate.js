const { body, validationResult } = require('express-validator');

// Error checker middleware (run after rules)
const validateResult = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            success: false, 
            message: 'Validation failed',
            errors: errors.array().map(err => ({ field: err.path, message: err.msg }))
        });
    }
    next();
};

// Banner validation rules
const validateBanner = [
    // badge is optional but can't be empty if provided
    body('badge').optional().trim().notEmpty().withMessage('Badge cannot be empty'),
    
    // titleHighlight1 is now optional per user request
    body('titleHighlight1').optional().trim(),
    
    // titleHighlight2, 3 and subtitle are usually core content
    body('titleHighlight2').trim().notEmpty().withMessage('Title Highlight 1 is required'),
    body('subtitle').trim().notEmpty().withMessage('Subtitle is required'),
    
    // Image validation is usually done in controller (check if req.file exists)
    // but we can ensure other fields are there
    validateResult
];

// Navbar item validation
const validateNavbar = [
    body('label').trim().notEmpty().withMessage('Label is required'),
    body('href').trim().notEmpty().withMessage('Link (href) is required'),
    body('type').isIn(['link', 'dropdown']).withMessage('Type must be link or dropdown'),
    validateResult
];

// Popular Puja validation
const validatePopularPuja = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('duration').trim().notEmpty().withMessage('Duration is required'),
    body('price').trim().notEmpty().withMessage('Price is required'),
    validateResult
];

module.exports = {
    validateBanner,
    validateNavbar,
    validatePopularPuja
};
