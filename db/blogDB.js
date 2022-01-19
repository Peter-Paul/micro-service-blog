var mysql = require('mysql')
var blogDB = mysql.createPool({
    connectionLimit:10,
    host: 'localhost',
    user: process.env.USER || 'root',
    password: process.env.PASSWORD ||'',
    database: process.env.BLOGDB ||'node_blog'
})
const moment = require('moment')

const getAllPosts = async () => {
    return new Promise((resolve,reject)=>{
        blogDB.query('SELECT * FROM posts', (err,rows,fields)=>{
            if (err) reject(err)
            else resolve(rows)
        })
    })
}

const getPost = (id) => {
    return new Promise((resolve,reject)=>{
        blogDB.query( 'SELECT * FROM posts WHERE id = ?', [id],
         (err,row,fields) =>{
            if (err) reject(err)
            else resolve(row)
         })
    })
}

const patchPost = (id,d) => {
    return new Promise((resolve,reject)=>{
        blogDB.query('UPDATE posts SET ? WHERE id = ?',[d, id],
        (err,row,fields) =>{
            if (err) reject(err)
            else resolve(row)
         })
    })
}

const postPost = (d) =>{
    return new Promise((resolve,reject)=>{
        var queries="INSERT INTO posts VALUES ?"
        var values=[[d.id,d.title,d.description,moment().format('LLLL'),d.user]]
        blogDB.query(queries,[values],
            (err,results,fields)=>{
                if (err) reject(err)
                else resolve(results)
            }
        )
    })
}


const deletePost = (id) =>{
    return new Promise((resolve,reject)=>{
        blogDB.query("DELETE FROM posts WHERE id = ?",[id],
        (err,results,feilds)=>{
            if (err) reject(err)
            else resolve(results)
        })
    })
}

const clearPosts = () =>{
    return new Promise((resolve,reject)=>{
        blogDB.query("DELETE FROM posts",
        (err,results,feilds)=>{
            if (err) reject(err)
            else resolve(results)
        })
    })
}

module.exports = {  
    getAllPosts,
    postPost,
    deletePost,
    getPost,
    clearPosts,
    patchPost,
}
