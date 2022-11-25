function integrador(sequelize, Datatypes){

    let alias = 'categoria';
    
    let cols = {
      id: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
      nombre: {type: Datatypes.STRING(100)},
    }
    
    let config = {camelCase: false, timestamps: false, tableName: "categoria"}; 
    
    const categorias = sequelize.define(alias,cols,config)
   
    categorias.associate = function (models){
    
        categorias.belongsToMany(models.producto, {
              as: "productos",
              through: "producto_categoria",   // tabla intermedia
              foreignKey: "Categoria_id",  // es el FK del modelo en el que estas (en la tabla intermedia de la bd)
              otherKey: "Producto_id",    // es el FK del otro modelo (en la tabla intermedia de la bd)
              timestamps: false
        });
             
      }
    
    return categorias;
    
    }
    
    module.exports = integrador;