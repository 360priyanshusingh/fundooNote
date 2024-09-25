'use strict'
// const { Model } = require('mongoose')
const {Model}=require('sequelize')

module.exports=(sequelize,DataTypes)=>{

    class note extends Model{

        static associate(models) {
            // define association here
            // Note.belongsTo(models.User, {
            //     foreignKey: 'userId',
            //     as: 'user'  // You can give it an alias, or use 'User' directly
            // });
          }
    }

    note.init(
        {
            // id: {
            //     type: DataTypes.INTEGER,
            //     primaryKey: true,
            //     autoIncrement: true,
            //   },
            //   userId: {
            //     type: DataTypes.INTEGER,
            //     allowNull: false,
            //     references: {
            //       model: 'Users',
            //       key: 'id',
            //     }
            // },
            email:DataTypes.STRING,
            title:DataTypes.STRING,
            description:DataTypes.STRING,
            isTrash: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            isArchive: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },


        },
        {
            sequelize,
            modelName: 'note'
          }
    );

    return note;

}