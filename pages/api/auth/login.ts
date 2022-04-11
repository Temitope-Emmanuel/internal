// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { authService } from '../../../services'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        const body = JSON.parse(req.body)
        const newUser = {
            email: body.email,
            password: body.password
        }
        const response = await authService.login(newUser)
        if (response?.message === 'success login') {
            res.status(200).json({ ...response })
        } else {
            res.status(404).json({ message: response?.message ?? 'something went wrong' })
        }
    }
    else {
        res.status(404).json({ message: 'route not found' })
    }
}
