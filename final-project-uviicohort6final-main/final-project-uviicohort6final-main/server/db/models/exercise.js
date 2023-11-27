'use strict';

module.exports = (sequelize, DataTypes) => {
  const Exercise = sequelize.define('exercise', {
    exercise_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.STRING
    },
    picture: {
      type: DataTypes.STRING
    },
    bodyweight: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    createdAt: {
      type: 'TIMESTAMP',
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false
    },
    updatedAt: {
      type: 'TIMESTAMP',
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false
  }
  });

  return Exercise;
};
