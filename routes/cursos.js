var express = require("express");
var router = express.Router();

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const fs = require("fs");

const connection = require("../bbdd")

router.get("/", function (req, res, next) {
  connection.query("SELECT * FROM cursos", function (error, results, fields) {
    if (error) throw error;
    res.render("cursos", { data: results });
  });
});

//Administracion

router.get("/adminCursos", function (req, res, next) {
  connection.query("SELECT * FROM cursos", function (error, results, fields) {
    if (error) throw error;
    res.render("adminCursos", { data: results });
  });
});

//Cargar Curso

router.get("/agregarCurso", function (req, res, next) {
  res.render("agregarCurso");
});

router.post("/agregarCurso", upload.single("imagen"), async function (req, res, next) {
  let sentencia = `insert into cursos(curso, imagen, descripcion, duracion, modalidad, lugar, precio) values ("${req.body.curso}","/images/cursos/${req.file.originalname}","${req.body.descripcion}","${req.body.duracion}","${req.body.modalidad}","${req.body.lugar}","${req.body.precio}")`;

  let results = await connection.query(sentencia);

  fs.createReadStream("./uploads/" + req.file.filename).pipe(
    fs.createWriteStream("./public/images/cursos/" + req.file.originalname),
    function (error) {}
  );

  res.render("operacionExitosa", { mensaje: "Curso Ingresado Correctamente" });
});

router.get("/editarCurso/:id_curso", function (req, res, next) {
  connection.query("SELECT * FROM cursos WHERE id_curso = " + req.params.id_curso,
    function (error, results, fields) {
      if (error) throw error;
      res.render("editarCurso", { data: results });
    }
  );
});

//Editar Curso

router.post(
  "/editarCurso/:id_curso",
  upload.single("imagen"),
  async function (req, res, next) {
    let sentencia;

    if (req.file) {
      sentencia = `update cursos set curso = "${req.body.curso}", imagen = "/images/cursos/${req.file.originalname}", descripcion = "${req.body.descripcion}", duracion = "${req.body.duracion}", modalidad = "${req.body.modalidad}", lugar = "${req.body.lugar}", precio = "${req.body.precio}" where id_curso = ${req.params.id_curso}`;
      fs.createReadStream("./uploads/" + req.file.filename).pipe(fs.createWriteStream("./public/images/cursos/" + req.file.originalname),function (error) {}
      );
    } else {
      sentencia = `update cursos set curso = "${req.body.curso}", descripcion = "${req.body.descripcion}", duracion = "${req.body.duracion}", modalidad = "${req.body.modalidad}", lugar = "${req.body.lugar}", precio = "${req.body.precio}" where id_curso = ${req.params.id_curso}`;
    }

    connection.query(sentencia, function (error, results, fields) {
      if (error) throw error;
      res.render("operacionExitosa", { descripcion: "Su curso se ha editado correctamente" });
    });
  }
);

//Eliminar Curso

router.get("/eliminarCurso/:id_curso", function (req, res, next) {
  connection.query(
    "SELECT * FROM cursos WHERE id_curso = " + req.params.id_curso,
    function (error, results, fields) {
      if (error) throw error;
      res.render("eliminarCurso", { data: results });
    }
  );
});

router.post("/eliminarCurso/:id_curso", function (req, res, next) {
  connection.query(
    "delete from cursos where id_curso = " + req.params.id_curso,
    function (error, results, fields) {
      if (error) throw error;
      res.render("operacionExitosa", { descripcion: "El curso se ha eliminado correctamente" });
    }
  );
});

module.exports = router;
