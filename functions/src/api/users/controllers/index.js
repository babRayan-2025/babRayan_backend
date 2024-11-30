const User = require('../../../classes/user'); // Adjust path if necessary
const db = require('../../../config/firebase'); // Adjust path if necessary

class UserController {
  constructor() {
    this.collection = db.collection('users');
  }


  async getAll(req, res) {
    try {
      const users = await this.collection.get();

      const data = users.docs.map((doc) => ({
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
      const userDoc = await this.collection.doc(req.params.id).get();

      if (!userDoc.exists) {
        return res.status(404).json({ message: 'User not found', status: false });
      }

      return res.status(200).json({
        status: true,
        data: { id: userDoc.id, ...userDoc.data() },
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
      const doc = await userRef.get();

      if (!doc.exists) {
        return res.status(404).json({ message: 'User not found', status: false });
      }

      const updates = { ...req.body, updatedAt: new Date() };
      await userRef.update(updates);

      const updatedUser = await userRef.get();

      return res.status(200).json({
        status: true,
        data: { id: updatedUser.id, ...updatedUser.data() },
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
      const doc = await userRef.get();

      if (!doc.exists) {
        return res.status(404).json({ message: 'User not found', status: false });
      }

      await userRef.delete();

      return res.status(200).json({
        message: 'User deleted successfully',
        status: true,
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
