import { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from './auth';
import { getServerSession } from 'next-auth';
import { getSession } from 'next-auth/react';
import prismadb from '../lib/prismadb';

const serverAuth2 = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.email) {
    throw new Error('Not authenticated');
  }
  const currentUser = await prismadb.user.findUnique({
    where: {
      email: session.user.email,
    },
  });
  if (!currentUser) {
    throw new Error('Not authenticated');
  }
  return { currentUser };
};

export default serverAuth2;
