import { Link } from 'react-router-dom';
import { Product } from '../data/products';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link to={`/product/${product.id}`} className="group">
      <div className="bg-white shadow-md border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl">
        <div className="relative overflow-hidden aspect-square">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            {product.isNew && (
              <span className="bg-[#D92128] text-white text-xs font-semibold px-2 py-1 rounded-sm">
                NEW
              </span>
            )}
            {product.isBestSeller && (
              <span className="bg-[#1A1A1A] text-white text-xs font-semibold px-2 py-1 rounded-sm">
                BEST SELLER
              </span>
            )}
          </div>
        </div>

        <div className="p-4">
          <h3
            className="text-lg font-bold text-[#1A1A1A] mb-2 group-hover:text-[#D92128] transition-colors"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            {product.name}
          </h3>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 uppercase">{product.sku}</span>
            <span className="text-sm font-medium text-[#D92128]">
              View Details
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
