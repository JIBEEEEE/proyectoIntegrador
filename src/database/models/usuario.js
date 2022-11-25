function integrador(sequelize, Datatypes){

    let alias = 'usuario';
    
    let cols = {
      id: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
      nombre: {type: Datatypes.STRING(100)},
      apellido: {type: Datatypes.STRING(100)},
      email: {type: Datatypes.STRING(100)},
      clave: {type: Datatypes.STRING(100)},
      imagen: {type: Datatypes.STRING(100)},
      rol: {type: Datatypes.ENUM('comun','administrador','superadministrador')}
    }
    
    let config = {camelCase: false, timestamps: false, tableName: "usuario"}; 
    
    const usuarios = sequelize.define(alias,cols,config)
    
    usuarios.associate = function (models){

      usuarios.belongsTo(models.local, {   
          as: "locales",
          foreignKey: "Local_id"
          });
  
          usuarios.hasMany(models.producto, {   
          as: "productos",
          foreignKey: "Admin_id"
        });
        

        usuarios.hasMany(models.venta, {   
          as: "ventas",
          foreignKey: "Usuario_id"
        }); 
  
    }
    
    return usuarios;
    
    }
    
    
    module.exports = integrador;