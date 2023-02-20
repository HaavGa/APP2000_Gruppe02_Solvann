const express = require('express');
const router = express.Router();
const {
    getVannstand,
    setVannstand,
    updateVannstand,
    deleteVannstand
} = require('../controllers/vannstandController');

// /api/version/vannstand
router.route('/').get(getVannstand).post(setVannstand);
router.route('/:id').patch(updateVannstand).delete(deleteVannstand);

module.exports = router;