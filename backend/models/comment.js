module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Message', {
    id: {
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
      unique: true
    },
    USERS_id: {
      allowNull: false,
      type: DataTypes.STRING
    },
    user_pseudo: {
      allowNull: false,
      type: DataTypes.STRING
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING
    },
    article: {
      allowNull: true,
      type: DataTypes.STRING
    },
    linkURL: {
      allowNull: true,
      type: DataTypes.STRING
    },
    attachment: {
      allowNull: true,
      type: DataTypes.STRING
    },
    users_comments: {
      allowNull: true,
      type: DataTypes.STRING
    },
    likes: {
      allowNull: true,
      type: DataTypes.STRING
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
}