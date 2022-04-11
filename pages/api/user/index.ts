// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { userService } from '../../../services'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    if (req.method === 'PUT') {
        const body = JSON.parse(req.body)
        const newUser = {
            id: body.id,
            email: body.email,
            password: body.password
        }
        console.log('this is the new user', {newUser})
        const response = await userService.updateUser(newUser)

        res.status(200).json(response)
    } else {
        res.status(404).json({ message: 'not found' })
    }
}
