function integrador(sequelize, Datatypes){

    alias = 'producto';
    
    cols = {
      id: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
      nombre: {type: Datatypes.STRING(100)},
      precio: {type: Datatypes.DECIMAL(10,0)},
      fecha_creacion: {type: Datatypes.DATE},
      fecha_baja: {type: Datatypes.DATE},
      imagen: {type: Datatypes.STRING(100)},
      peso: {type: Datatypes.STRING(100)},
      medidas: {type: Datatypes.STRING(100)},
      destacado: {type: Datatypes.BOOLEAN},
      oferta: {type: Datatypes.BOOLEAN}
    }
    
    config = {camelCase: false, timestamps: false, tableName: "producto"}; 
    
    const productos = sequelize.define(alias,cols,config)
    
    productos.associate = function (modelos){
    
      productos.belongsToMany(modelos.categoria, {
            as: "categorias",
            through: "producto_categoria",   // tabla intermedia
            foreignKey: "Producto_id",  // es el FK del modelo en el que estas (en la tabla intermedia de la bd)
            otherKey: "Categoria_id",    // es el FK del otro modelo (en la tabla intermedia de la bd)
            timestamps: false
      });

      productos.belongsTo(modelos.color, {   
        as: "color",
        foreignKey: "Color_id"
      });

      productos.belongsTo(modelos.material, {   
        as: "material",
        foreignKey: "Material_id"
      });

      productos.belongsTo(modelos.usuario, {   
        as: "usuario",
        foreignKey: "Admin_id"
      });

      productos.hasMany(modelos.venta, {   
        as: "ventas",
        foreignKey: "Producto_id"
      });      
    
    }
     
    return productos;
    
    }
    
    module.exports = integrador;