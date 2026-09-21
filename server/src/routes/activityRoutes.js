import express from 'express';
import { updateActivity, deleteActivity } from '../controllers/activityController.js';

const router = express.Router();

router.put('/:id', updateActivity);
router.delete('/:id', deleteActivity);

export default router;
