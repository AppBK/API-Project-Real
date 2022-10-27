'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SpotImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // many side of a 1-to-many with table Spots
      SpotImage.belongsTo(models.Spot, { foreignKey: 'spotId' });
    }
  }
  SpotImage.init({
    spotId: {
			type: DataTypes.INTEGER,
      unique: true,
		},
    url: {
			type: DataTypes.STRING,
		},
    preview: {
			type: DataTypes.BOOLEAN,
		},
  }, {
    sequelize,
    modelName: 'SpotImage',
    defaultScope: {
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'spotId'],
      }
    },
    scopes: {
      createSpotImage: {
        attributes: {
          exclude: ['spotId'],
        },
      },
      deleteImage: {
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        }
      },
    },
  });
  return SpotImage;
};
