const Members = require('../../models/members');
const db = require('../../firestore_config/database');

class membersController {
    constructor() {
        this.collection = db.collection('members');
    }

    async create(req, res) {
        try {
            const members = new Members(req.body);
            const data = await this.collection.add(members.toJSON());
            return res.status(201).json({
                status: true,
                data: { id: data.id, ...members.toJSON() },
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Error creating members item',
                status: false,
                error: error.message,
            });
        }
    }

    async getAll(req, res) {
        try {
            const membersCollection = await this.collection.get();
            const data = membersCollection.docs.map(doc => ({
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
                message: 'Error retrieving members items',
                error: error.message,
            });
        }
    }

    async getById(req, res) {
        try {
            const members = await this.collection.doc(req.params.id).get();
            if (!members.exists) return res.status(404).json({ message: 'Members item not found' });
            return res.status(200).json({
                status: true,
                data: { id: members.id, ...members.data() },
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Error retrieving members item',
                status: false,
                error: error.message,
            });
        }
    }

    async update(req, res) {
        try {
            const membersRef = this.collection.doc(req.params.id);
            const doc = await membersRef.get();
            if (!doc.exists) {
                return res.status(404).json({
                    status: false,
                    message: 'Members item not found',
                });
            }

            await membersRef.update({
                ...req.body,
                updatedAt: new Date()
            });

            const updatedmembers = await membersRef.get();

            return res.status(200).json({
                status: true,
                data: updatedmembers.data(),
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Error updating members item',
                status: false,
                error: error.message,
            });
        }
    }

    async delete(req, res) {
        try {
            const membersRef = this.collection.doc(req.params.id);
            const doc = await membersRef.get();
            if (!doc.exists) {
                return res.status(404).json({
                    message: 'Members item not found',
                    status: false,
                });
            }

            await membersRef.delete();

            return res.status(200).json({
                message: 'Members item deleted successfully',
                status: true,
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Error deleting members item',
                status: false,
                error: error.message,
            });
        }
    }
}

module.exports = new membersController();
