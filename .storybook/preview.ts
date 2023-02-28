import '../src/app/globals.css';
import { initialize, mswDecorator } from 'msw-storybook-addon';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
// MSW
initialize();

export const decorators = [mswDecorator];
