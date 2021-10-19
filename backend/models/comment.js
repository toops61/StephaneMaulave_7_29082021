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
}

/* module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    id: {
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    USERS_id: {
      allowNull: false,
      type: DataTypes.STRING,
      onDelete: 'CASCADE',
      references: {
        model: 'User',
        key: 'id',
        as: 'USERS_id'
      }
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
} */