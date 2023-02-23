import { PropsWithChildren } from 'react';
import ProductCard from './ProductCard';

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  thumbnail: string;
};
async function getProducts(options?: {
  skip: number;
  limit: number;
}): Promise<Product[]> {
  const response = await fetch(
    `https://dummyjson.com/products?limit=${options?.limit || 10}&skip=${
      options?.skip || 0
    }`
  );
  const data = await response.json();
  return data.products;
}

export default async function Gallery({}: PropsWithChildren) {
  const items = await getProducts();
  return (
    <div className="grid grid-cols-4 gap-4">
      {items.map((item) => (
        <ProductCard
          className="w-48"
          key={item.id}
          title={item.title}
          description={item.description}
          thumbnail={item.thumbnail}
        />
      ))}
    </div>
  );
}
