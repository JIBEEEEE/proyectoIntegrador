function integrador(sequelize, Datatypes){

    let alias = 'local';
    
    let cols = {
      id: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
      nombre: {type: Datatypes.STRING(100)},
    }
    
    let config = {camelCase: false, timestamps: false, tableName: "local"}; 
    
    const locales = sequelize.define(alias,cols,config)
    
    locales.associate = function (models){

      locales.hasMany(models.usuario, {   
        as: "usuarios",
        foreignKey: "Local_id"
      });
   
    }
     
    return locales;
    
    }
    
    module.exports = integrador;