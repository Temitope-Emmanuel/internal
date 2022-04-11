// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { todoService } from '../../../services'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    if (req.method === 'GET') {
        const todos = await todoService.getTodo()
        res.status(200).json({ message: 'success', data: todos })
    } else if (req.method === 'POST') {
        const body = JSON.parse(req.body)
        const newTodo = {
            title: body.title,
            type: 'completed',
            description: body.description
        }
        const response = await todoService.createTodo(newTodo)

        res.status(200).json(response)
    } else if (req.method === 'PUT') {
        const body = JSON.parse(req.body)
        if (body.id) {
            const response = await todoService.updateTodo(body.id, body.type)
            if (response.message === 'update successful') {
                res.status(200).json(response)
            }else{
                res.status(404).json('something went wrong')
            }
        }else{
            res.status(404).json({ message: 'invalid request body' })
        }
    }else if (req.method === 'DELETE') {
        const body = JSON.parse(req.body)
        if (body.id) {
            const response = await todoService.deleteTodo(body.id)
            if (response?.message === 'deleted successful') {
                res.status(200).json(response)
            }
        }else{
            res.status(404).json({ message: 'not found' })
        }
    }
}
