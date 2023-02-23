import ProductGallery from '@/components/test/ProductGallery';
import { PropsWithChildren, Suspense } from 'react';

export default function Dashboard({ children }: PropsWithChildren) {
  return (
    <div className="px-12 py-6">
      <Suspense fallback={<span>loading...</span>}>
        {/* @ts-expect-error Server Component */}
        <ProductGallery />
      </Suspense>
    </div>
  );
}
