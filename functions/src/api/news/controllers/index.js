const News = require('../../../classes/news'); // Adjust path if necessary
const db = require('../../../config/firebase'); // Adjust path if necessary

class NewsController {
    constructor() {
        this.collection = db.collection('news');
    }
    async create(req, res) {
        try {
            const news = new News(req.body);
            const data = await this.collection.add(news.toJSON());
            return res.status(201).json({
                status: true,
                data: { id: data.id, ...news.toJSON() },
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Error creating news item',
                status: false,
                error: error.message,
            });
        }
    }
    async getAll(req, res) {
        try {
            const newsCollection = await this.collection.get();
            const data = newsCollection.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            return res.status(200).json({
                status: true,
                data,
            });
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: 'Error retrieving news items',
                error: error.message,
            });
        }
    }
    async getById(req, res) {
        try {
            const news = await this.collection.doc(req.params.id).get();
            if (!news.exists) return res.status(404).json({ message: 'News item not found' });
            return res.status(200).json({
                status: true,
                data: { id: news.id, ...news.data() },
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Error retrieving news item',
                status: false,
                error: error.message,
            });
        }
    }
    async update(req, res) {
        try {
            const newsRef = this.collection.doc(req.params.id);
            const doc = await newsRef.get();
            if (!doc.exists) {
                return res.status(404).json({
                    status: false,
                    message: 'News item not found',
                });
            }
            await newsRef.update({
                ...req.body,
                updatedAt: new Date()
            });
            const updatedNews = await newsRef.get();
            return res.status(200).json({
                status: true,
                data: updatedNews.data(),
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Error updating news item',
                status: false,
                error: error.message,
            });
        }
    }
    async delete(req, res) {
        try {
            const newsRef = this.collection.doc(req.params.id);
            const doc = await newsRef.get();
            if (!doc.exists) {
                return res.status(404).json({
                    message: 'News item not found',
                    status: false,
                });
            }
            await newsRef.delete();
            return res.status(200).json({
                message: 'News item deleted successfully',
                status: true,
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Error deleting news item',
                status: false,
                error: error.message,
            });
        }
    }
}
module.exports = new NewsController();