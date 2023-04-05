import { NextApiRequest, NextApiResponse } from "next";
import serverAuth2 from '@/lib/server-auth2';
import prismadb from '@/lib/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {

            if (req.method != 'GET') {
            return res.status(405).end();
            }
            await serverAuth2(req, res);

            const { movieId } = req.query;
            if (typeof movieId != 'string') {
            throw new Error('Invalid Id');
            }
            if (!movieId) {
            throw new Error('Missing Id');
            }
            
            const movies = await prismadb.movie.findUnique({
            where: {
                id: movieId
            }
            });

            return res.status(200).json(movies);
    } catch (error) {
            console.log(error);
            return res.status(400).end();
    }
}