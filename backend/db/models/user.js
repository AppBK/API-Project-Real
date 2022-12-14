'use strict';
const bcrypt = require('bcryptjs');

const {
  Model,
  Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    toSafeObject() {
      // Is this just making sure that the user object ONLY contains the data we want?...YES!!!
      const { id, firstName, lastName, username, email } = this;
      return { id, firstName, lastName, username, email };
    }

    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    }

    static getCurrentUserById(id) {
      return User.scope('currentUser').findByPk(id);
    }

    static async login({ credential, password }) {
      const { Op } = require('sequelize');
      const user = await User.scope('loginUser').findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential
          }
        }
      });
      if (user && user.validatePassword(password)) {
        return await User.scope('currentUser').findByPk(user.id);
      }
    }

    static async signup({ username, email, password, firstName, lastName }) {
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        username,
        email,
        hashedPassword,
        firstName,
        lastName
      });
      return await User.scope('currentUser').findByPk(user.id);
    }

    static associate(models) {
      // define association here
      // The 1 side of the 1-to-many with table Spots
      User.hasMany(models.Spot, { foreignKey: 'ownerId', onDelete: 'CASCADE', hooks: true });
      // The 1 side of the 1-to-many with table Bookings
      User.hasMany(models.Booking, { foreignKey: 'userId', onDelete: 'CASCADE', hooks: true });
      // The 1 side of the 1-to-many with table Reviews
      User.hasMany(models.Review, { foreignKey: 'userId', onDelete: 'CASCADE', hooks: true });

      // User.belongsToMany(models.Spot, { through: models.Booking, foreignKey: 'spotId', onDelete: 'CASCADE', hooks: true });
    }
  };

  User.init({
    firstName: {
      type: DataTypes.STRING,
      validate: {
        len: [0, 256],
      }
    },
    lastName: {
      type: DataTypes.STRING,
      validate: {
        len: [0, 256],
      }
    },
    username:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error("Cannot be an email.");
          }
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 256],
        isEmail: true,
      }
    },
    hashedPassword: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [60, 60],
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt'],
      }
    },
    scopes: {
      currentUser: {
        attributes: { exclude: ["hashedPassword", 'createdAt', 'updatedAt']},
      },
      loginUser: {
        attributes: {}
      },
      getOwner: {
        attributes: { exclude: ['username', 'hashedPassword', 'email', 'createdAt', 'updatedAt'] },
      }
    }
  });
  return User;
};
