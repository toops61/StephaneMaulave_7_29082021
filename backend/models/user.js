module.exports = (sequelize, DataTypes) => {
  return sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    lastname: {
      allowNull: false,
      type: DataTypes.STRING
    },
    firstname: {
      allowNull: false,
      type: DataTypes.STRING
    },
    pseudo: {
      allowNull: false,
      type: DataTypes.STRING
    },
    birthdate: {
      allowNull: false,
      type: DataTypes.DATE
    },
    job: {
      allowNull: false,
      type: DataTypes.STRING
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: {
        msg: 'ce mail existe déjà'
      }
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    isAdmin: {
      allowNull: false,
      type: DataTypes.BOOLEAN
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