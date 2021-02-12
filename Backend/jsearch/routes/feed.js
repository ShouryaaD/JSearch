const express = require('express');
const router = express.Router();
const feedController = require('../controllers/feed');
router.put('/feed', feedController.createFeed);
router.post('/feed', feedController.getFeed);
router.get('/feed/getskill', feedController.getSkill);
router.get('/feed/:postId', feedController.getPost)
router.post('/feed/apply', feedController.applyJob)
router.post('/feed/posted', feedController.appliedUsers);
router.post('/feed/associate', feedController.associatedJobs )
module.exports = router;