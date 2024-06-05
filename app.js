// Cargar los módulos
const express = require('express')
// const bodyParser = require('body-parser')

// Importar las rutas
const { router, departamentos } = require('./router.js')

// Crear la aplicación
const app = express()

// Definir el puerto de conexión
const port = process.env.PORT || 3000

// Definir el motor de plantillas
app.set('view engine', 'ejs')

// Configurar bodyParser
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Definir la carpeta de los ficheros estáticos
// Esto debe estar creado antes de llamar las rutas
app.use(express.static('public'))

// Utilizar las rutas del fichero router
app.use(router)

// Definir que hacer en caso de error
app.use((req,res) => {
    res.status(404).render('error')
})


// Poner el servidor en escucha
app.listen(port, () => console.log(`Servidor funcionando en http://localhost:${port}`))