const User = require('../../models/users');
const db = require('../../firestore_config/database');

class UserController {
  constructor() {
    this.collection = db.collection('users');
  }

  async create(req, res) {
    try {
      const user = await new User(req.body);
      const data = await this.collection.add(user.toJSON());
      return res.status(201).json({
        status: true,
        data: { id: data.id, ...user.toJSON() },
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error creating user',
        status: false,
        error: error.message,
      });
    }
  }

  async getAll(req, res) {
    try {
      const users = await this.collection.get();

      const data = users.docs.map(doc => ({
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
        message: 'Error getting users',
        error: error.message,
      });
    }
  }

  async getById(req, res) {
    try {
      const user = await this.collection.doc(req.params.id).get();
      if (!user) return res.status(404).json({ message: 'User not found' });
      return res.status(200).json({
        status: true,
        data: { id: user.id, ...user.data() },
      });


    } catch (error) {
      return res.status(500).json({
        message: 'Error retrieving user',
        status: false,
        error: error.message,
      });
    }
  }

  async update(req, res) {
    try {

      const userRef = this.collection.doc(req.params.id);

      // Check if the user exists
      const doc = await userRef.get();
      if (!doc.exists) {
        return res.status(404).json({
          status: false,
          message: 'User not found'
        });
      }

      await userRef.update({
        ...req.body,
        updatedAt: new Date()
      });

      const updatedUser = await userRef.get();

      return res.status(200).json({
        status: true,
        data: updatedUser.data(),
      });

    } catch (error) {
      return res.status(500).json({
        message: 'Error updating user',
        status: false,
        error: error.message,
      });
    }
  }


  async delete(req, res) {
    try {
      const userRef = this.collection.doc(req.params.id);

      // Check if the user exists
      const doc = await userRef.get();
      if (!doc.exists) {
        return res.status(404).json({
          message: 'User not found',
          status: false,
        });
      }

      // Delete the document
      await userRef.delete();

      return res.status(200).json({
        message: 'User deleted successfully',
        status: true
      });

    } catch (error) {
      return res.status(500).json({
        message: 'Error deleting user',
        status: false,
        error: error.message,
      });
    }
  }

}

module.exports = new UserController();