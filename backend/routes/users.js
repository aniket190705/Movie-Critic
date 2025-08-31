const router = require('express').Router();
const User = require('../models/user');
const Review = require('../models/review');
const Movie = require('../models/movie');
const auth = require('../middleware/auth');

// GET /api/users/:id - Retrieve user profile and review history
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });

        const reviews = await Review.find({ user: user._id }).populate('movie', 'title posterUrl');

        res.json({ user, reviews });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// PUT /api/users/:id - Update user profile (auth required and only self)
router.put('/:id', auth, async (req, res) => {
    try {
        if (req.user.id !== req.params.id) {
            return res.status(403).json({ message: 'Unauthorized to update this profile' });
        }
        const updates = req.body;
        if (updates.password) delete updates.password; // Don't allow password change here for simplicity

        const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true }).select('-password');
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// GET /api/users/:id/watchlist - Retrieve user's watchlist
router.get('/:id/watchlist', auth, async (req, res) => {
    try {
        if (req.user.id !== req.params.id) return res.status(403).json({ message: 'Unauthorized' });

        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Assuming watchlist stored as array of movie ObjectIds inside user schema (modify if needed)
        await user.populate({
            path: 'watchlist',
            select: 'title genre releaseYear posterUrl'
        });

        res.json(user.watchlist || []);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// POST /api/users/:id/watchlist - Add movie to watchlist
router.post('/:id/watchlist', auth, async (req, res) => {
    try {
        if (req.user.id !== req.params.id) return res.status(403).json({ message: 'Unauthorized' });

        const { movieId } = req.body;
        const movie = await Movie.findById(movieId);
        if (!movie) return res.status(404).json({ message: 'Movie not found' });

        const user = await User.findById(req.params.id);
        user.watchlist = user.watchlist || [];

        // Prevent duplicates
        if (user.watchlist.includes(movieId)) {
            return res.status(400).json({ message: 'Movie already in watchlist' });
        }

        user.watchlist.push(movieId);
        await user.save();

        res.json({ message: 'Movie added to watchlist' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// DELETE /api/users/:id/watchlist/:movieId - Remove movie from watchlist
router.delete('/:id/watchlist/:movieId', auth, async (req, res) => {
    try {
        if (req.user.id !== req.params.id) return res.status(403).json({ message: 'Unauthorized' });

        const user = await User.findById(req.params.id);
        if (!user.watchlist) return res.status(400).json({ message: 'Watchlist empty' });

        user.watchlist = user.watchlist.filter(movId => movId.toString() !== req.params.movieId);
        await user.save();

        res.json({ message: 'Movie removed from watchlist' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports = router;
