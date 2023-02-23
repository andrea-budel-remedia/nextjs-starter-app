import { Meta, StoryObj } from '@storybook/react';
import { SessionProvider } from 'next-auth/react';
import SessionButton from '.';

const meta: Meta<typeof SessionButton> = {
  title: 'Session Button',
  component: SessionButton,
};

export default meta;
type Story = StoryObj<typeof SessionButton>;

export const Login: Story = {
  render: () => (
    <SessionProvider>
      <SessionButton />
    </SessionProvider>
  ),
};
