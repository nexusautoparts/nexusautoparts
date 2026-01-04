import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useChatbot } from '@/context/ChatbotContext';

export interface ProductCardProps {
    id: string;
    name: string;
    price: number;
    image: string;
    inStock: boolean;
    discount?: number;
}

export default function ProductCard({ name, image }: ProductCardProps) {
    const { openChatbot } = useChatbot();

    return (
        <Card className="hover-elevate overflow-hidden flex flex-col h-full">
            <div className="relative aspect-square bg-white p-4">
                <img src={image} alt={name} className="w-full h-full object-contain" />
            </div>
            <CardContent className="p-4 flex-1">
                <h3 className="font-semibold text-base mb-2 line-clamp-2" data-testid="text-product-name">
                    {name}
                </h3>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex gap-2">
                <Button
                    variant="outline"
                    className="flex-1"
                    data-testid="button-request-quote"
                >
                    Request Quote
                </Button>
                <Button
                    className="flex-1 bg-ring hover:bg-ring/90 text-white border-0"
                    data-testid="button-buy-now"
                    onClick={openChatbot}
                >
                    Buy Now
                </Button>
            </CardFooter>
        </Card>
    );
}
