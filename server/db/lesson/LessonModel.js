module.exports = (sequelize, DataTypes) => {

  const Lesson = sequelize.define('Lesson', {
    name: {
      type: DataTypes.STRING
    },
    details: {
      type: DataTypes.TEXT
    },
    rating: {
      type: DataTypes.TEXT
    },
    price: {
      type: DataTypes.DECIMAL
    },
    youtubeKey: {
      type: DataTypes.TEXT
    }
  }, {
    freezeTableName: true,
    classMethods: {
      associate: (models) => {
        Lesson.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          },
          onDelete: 'CASCADE'
        });
        Lesson.belongsTo(models.Category, {
          foreignKey: {
            allowNull: false
          },
          onDelete: 'CASCADE'
        });
        Lesson.belongsTo(models.Chatroom, {
          foreignKey: {
            allowNull: false
          },
          onDelete: 'CASCADE'
        });
      }
    }
  });

  return Lesson;
};
