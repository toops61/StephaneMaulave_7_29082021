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
/* User.hasMany(Message, {
    as: 'messages',
    hooks: true,
    onDelete: 'cascade',
    sourceKey: 'id',
    foreignKey: 'USERS_id'
});
Message.belongsTo(User, {
    as: 'user',
    foreignKey: 'USERS_id',
    targetKey: 'id'
}); */