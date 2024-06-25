import express, { json, request, response } from "express";
import { PrismaClient } from '@prisma/client'
import cors from 'cors'


const prisma = new PrismaClient()

const app = express()
app.use(express.json())
app.use(cors())

app.post('/usuarios', async (req, res) => {

    await prisma.user.create({
        data: {
            email: req.body.Email,
            name: req.body.Name,
            age: req.body.Age
        }
    })
    res.status(201).json(req.body)
})

app.get('/usuarios', async (req, res) => {

    let users = []

    if (req.query) {

        users = await prisma.user.findMany({
            where: {
                name: req.query.Name,
                email: req.query.Email,
                age: req.query.Age
            }
        })

    } else {

        const users = await prisma.user.findMany()

    }



    res.status(200).json(users)
})

app.delete('/usuarios/:id', async (req, res) => {

    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })

    res.status(200).json({ message: "Usuário deletado com sucesso" })
})

app.put('/usuarios/:id', async (req, res) => {

    await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            email: req.body.Email,
            name: req.body.Name,
            age: req.body.Age
        }
    })
    res.status(200).json(req.body)

})


app.listen(3000)

/*
    Criar a API de usuarios

    -Crir um usuário
    -Listar todos os usuários
    -Editar um usuário
    -Deletar um usuário

    Erro 404: Erro cliente (front-end)
    Erro 505: Erro servidor (back-end)

    kayuandiasoli
    CkpBfRBOmZhy5l7S
*/