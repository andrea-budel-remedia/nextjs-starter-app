import React from 'react';
import { expect } from '@storybook/jest';
import {
  userEvent,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@storybook/testing-library';
import { Meta, StoryFn } from '@storybook/react';
import { rest } from 'msw';
import SearchProduct, { SearchProductProps } from '.';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { dummyApi } from '@/services/dummy.service';

// mock dello state redux
const store = configureStore({
  reducer: {
    [dummyApi.reducerPath]: dummyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(dummyApi.middleware),
});
const MockStore = ({ children }: React.PropsWithChildren) => (
  <Provider store={store}>{children}</Provider>
);

const meta: Meta<typeof SearchProduct> = {
  component: SearchProduct,
  title: 'Search products command palette',
  tags: ['autodocs'],
  decorators: [(Story) => <MockStore>{Story()}</MockStore>],
};

const Template: StoryFn<SearchProductProps> = (args) => (
  <SearchProduct {...args} />
);

export const Default = Template.bind({});
Default.args = {
  open: true,
};
Default.parameters = {
  msw: {
    handlers: [
      rest.get(`https://dummyjson.com/products/search`, (req, res, ctx) => {
        return res(
          ctx.json({
            total: 2,
            skip: req.url.searchParams.get('skip') || 0,
            limit: req.url.searchParams.get('limit') || 10,
            products: [
              {
                id: 1,
                title: 'Product 1',
                description: 'description of product 1',
                thumbnail:
                  'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
              },
              {
                id: 2,
                title: 'Product 2',
                description: 'description of product 2',
                thumbnail:
                  'https://i.dummyjson.com/data/products/2/thumbnail.jpg',
              },
            ],
          })
        );
      }),
    ],
  },
};
Default.play = async ({ args, canvasElement, step }) => {
  const TEST_TYPE = 'something';
  const input = screen.getByRole('combobox');

  await step('digitando il campo di testo ripecchi la ricerca', async () => {
    await userEvent.type(input, TEST_TYPE);
    await expect((screen.getByRole('combobox') as HTMLInputElement).value).toBe(
      TEST_TYPE
    );
  });

  await step('viene mostrata una lista', async () => {
    await waitFor(() => {
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });
  });

  await step('nella lista siano visualizzati 2 prodotti', async () => {
    await waitFor(() => {
      expect(screen.getAllByRole('option')).toHaveLength(2);
    });
  });

  await step('cliccando al di fuori venga rimosso', async () => {
    const overlay = document.querySelector('[id^=headlessui-dialog-overlay]');
    await expect(overlay).not.toBeNull();
    await userEvent.click(overlay as HTMLElement);
    await waitForElementToBeRemoved(screen.getByRole('combobox'));
  });
};

export default meta;
