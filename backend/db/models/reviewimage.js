'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ReviewImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // many side of 1-to-many with table Reviews
      ReviewImage.belongsTo(models.Review, { foreignKey: 'reviewId' });
    }
  }
  ReviewImage.init({
    reviewId: {
			type: DataTypes.INTEGER,
		},
    url: {
			type: DataTypes.STRING,
		},
  }, {
    sequelize,
    modelName: 'ReviewImage',
    scopes: {
      createImage: {
        attributes: {
          exclude: ['reviewId', 'createdAt', 'updatedAt'],
        }
      },
      currentReview: {
        attributes: {
          exclude: [ 'reviewId', 'createdAt', 'updatedAt' ],
        },
      }
    }
  });
  return ReviewImage;
};
