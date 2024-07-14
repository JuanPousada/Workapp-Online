var express = require("express");
var router = express.Router();

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const connection = require("../bbdd")

router.get("/:id_usuario", function (req, res, next) {
  connection.query("select * from usuarios", function (error, results, fields) {
    if (error) throw error;
    res.render("miCuenta", { data: results });
  });
});

//Editar Perfil 

// router.post("/editarPerfil/:id_usuario", upload.single("imagen"), async function (req, res, next) {
//     let sentencia;
//     if (req.file) {
//       sentencia = `update cursos set curso = "${req.body.curso}", imagen = "/images/cursos/${req.file.originalname}", descripcion = "${req.body.descripcion}", duracion = "${req.body.duracion}", modalidad = "${req.body.modalidad}", lugar = "${req.body.lugar}", precio = "${req.body.precio}" where id_curso = ${req.params.id_curso}`;
//       fs.createReadStream("./uploads/" + req.file.filename).pipe(fs.createWriteStream("./public/images/cursos/" + req.file.originalname),function (error) {}
//       );
//     } else {
//       sentencia = `update cursos set curso = "${req.body.curso}", descripcion = "${req.body.descripcion}", duracion = "${req.body.duracion}", modalidad = "${req.body.modalidad}", lugar = "${req.body.lugar}", precio = "${req.body.precio}" where id_curso = ${req.params.id_curso}`;
//     }

//     connection.query(sentencia, function (error, results, fields) {
//       if (error) throw error;
//       res.render("finalizado", { mensaje: "Curso editado correctamente" });
//     });
//   }
// );

module.exports = router;