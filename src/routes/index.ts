import { Router } from 'express';
import BeerRouter from './Beers';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/beers', BeerRouter);

// Export the base-router
export default router;
