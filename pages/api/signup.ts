// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {authService} from '../../services'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const body = JSON.parse(req.body)
    const newUser = {
        email: body.email,
        password: body.password
    }
    const response = await authService.signUp(newUser)

    console.log({response})

    if(req.method === 'POST'){
        res.status(200).json({ ...response })
    }else{
        res.status(404).json({message: 'route not found'})
    }
}
