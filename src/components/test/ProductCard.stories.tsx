import React from 'react';
import { expect } from '@storybook/jest';
import { within, userEvent } from '@storybook/testing-library';
import ProductCard, { type ProductCardProps } from './ProductCard';

const stories = {
  component: ProductCard,
  title: 'Product Card',
};

const Template = (args: ProductCardProps) => <ProductCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Product 1',
  description: 'Descriotion about the product',
  thumbnail: 'https://i.dummyjson.com/data/products/3/thumbnail.jpg',
};
Default.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.click(canvas.getByRole('button'));
  await expect(args.onClick).toHaveBeenCalled();
};

export default stories;
