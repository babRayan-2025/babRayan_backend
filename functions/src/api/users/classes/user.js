class NormalUser {
    constructor(name,email,phone) {
        this.name = name;
        this.email = email;
        this.phone = phone;
    }

    setName(name) {
        this.name = name;
    }

    setEmail(email) {
        this.email = email;
    }

    setPhone(phone) {
        this.phone = phone;
    }

    browseEvents() {
        // Code to browse events
    }
}

module.exports = NormalUser;
