const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('books', {
    ISBN: {
      type: DataTypes.INTEGER,
      allowNule: false,
      primaryKey: true
    },
    author: {
      type: DataTypes.STRING,
      allowNule: false
    },
    language: {
      type: DataTypes.STRING,
      allowNule: false
    },
    pages: {
      type: DataTypes.INTEGER,
      allowNule: false
    },
    type: {
      type: DataTypes.STRING,
      allowNule: false
    },
    editorial: {
      type: DataTypes.STRING,
      allowNule: false
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNule: false,
      defaultValue: 0
    }
  })
}

/*
ISBN, author, language, pages, type, edition, editorial, stock
*/