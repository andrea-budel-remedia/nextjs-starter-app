'use client';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
import { PropsWithChildren } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function SessionButton(props: PropsWithChildren) {
  const session = useSession();

  return session?.data?.user ? (
    <Card>
      <CardContent>
        <Typography>{`Hi, ${session.data.user.email}`}</Typography>
      </CardContent>
      <CardActions>
        <Button color="secondary" variant="contained" onClick={() => signOut()}>
          Sign out
        </Button>
      </CardActions>
    </Card>
  ) : (
    <Button onClick={() => signIn()}>Sign In</Button>
  );
}
