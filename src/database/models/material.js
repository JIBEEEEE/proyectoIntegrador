function integrador(sequelize, Datatypes){

    let alias = 'material';
    
    let cols = {
      id: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
      nombre: {type: Datatypes.STRING(100)},
    }
    
    let config = {camelCase: false, timestamps: false, tableName: "material"}; 
    
    const materiales = sequelize.define(alias,cols,config)
    
    materiales.associate = function (modelos){
    
      materiales.hasMany(modelos.producto, {   
        as: "productos",
        foreignKey: "Material_id"
      });
    
    }
     
    return materiales;
    
    }
    
    module.exports = integrador;