import conn from "../config/conn,js";
import { v4 as uuidv4 } from "uuid";
import { request } from "express";

export const getLivros = (request, response) => {
    const sql = /*sql*/ `select * FROM livros`
    conn.query(sql, (err, data) => {
        if(err){
            console.error(err)
            response.status(500).json({err: "Erro ao buscar livros"})
            return
        }
        const livros = data
        response.status(200).json(livros);
    })
};

export const criarLivros = (request, response) => {
    const {titulo, autor, ano_publicacao, genero, preco} = request.body

    //validacoes
    if(!titulo){
        response.status(400).json({err: "O livro é obrigatório"})
        return;
    }

    if(!autor){
        response.status(400).json({err: "O autor é obrigatório"})
        return;
    }

    if(!ano_publicacao){
        response.status(400).json({err: "O ano publicado é obrigatório"})
        return;
    }

    if(!genero){
        response.status(400).json({err: "O genero é obrigatório"})
        return;
    }

    if(!preco){
        response.status(400).json({err: "O preco é obrigatório"})
        return;
    }


    //verificar se o livro não foi cadastrado
    const checkSql = /*sql*/ `select * FROM livros WHERE titulo ="${titulo}" AND autor = "${autor}" AND  ano_publicacao = "${ano_publicacao}"`
    conn.query(checkSql, (err, data) => {
        if(err){
            console.error(err)
            response.status(500).json({err: "Erro ao buscar livros"})
            return
        }

        if(data.length > 0){
            response.status(409).json({err: "Livro já foi cadastrado"})
            return
        }

        //cadastrar o livro
        const id = uuidv4()
        const disponibilidade = 1
        const insertSql = /*sql*/ `INSERT INTO livros(livros_id, titulo, autor, ano_publicacao, genero, preco, disponibilidade) VALUES ("${id}","${titulo}", "${ano_publicacao}", "${genero}", "${preco}", "${disponibilidade}")`;

        conn.query(insertSql, (err) => {
            if(err){
                console.error(err)
                response.status(500).json({err: "Erro ao cadastrar livro"})
                return
            }
            response.status(201).json({message: "Livro Cadastrado"})
        })
    })
};

export const buscarLivros = (request, response) => {
    const {id} = request.params

    const sql = /*sql*/ `SELECT * FROM livros WHERE livro_id = "${id}"`;
    conn.query(sql , (err, data) => {
        if(err){
            console.error(err)
            response.status(500).json({err: "Erro ao buscar livros"})
            return
        }

        if(data.length === 0){
            response.status(404).json({err: "Livro não encontrado"})
            return
        }

        const livro = data[0]
        response.status(200).json(livro)
    })
};

export const editarLivros =  (request, response) => {
    const {id} = request.params
    const {titulo, autor, ano_publicacao, genero, preco, disponibilidade} = request.body
    
        //validacoes
        if(!titulo){
            response.status(400).json({err: "O livro é obrigatório"})
            return;
        }
    
        if(!autor){
            response.status(400).json({err: "O autor é obrigatório"})
            return;
        }
    
        if(!ano_publicacao){
            response.status(400).json({err: "O ano publicado é obrigatório"})
            return;
        }
    
        if(!genero){
            response.status(400).json({err: "O genero é obrigatório"})
            return;
        }
    
        if(!preco){
            response.status(400).json({err: "O preco é obrigatório"})
            return;
        }
    
        if(disponibilidade === undefined){
            response.status(400).json({err: "A disponibilidade é obrigatório"})
            return
        }
        const sql = /*sql*/ `SELECT * FROM livros WHERE livro_id = "${id}"`;
        conn.query(sql , (err, data) => {
            if(err){
                console.error(err)
                response.status(500).json({err: "Erro ao buscar livros"})
                return
            }
    
            if(data.length === 0){
                response.status(404).json({err: "Livro não encontrado"})
                return
            }

            const updateSql = /*sql*/ `UPDATE livros SET titulo = "${titulo}", autor = "${autor}", ano_publicacao = "${ano_publicacao}",genero = "${genero}", preco = "${preco}", disponibilidade = "{disponibilidade}" WHERE livro_id = "${id}"`

            conn.query(updateSql, (err, info) => {
                if(err){
                    console.error(err)
                    response.status(500).json({err: "Erro ao atualizar livro"})
                    return
                    
                }
                console.log(info)
                response.status(200).json({message: "Livro atualizado"})
        })
    })
};

export const deletarLivros = (request, response) => {
    const {id} = request.params

    const deleteSql = /*sql*/ `DELETE FROM livros WHERE livro_id = "${id}"`

    conn.query(deleteSql, (err, info) => {
        if(err){
            console.error(err)
            response.status(500).json({err: "Erro ao deletar livro"})
            return
        }

        if(info.affectedRows === 0){
            response.status(404).json({err: "livro não encontrado"})
            return
        }

        response.status(200).json("Livro Deletado")

    })
};


