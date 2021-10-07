module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    id: {
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      //autoIncrement: true,
      primaryKey: true
    },
    USERS_id: {
      allowNull: false,
      type: DataTypes.STRING
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING
    },
    article: {
      allowNull: false,
      type: DataTypes.STRING
    },
    attachment: {
      allowNull: true,
      type: DataTypes.DATE
    },
    user_like: {
      allowNull: true,
      type: DataTypes.BOOLEAN
    },
    user_comment: {
      allowNull: true,
      type: DataTypes.STRING
    },
    likes: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  })
  Message.sync();
  return Message;
}

/* 'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {

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
}; */