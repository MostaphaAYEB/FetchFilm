import Rental from "../models/Rental.js";
import Movie from "../models/Movie.js";
import User from "../models/User.js";

export const createRental = async (req, res, next) => {
    try {
        const { movieId } = req.body;
        const userId = req.user ? req.user._id : "ID_UTILISATEUR_TEMPORAIRE";
        const rental = await Rental.create({ user: userId, movie: movieId });
        res.status(201).json({ success: true, data: rental });
    } catch (error) {
        next(error);
    }
};

export const getMyRentals = async (req, res, next) => {
    try {
        const userId = req.user ? req.user._id : "ID_UTILISATEUR_TEMPORAIRE";
        const rentals = await Rental.find({ user: userId }).populate('movie');
        res.status(200).json({ success: true, data: rentals });
    } catch (error) {
        next(error);
    }
};

export const getAllRentals = async (req, res, next) => {
    try {
        const rentals = await Rental.find().populate('movie').populate('user');
        res.status(200).json({ success: true, data: rentals });
    } catch (error) {
        next(error);
    }
};

export const cancelRental = async (req, res, next) => {
    try {
        const rental = await Rental.findById(req.params.id);
        if (!rental) return res.status(404).json({ success: false, message: "Not Found" });
        await rental.deleteOne();
        res.status(200).json({ success: true, message: "Deleted" });
    } catch (error) {
        next(error);
    }
};

export const getRentalStats = async (req, res, next) => {
    try {
        const stats = await Rental.aggregate([
            { $group: { _id: "$status", count: { $sum: 1 } } }
        ]);
        res.status(200).json({ success: true, data: stats });
    } catch (error) {
        next(error);
    }
};

export const getRecommendations = async (req, res, next) => {
    try {
        const userId = req.user ? req.user._id : "ID_UTILISATEUR_TEMPORAIRE";
        const pastRentals = await Rental.find({ user: userId }).populate('movie');
        
        if (!pastRentals.length) {
            const popularMovies = await Movie.find({ isAvailable: true }).sort({ rating: -1 }).limit(5);
            return res.status(200).json({ success: true, data: popularMovies });
        }

        const genres = pastRentals.flatMap(r => r.movie.genre);
        const rentedMovieIds = pastRentals.map(r => r.movie._id);

        const recommendations = await Movie.find({
            genre: { $in: genres },
            _id: { $nin: rentedMovieIds },
            isAvailable: true
        }).sort({ rating: -1 }).limit(5);

        res.status(200).json({ success: true, data: recommendations });
    } catch (error) {
        next(error);
    }
};