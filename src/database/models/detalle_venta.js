function integrador(sequelize, Datatypes){

    let alias = 'detalle_venta';
    
    cols = {
      id: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
      fecha: {type: Datatypes.DATE},
      monto_total: {type: Datatypes.DECIMAL(10,0)}
    }
    
    config = {camelCase: false, timestamps: false, tableName: "detalle_venta"}; 
    
    const DetalleVenta = sequelize.define(alias,cols,config)
    
    DetalleVenta.associate = function (modelos){

      DetalleVenta.hasMany(modelos.venta, {   
        as: "ventas",
        foreignKey: "Detalle_venta_id"
      });   
    
    }
    
    return DetalleVenta;
    
    }
    
    module.exports = integrador;