import SearchProduct from '@/modules/product/SearchProduct';
import { PropsWithChildren } from 'react';

export default function Dashboard({ children }: PropsWithChildren) {
  return (
    <div className="py-6">
      <section>
        <h2 className="text-primary-500 text-sm font-medium mb-2">
          Client Component Product
        </h2>
        <SearchProduct open={true} />
      </section>
    </div>
  );
}
