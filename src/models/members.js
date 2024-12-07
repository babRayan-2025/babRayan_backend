class Member {
    constructor(data) {
        this.full_name = data.full_name;
        this.poste = data.poste;
        this.desc = data.desc;
        this.memberPic = data.memberPic
        this.createdAt = data.createdAt || new Date();
        this.updatedAt = data.updatedAt || new Date();
    }

    toJSON() {
        return {
            full_name: this.full_name,
            poste: this.poste,
            desc: this.desc,
            memberPic: this.memberPic,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}

module.exports = Member;
