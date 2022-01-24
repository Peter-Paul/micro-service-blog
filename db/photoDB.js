var mysql = require('mysql')
var photoDB = mysql.createPool({
    connectionLimit:10,
    host: 'localhost',
    user: 'root',
    password: '',
    // password: '123goodluck',
    database: 'node_gallery'
})

const getAllPhotos = async () => {
    return new Promise((resolve,reject)=>{
        photoDB.query('SELECT * FROM photos', (err,rows,fields)=>{
            if (err) reject(err)
            else resolve(rows)
        })
    })
}

const getPhoto = (id) => {
    return new Promise((resolve,reject)=>{
        photoDB.query( 'SELECT * FROM photos WHERE id = ?', [id],
         (err,row,fields) =>{
            if (err) reject(err)
            else resolve(row)
         })
    })
}

const postPhoto = (d) =>{
    return new Promise((resolve,reject)=>{
        var queries="INSERT INTO photos VALUES ?"
        var values=[[d.id,d.title,d.url,d.album]]
        photoDB.query(queries,[values],
            (err,results,fields)=>{
                if (err) reject(err)
                else resolve(results)
            }
        )
    })
}

module.exports = {  
    getAllPhotos,
    postPhoto,
    getPhoto,
}
