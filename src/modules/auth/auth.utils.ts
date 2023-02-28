import { cookies } from 'next/headers';

const authData = {
  token: '123',
  profile: {
    email: 'jonh.doe@mail.com',
  },
  status: 'AUTHORIZED',
};

// recupera la sessione lato server
export async function getServerSession() {
  return authData;
  const data = cookies();
  if (data.has('auth')) {
    return data.get('auth');
  }
  return null;
}
