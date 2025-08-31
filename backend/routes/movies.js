const router = require('express').Router();
const Movie = require('../models/movie');
const Review = require('../models/review');
const auth = require('../middleware/auth');

// GET /api/movies - Retrieve all movies (with optional pagination + filtering)
router.get('/', async (req, res) => {
    try {
        const { page = 1, limit = 10, genre, year, rating } = req.query;

        // Build filter query object
        let filter = {};
        if (genre) filter.genre = genre;
        if (year) filter.releaseYear = parseInt(year);
        if (rating) filter.averageRating = { $gte: parseFloat(rating) };

        const movies = await Movie.find(filter)
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const total = await Movie.countDocuments(filter);

        res.json({ total, page: parseInt(page), movies });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// GET /api/movies/:id - Retrieve a specific movie with reviews
router.get('/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(404).json({ message: 'Movie not found' });

        // Fetch reviews and populate user info
        const reviews = await Review.find({ movie: movie._id }).populate('user', 'username profilePic');

        res.json({ movie, reviews });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// POST /api/movies/:id/reviews - Submit a new review for a movie (auth required)
router.post('/:id/reviews', auth, async (req, res) => {
    try {
        const { rating, text } = req.body;
        if (!rating || rating < 1 || rating > 5) {
            return res.status(400).json({ message: 'Rating must be between 1 and 5' });
        }

        const movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(404).json({ message: 'Movie not found' });

        // Create and save new review
        const review = new Review({
            user: req.user.id,
            movie: movie._id,
            rating,
            text,
        });
        await review.save();

        // Update average rating
        const reviews = await Review.find({ movie: movie._id });
        const avgRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
        movie.averageRating = avgRating.toFixed(2);
        await movie.save();

        res.status(201).json(review);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// POST /api/movies - Add a new movie (admin only - placeholder for now)
router.post('/', auth, async (req, res) => {
    // For now, skipping admin validation for speed
    try {
        const { title, genre, releaseYear, director, cast, synopsis, posterUrl } = req.body;
        if (!title) return res.status(400).json({ message: 'Title is required' });

        const movie = new Movie({
            title,
            genre,
            releaseYear,
            director,
            cast,
            synopsis,
            posterUrl,
            averageRating: 0,
        });

        await movie.save();
        res.status(201).json(movie);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports = router;
