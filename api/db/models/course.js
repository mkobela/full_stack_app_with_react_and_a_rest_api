'use strict';

const { Model, DataTypes, Sequelize } = require('sequelize');

/***
 * @function Course
 * @property {object} sequelize
 * @returns {object} Course - Course model
***/
module.exports = (sequelize) => {
  class Course extends Model { }
  Course.init({
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'A title is required'
        },
        notEmpty: {
          msg: 'Please provide a value for "Title"'
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'A description is required'
        },
        notEmpty: {
          msg: 'Please provide a value for "Description"'
        }
      }
    },
    estimatedTime: {
      type: DataTypes.STRING,
      allowNull: true
    },
    materialsNeeded: {
      type: DataTypes.STRING,
      allowNull: true
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'A userId is required'
        },
        notEmpty: {
          msg: 'Please provide a value for "UserId"'
        }
      }
    }
  }, { sequelize });

  Course.associate = (models) => {
    Course.belongsTo(models.User, {
      as: 'user',
      foreignKey: {
        fieldName: 'userId',
        allowNull: false,
      },
    });
  };

  return Course;
};