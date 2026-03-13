import Movie from '../models/Movie.js';

export const getAllMovies = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const query = {};
        if (req.query.genre) query.genre = req.query.genre;
        if (req.query.year) query.year = req.query.year;
        if (req.query.search) {
            query.$or = [{ title: { $regex: req.query.search, $options: 'i' } }];
        }

        const sortOption = req.query.sort ? { [req.query.sort]: -1 } : { createdAt: -1 };

        const movies = await Movie.find(query)
            .sort(sortOption)
            .skip(skip)
            .limit(limit);

        const total = await Movie.countDocuments(query);

        res.status(200).json({
            success: true,
            count: movies.length,
            total,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            data: movies
        });
    } catch (error) {
        next(error);
    }
};

export const getMovieById = async (req, res, next) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(404).json({ success: false, message: "Not Found" });
        res.status(200).json({ success: true, data: movie });
    } catch (error) {
        next(error);
    }
};

export const createMovie = async (req, res, next) => {
    try {
        const { title, description, poster, backdrop, genre, year, duration, price, rating } = req.body;
        const movie = await Movie.create({ title, description, poster, backdrop, genre, year, duration, price, rating });
        res.status(201).json({ success: true, data: movie });
    } catch (error) {
        next(error);
    }
};

export const updateMovie = async (req, res, next) => {
    try {
        const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedMovie) return res.status(404).json({ success: false, message: "Not Found" });
        res.status(200).json({ success: true, data: updatedMovie });
    } catch (error) {
        next(error);
    }
};

export const deleteMovie = async (req, res, next) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(404).json({ success: false, message: "Not Found" });
        await movie.deleteOne();
        res.status(200).json({ success: true, message: "Deleted" });
    } catch (error) {
        next(error);
    }
};

export const getMovieStats = async (req, res, next) => {
    try {
        const stats = await Movie.aggregate([
            { $group: { _id: null, total: { $sum: { $multiply: ['$price', '$rentalCount'] } } } }
        ]);
        res.status(200).json({ success: true, data: stats });
    } catch (error) {
        next(error);
    }
};

export const getSimilarMovies = async (req, res, next) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(404).json({ success: false, message: "Not Found" });
        
        const similarMovies = await Movie.find({
            genre: { $in: movie.genre },
            _id: { $ne: movie._id },
            isAvailable: true
        }).sort({ rating: -1 }).limit(6);
        
        res.status(200).json({ success: true, data: similarMovies });
    } catch (error) {
        next(error);
    }
};