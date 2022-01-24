var mysql = require('mysql')
var userDB = mysql.createPool({
    connectionLimit:10,
    host: 'localhost',
    // host: '0.0.0.0',
    user: 'root',
    password:  '',
    // password:  '123goodluck',
    database: process.env.USERSDB || 'node_login',
    // insecureAuth : true
})
// console.log(userDB)

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
        var queries="INSERT INTO rtokens VALUES ?"
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
        userDB.query( 'SELECT * FROM rtokens',
         (err,row,fields) =>{
            if (err) reject(err)
            else resolve(row)
         })
    })
}

const deleteUserTokens = (id) =>{
    return new Promise((resolve,reject)=>{
        userDB.query("DELETE FROM rtokens WHERE id = ?",[id],
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
