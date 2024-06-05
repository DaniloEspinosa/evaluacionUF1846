// Cargar los módulos
const express = require('express')
const mysql = require('mysql')
const path = require('path')

// Iniciar las rutas
const router = express.Router()

//Conexión a la base de datos
const configConnection = {
    host: 'localhost',
    user: 'cief',
    password: '123456',
    database: 'uf1846'
}
const connection = mysql.createConnection(configConnection)

let departamentos = []

const selectDepartamentos = 'SELECT DISTINCT(departamento) FROM team GROUP BY departamento'
connection.query(selectDepartamentos, (err, result) => {
    if (err) {
        console.log(err)
    } else {
        departamentos = result
    }
})


// Ruta raíz
router.get('/', (req, res) => {
    const selectAll = 'SELECT * FROM team'
    connection.query(selectAll, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            // res.send('Funcionando')
            res.render('index', { h2: 'Nuestro equipo', result, departamentos })
        }

    })
    // res.send('Bienvenido, funciona el router')
})

// Ruta departamento
router.get('/departamento/:departamento', (req, res) => {
    const departamento = req.params.departamento
    const selectDepartamento = `SELECT * FROM team WHERE departamento = '${departamento}'`
    connection.query(selectDepartamento, (err, result) => {
 
        if (err) {
            console.log(err)
        } else {
            if(result.length === 0) {
                res.render('error', { departamentos })
            }
            res.render('index', { h2: 'Nuestro equipo', result, departamentos })
        }

    })
    // res.send('Bienvenido, funciona el router')
})

router.get('/team/:apellido', (req, res) => {
    const team = req.params.apellido
    const selectTeam = `SELECT * FROM team WHERE apellido = '${team}'`
    connection.query(selectTeam, (err, result) => {
 
        if (err) {
            console.log(err)
        } else {
            if(result.length === 0) {
                res.render('error', { departamentos })
            }
            res.render('index', { h2: 'Nuestro equipo', result, departamentos })
        }

    })
})

module.exports = { router, departamentos }