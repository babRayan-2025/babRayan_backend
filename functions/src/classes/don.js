class Don {
    constructor(data) {
        this.id = data.id;
        this.userId = data.userId; // User ID of the donor
        this.montant = data.montant; // Donation amount
        this.typeDon = data.typeDon; // Type of donation
        this.donateurAnonyme = data.donateurAnonyme; // Anonymous donor
        this.userInfo = data.userInfo || []; 
        this.paymentMethod = data.paymentMethod; // Method of payment
        this.createdAt = data.createdAt || new Date();
        this.updatedAt = data.updatedAt || new Date();
    }

    toJSON() {
        return {
            userId: this.userId,
            montant: this.montant,
            typeDon: this.typeDon,
            donateurAnonyme: this.donateurAnonyme,
            userInfo: this.userInfo,
            paymentMethod: this.paymentMethod,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
}

module.exports = Don;