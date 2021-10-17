module.exports = (sequelize, DataTypes) => {
  return sequelize.define('User', {
    id: {
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
      unique: true
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
      type: DataTypes.DATEONLY
    },
    job: {
      allowNull: false,
      type: DataTypes.STRING
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: 'ce mail existe déjà'
      }
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    photoProfil: {
      allowNull: true,
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