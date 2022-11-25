function integrador(sequelize, Datatypes){

    alias = 'venta';
    
    cols = {
      id: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
      monto_unitario: {type: Datatypes.DECIMAL(10,0)},
      cantidad: {type: Datatypes.TINYINT(4)},
    }
    
    config = {camelCase: false, timestamps: false, tableName: "venta"}; 
    
    const ventas = sequelize.define(alias,cols,config)
    
    ventas.associate = function (modelos){
    
      ventas.belongsTo(modelos.detalle_venta, {   
        as: "detalleVentas",
        foreignKey: "Detalle_venta_id"
      });

      ventas.belongsTo(modelos.producto, {   
        as: "producto",
        foreignKey: "Producto_id"
      });

      ventas.belongsTo(modelos.usuario, {   
        as: "usuario",
        foreignKey: "Usuario_id"
      });
    
    }
    
    return ventas;
    
    }
    
    module.exports = integrador;