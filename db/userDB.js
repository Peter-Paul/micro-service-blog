var mysql = require('mysql')
var userDB = mysql.createPool({
    connectionLimit:10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'node_login'
})

const getAllUsers = async () => {
    return new Promise((resolve,reject)=>{
        userDB.query('SELECT * FROM users', (err,rows,fields)=>{
            if (err) reject(err)
            else resolve(rows)
        })
    })
}

const getUser = (id) => {
    return new Promise((resolve,reject)=>{
        userDB.query( 'SELECT * FROM users WHERE id = ?', [id],
         (err,row,fields) =>{
            if (err) reject(err)
            else resolve(row)
         })
    })
}

const patchUser = (id,d) => {
    return new Promise((resolve,reject)=>{
        userDB.query('UPDATE users SET ? WHERE id = ?',[d, id],
        (err,row,fields) =>{
            if (err) reject(err)
            else resolve(row)
         })
    })
}

const postUser = (d) =>{
    return new Promise((resolve,reject)=>{
        var queries="INSERT INTO users VALUES ?"
        var values=[[d.id,d.username,d.fullname,d.password,d.dp,d.dob,d.bio]]
        userDB.query(queries,[values],
            (err,results,fields)=>{
                if (err) reject(err)
                else resolve(results)
            }
        )
    })
}


const deleteUser = (id) =>{
    return new Promise((resolve,reject)=>{
        userDB.query("DELETE FROM users WHERE id = ?",[id],
        (err,results,feilds)=>{
            if (err) reject(err)
            else resolve(results)
        })
    })
}

const clearUsers = () =>{
    return new Promise((resolve,reject)=>{
        userDB.query("DELETE FROM users",
        (err,results,feilds)=>{
            if (err) reject(err)
            else resolve(results)
        })
    })
}

// user tokens
const postUserToken = (d) =>{
    return new Promise((resolve,reject)=>{
        var queries="INSERT INTO rTokens VALUES ?"
        var values=[[d.key,d.id]]
        userDB.query(queries,[values],
            (err,results,fields)=>{
                if (err) reject(err)
                else resolve(results)
            }
        )
    })
}
const getAllUserTokens = () => {
    return new Promise((resolve,reject)=>{
        userDB.query( 'SELECT * FROM rTokens',
         (err,row,fields) =>{
            if (err) reject(err)
            else resolve(row)
         })
    })
}

const deleteUserTokens = (id) =>{
    return new Promise((resolve,reject)=>{
        userDB.query("DELETE FROM rTokens WHERE id = ?",[id],
        (err,results,feilds)=>{
            if (err) reject(err)
            else resolve(results)
        })
    })
}


module.exports = {  getAllUsers,
                    postUser,
                    deleteUser,
                    getUser,
                    clearUsers,
                    patchUser,
                    postUserToken,
                    getAllUserTokens,
                    deleteUserTokens
                }
