
// DTO
class UserResponse {
    constructor(user) {
      this.id = user.id;
      this.nama = user.nama;
      this.email = user.email;
      this.no_hp = user.no_hp;
    }
  }
  
  module.exports = { UserResponse };
  