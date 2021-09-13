'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Message.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      })
    }
  };
  Message.init({
    USERS_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    article: DataTypes.STRING,
    attachment: DataTypes.STRING,
    user_like: DataTypes.INTEGER,
    likes: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};