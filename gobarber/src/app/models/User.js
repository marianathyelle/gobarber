import Sequelize, { Model } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    console.log('Initting User');
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize,
        modelName: 'users',
      }
    );
  }
}

export default User;
