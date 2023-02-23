'use client';
import SessionButton from '@/components/auth/SessionButton';
import { Button, Grid, Stack } from '@mui/material';
import Link from 'next/link';
export default function Home() {
  return (
    <Grid
      container
      height="100vh"
      alignItems="center"
      justifyContent="center"
      direction="column"
    >
      <h1 className="text-3xl font-bold underline">Hello, Next.js!</h1>
      <Stack direction="row" columnGap={1}>
        <SessionButton />
        <Link href={'/dashboard'}>
          <Button>Goto Dashboard</Button>
        </Link>
      </Stack>
    </Grid>
  );
}
