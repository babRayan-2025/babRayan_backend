class Don {
  constructor(data) {
    this.userId = data.userId || null;
    this.montant = data.montant;
    this.type = data.type;
    this.donateurAnonyme = data.donateurAnonyme;
    this.paymentMethod = data.paymentMethod;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();

    // If donateurAnonyme is false, populate userInfo with name, email, and telephone.
    if (!this.donateurAnonyme) {
      this.userInfo = {
        name: data.userInfo?.name || 'N/A',
        email: data.userInfo?.email || 'N/A',
        telephone: data.userInfo?.telephone || 'N/A',
      };
    } else {
      this.userInfo = []; // or null, depending on your preference
    }
  }

  toJSON() {
    return {
      userId: this.userId,
      montant: this.montant,
      type: this.type,
      donateurAnonyme: this.donateurAnonyme,
      userInfo: this.userInfo,
      paymentMethod: this.paymentMethod,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

module.exports = Don;
