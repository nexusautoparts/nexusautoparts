import ProductCard from '../ProductCard';
import brakePadsImage from '@assets/generated_images/Product_brake_pads_1a5841b4.png';

export default function ProductCardExample() {
  return (
    <div className="p-8 bg-background">
      <div className="max-w-xs">
        <ProductCard
          id="1"
          name="Premium Brake Pads Set - Front & Rear"
          price={89.99}
          image={brakePadsImage}
          inStock={true}
          discount={15}
        />
      </div>
    </div>
  );
}
