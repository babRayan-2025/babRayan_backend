const bcrypt = require('bcrypt');

class User {
  constructor(data) {
    this.name = data.name;
    this.lastName = data.lastName;
    this.age = data.age || null;
    this.role = data.role || 'user';
    this.tel = data.tel || null;
    this.email = data.email;
    this.pic = data.pic || null;
    this.password = data.password;
    this.isVerified = data.isVerified || false;
    this.verificationCode = data.verificationCode || null;  // Add this field to your model
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  async hashPassword() {
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (error) {
      throw new Error('Erreur lors du hachage du mot de passe');
    }
  }

  async verifyPassword(inputPassword) {
    try {
      return await bcrypt.compare(inputPassword, this.password);
    } catch (error) {
      throw new Error('Erreur lors de la vérification du mot de passe');
    }
  }

  toJSON() {
    return {
      name: this.name,
      lastName: this.lastName,
      age: this.age,
      role: this.role,
      tel: this.tel,
      email: this.email,
      pic: this.pic,
      isVerified: this.isVerified,
      verificationCode: this.verificationCode,  // Add this field
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

module.exports = User;
