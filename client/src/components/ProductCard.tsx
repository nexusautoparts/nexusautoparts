import { ShoppingCart, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  inStock: boolean;
  discount?: number;
}

export default function ProductCard({ name, price, image, inStock, discount }: ProductCardProps) {
  return (
    <Card className="hover-elevate overflow-hidden flex flex-col h-full">
      <div className="relative aspect-square bg-white p-4">
        <img src={image} alt={name} className="w-full h-full object-contain" />
        {discount && (
          <Badge className="absolute top-2 right-2 bg-ring text-white">
            -{discount}%
          </Badge>
        )}
        {!inStock && (
          <Badge variant="secondary" className="absolute top-2 left-2">
            Out of Stock
          </Badge>
        )}
      </div>
      <CardContent className="p-4 flex-1">
        <h3 className="font-semibold text-base mb-2 line-clamp-2" data-testid="text-product-name">
          {name}
        </h3>
        <div className="flex items-baseline gap-2">
          {discount ? (
            <>
              <span className="text-xl font-bold text-primary" data-testid="text-discounted-price">
                ${(price * (1 - discount / 100)).toFixed(2)}
              </span>
              <span className="text-sm text-muted-foreground line-through">
                ${price.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="text-xl font-bold text-primary" data-testid="text-price">
              ${price.toFixed(2)}
            </span>
          )}
        </div>
        <Badge variant={inStock ? 'default' : 'secondary'} className="mt-2">
          {inStock ? 'In Stock' : 'Out of Stock'}
        </Badge>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button
          variant="outline"
          size="icon"
          className="flex-shrink-0"
          data-testid="button-quick-view"
        >
          <Eye className="w-4 h-4" />
        </Button>
        <Button
          className="flex-1 bg-ring hover:bg-ring/90 text-white border-0"
          disabled={!inStock}
          data-testid="button-add-to-cart"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
