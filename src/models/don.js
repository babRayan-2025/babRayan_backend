class Don {
    constructor(data) {
      this.id = data.id;
      this.userId = data.userId; // User ID of the donor
      this.montant = data.montant; // Donation amount
      this.paymentMethod = data.paymentMethod; // Method of payment
      this.createdAt = data.createdAt || new Date();
      this.updatedAt = data.updatedAt || new Date();
    }
  
    toJSON() {
      return {
        userId: this.userId,
        montant: this.montant,
        paymentMethod: this.paymentMethod,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
      };
    }
  }
  
  module.exports = Don;
  