const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: '34.28.239.166',
    database: 'buses',
    password: `S||vj-30P^J]j"')`,
    port: 5432,
})

const getUsers = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('SELECT * FROM driver WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createDriver = (request, response) => {
    const {
        nid,
        name,
        phone,
        profile_photo_path
    } = request.body
    pool.query('INSERT INTO driver (nid,name,phone, profile_photo_path) VALUES ($1, $2, $3, $4)', [nid,name,phone, profile_photo_path], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Driver added`)
    })
}

const updateDriver = (request, response) => {
    const id = parseInt(request.params.id)
    console.log(id)
    const {
        nid,
        name,
        phone,
        profile_photo_path
    } = request.body
    pool.query('UPDATE driver SET nid = $1, name = $2, phone = $3, profile_photo_path = $4 WHERE id = $5', [nid,name,phone, profile_photo_path, id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Driver modified with ID: ${id}`)
    })
}

const deleteDriver = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('DELETE FROM driver WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Driver deleted with ID: ${id}`)
    })
}

module.exports = {
    getUsers,
    createDriver,
    updateDriver,
    deleteDriver
}