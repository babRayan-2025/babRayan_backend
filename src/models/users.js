class User {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.lastName = data.lastName;
    this.age = data.age || null;
    this.role = data.role;
    this.tel = data.tel || null;
    this.email = data.email;
    this.pic = data.pic || null;
    this.password = data.password ;
    this.isVerified = data.isVerified ;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
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
      password: this.password,
      isVerified: this.isVerified,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

module.exports = User;