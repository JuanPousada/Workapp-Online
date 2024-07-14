var express = require("express");
var router = express.Router();
var mysql = require("mysql");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const connection = require("../bbdd")

// SIGN UP

exports.register =(req, res) =>{
  const nombre = req.body.nombreRegistro;
  const apellido = req.body.apellidoRegistro;
  const email = req.body.emailRegistro;
  const contrasena = req.body.contrasenaRegistro;
  const contrasenaC = req.body.contrasenaRegistroC;
  const pais = req.body.pais;

  connection.query('SELECT email FROM usuarios WHERE email= ?', [email], async(error, results) => {
    if (error) throw error;
    if (nombre !== '' & apellido !== '' & email !== '' & contrasena !==''){
      if (results.length > 0){
        return res.render('areaCliente',{
            message: 'El mail ingresado está en uso'
            })
        }else if (contrasena !== contrasenaC){
            return res.render('areaCliente',{
            message: 'Las contraseñas no coinciden'
        });
        }
        let hashedContrasena = await bcrypt.hash(contrasena, 8);
        

        connection.query('INSERT INTO usuarios SET ?', {nombre: nombre,apellido: apellido, email: email, contraseña: hashedContrasena}, (error, results)=>{
            if(error){
                console.log (error);
            } else {
                return res.render('areaCliente',{
                    message: 'Usuario Registrado'
            })
            }
        })}else{
            return res.render('areaCliente',{
                message:'Por favor complete todos los campos'
            }

            )
        }
    
    
}
  )
}

//LOGIN

exports.login = (req, res)=>{
  const emailLogin = req.body.emailLogin;
  const contrasenaLogin = req.body.contrasenaLogin;

  if (emailLogin !== '' & contrasenaLogin !== ''){
    connection.query('SELECT email, contraseña FROM usuarios WHERE email= ?', [emailLogin], async(error, results) => {
      if (error) throw error;
      if (results.length > 0){
        connection.query('SELECT contraseña FROM usuarios WHERE email= ?', [emailLogin], async(error, results) =>{
          if (error) throw error;
          let data =JSON.parse(JSON.stringify(results));
          let contraseñaDb = data[0].contraseña;
          console.log(contraseñaDb);
          bcrypt.compare(contrasenaLogin, contraseñaDb,(error, isMatch) =>{
            if(!isMatch){
              res.render('areaCliente',{
                messageLogin: 'Contraseña incorrecta'
              })
            }else{
              res.render('miCuenta')
            }
          })
        })          
      }else{
        res.render('areaCliente',{
          messageLogin: 'No existe usuario registrado con ese mail'
        })
      }
    })
  }else{
    return res.render('areaCliente',{
      messageLogin: 'Por favor complete todos los campos'
    })
  }    
}