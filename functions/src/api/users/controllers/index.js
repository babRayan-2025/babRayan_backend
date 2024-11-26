const FirebaseController = require("../../../utils/firebaseCrud");
const User = require("../classes/user");

class UserController {
  static async create(req, res) {
    let firebaseController = new FirebaseController();
    let users = req.body.users; // Assuming req.body.users is an array of user objects

    if (!Array.isArray(users)) {
        return res.status(400).json({ message: "Invalid input. Users should be an array." });
    }

    for (const userData of users) {
        let user = new User();

        user.setName(userData.name);
        user.setEmail(userData.email);
        user.setPhone(userData.phone);

        await firebaseController.create("user", user);
    }

    res.json({ message: "Utilisateurs créés avec succès", users: users });
}


  static async getAll(req, res) {
    let firebaseController = new FirebaseController();
    let users = await firebaseController.getAll("user");

    res.json({
      message: "Liste des utilisateurs récupérée avec succès",
      users: users,
    });
  }

  static async getOne(req, res) {
    let firebaseController = new FirebaseController();
    let userId = req.params.id;

    let user = await firebaseController.read("user", userId);

    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    res.json({ message: "Utilisateur récupéré avec succès", user: user });
  }

  static async deleteOne(req, res) {
    let firebaseController = new FirebaseController();
    let userId = req.params.id;

    try {
      await firebaseController.delete("user", userId);
      res.json({ message: "Utilisateur supprimé avec succès", userId: userId });
    } catch (error) {
      console.error("Error deleting user:", error);
      res
        .status(500)
        .json({ error: "Erreur lors de la suppression de l'utilisateur" });
    }
  }
}

module.exports = UserController;