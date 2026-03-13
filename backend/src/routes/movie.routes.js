import express from 'express';
import {
    getAllMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie,
    getMovieStats,
    getSimilarMovies
} from '../controllers/movie.controller.js';

const router = express.Router();

router.get('/', getAllMovies);
router.get('/stats', getMovieStats);
router.get('/:id', getMovieById);
router.get('/:id/similar', getSimilarMovies);

router.post('/', createMovie);
router.put('/:id', updateMovie);
router.delete('/:id', deleteMovie);

export default router;