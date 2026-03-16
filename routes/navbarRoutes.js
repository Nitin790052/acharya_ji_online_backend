const express = require('express');
const router = express.Router();
const { 
    getNavbarItems, 
    seedNavbarItems, 
    createNavbarItem, 
    updateNavbarItem, 
    deleteNavbarItem 
} = require('../controllers/navbarController');

router.get('/', getNavbarItems);
router.post('/seed', seedNavbarItems);
router.post('/', createNavbarItem);
router.put('/:id', updateNavbarItem);
router.delete('/:id', deleteNavbarItem);

module.exports = router;
