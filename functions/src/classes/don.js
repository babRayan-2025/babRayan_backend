class Don {
    constructor(data) {
        this.id = data.id;
        this.userId = data.userId;
        this.montant = data.montant;
        this.typeDon = data.typeDon;
        this.donateurAnonyme = data.donateurAnonyme;
        this.userInfo = data.userInfo || [];
        this.paymentMethod = data.paymentMethod;
        this.status = data.status || 'pending'; // Status: pending, paid, failed
        this.transactionId = data.transactionId || null; // Transaction ID from CMI
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
            status: this.status,
            transactionId: this.transactionId,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
}

module.exports = Don;
