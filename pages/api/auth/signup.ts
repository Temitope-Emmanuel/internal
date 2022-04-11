// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { AuthService } from '../../../services/auth.service'
import {DB} from '../../../services/db.service'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if(req.method === 'POST'){
        const body = JSON.parse(req.body)
        const newUser = {
            email: body.email,
            password: body.password
        }
        const db = new DB()
        const authService = new AuthService(db)
        const response = await authService.signUp(newUser)
        if(response?.message === 'success'){
            res.status(200).json({ ...response })
        }else{
            res.status(404).json({ ...response })
        }
    }else{
        res.status(404).json({message: 'route not found'})
    }
}
