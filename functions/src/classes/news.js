class News {
    constructor(data) {
      this.id = data.id;
      this.title = data.title;
      this.content = data.content;
      this.pic = data.pic || []; 
      this.likes = data.likes || [];
      this.createdAt = data.createdAt || new Date();
      this.updatedAt = data.updatedAt || new Date();
    }
  
    toJSON() {
      return {
        title: this.title,
        content: this.content,
        pic: this.pic,
        likes: this.likes,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
      };
    }
  }
  
  module.exports = News;