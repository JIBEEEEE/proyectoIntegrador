function integrador(sequelize, Datatypes){

    let alias = 'color';
    
    let cols = {
      id: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
      nombre: {type: Datatypes.STRING(100)},
    }
    
    let config = {camelCase: false, timestamps: false, tableName: "color"}; 
    
    const colores = sequelize.define(alias,cols,config)
    
    colores.associate = function (modelos){
    
      colores.hasMany(modelos.producto, {   
        as: "productos",
        foreignKey: "Color_id"
      });
    
    }
     
    return colores;
    
    }
    
    
    module.exports = integrador;