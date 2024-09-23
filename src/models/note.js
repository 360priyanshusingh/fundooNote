'use strict'
// const { Model } = require('mongoose')
const {Model}=require('sequelize')

module.exports=(sequelize,DataTypes)=>{

    class note extends Model{

        static associate(models) {
            // define association here
          }
    }

    note.init(
        {
            title:DataTypes.STRING,
            description:DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'note'
          }
    );

    return note;

}