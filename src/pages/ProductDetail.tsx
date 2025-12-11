import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { Phone, Send, Package, Droplet, Wind, Shield, Activity } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#1A1A1A] mb-4">Product Not Found</h1>
          <Link to="/shop" className="text-[#D92128] hover:underline">
            Return to Shop
          </Link>
        </div>
      </div>
    );
  }

  const featureIcons: Record<string, JSX.Element> = {
    'Moisture Wicking': <Droplet className="w-5 h-5" />,
    '4-Way Stretch': <Activity className="w-5 h-5" />,
    'UV Protection': <Shield className="w-5 h-5" />,
    'Breathable Mesh': <Wind className="w-5 h-5" />,
    'Quick Dry': <Droplet className="w-5 h-5" />,
    'Anti-Bacterial': <Shield className="w-5 h-5" />,
  };

  return (
    <div className="min-h-screen pt-20 bg-[#F4F4F4]">
      <div className="container mx-auto px-6 py-12">
        <div className="mb-6">
          <Link to="/shop" className="text-[#D92128] hover:underline">
            ← Back to Shop
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white rounded-lg shadow-lg p-6 lg:p-8 items-start">
          <div className="flex flex-col gap-4">
            <div className="mb-4">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full shadow-md border border-gray-100"
              />
            </div>
            <div className="hidden md:flex gap-3">
              {product.images.slice(1,4).map((img, i) => (
                <img key={i} src={img} alt={`${product.name} ${i+1}`} className="w-24 h-24 object-cover border border-gray-100" />
              ))}
            </div>
          </div>

          <div className="pt-1">
            <div className="flex gap-2 mb-4">
              {product.isNew && (
                <span className="bg-[#D92128] text-white text-xs font-bold px-3 py-1 rounded-full">
                  NEW
                </span>
              )}
              {product.isBestSeller && (
                <span className="bg-[#1A1A1A] text-white text-xs font-bold px-3 py-1 rounded-full">
                  BEST SELLER
                </span>
              )}
            </div>

            <h1
              className="text-4xl font-bold text-[#1A1A1A] mb-4"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              {product.name}
            </h1>

            <p className="text-sm text-gray-500 mb-6">SKU: {product.sku}</p>

            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              {product.description}
            </p>

            <div className="bg-[#F4F4F4] rounded-lg p-6 mb-8">
              <h3
                className="text-xl font-bold text-[#1A1A1A] mb-4"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                Technical Specifications
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Package className="w-5 h-5 text-[#D92128]" />
                  <div>
                    <span className="font-medium text-gray-900">Material:</span>
                    <span className="text-gray-700 ml-2">{product.material}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Package className="w-5 h-5 text-[#D92128]" />
                  <div>
                    <span className="font-medium text-gray-900">Weight:</span>
                    <span className="text-gray-700 ml-2">{product.weight}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Package className="w-5 h-5 text-[#D92128]" />
                  <div>
                    <span className="font-medium text-gray-900">Fit:</span>
                    <span className="text-gray-700 ml-2">{product.fit}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3
                className="text-xl font-bold text-[#1A1A1A] mb-4"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                Features
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {product.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg p-3"
                  >
                    <div className="text-[#D92128]">
                      {featureIcons[feature] || <Package className="w-5 h-5" />}
                    </div>
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <a
                href="tel:+251900000000"
                className="flex-1 sm:flex-none min-w-[180px] inline-flex items-center justify-center gap-2 bg-[#D92128] text-white px-4 py-3 rounded-md font-semibold hover:bg-[#b91a20] transition-colors"
              >
                <Phone className="w-5 h-5" />
                Call
              </a>

              <a
                href={`https://t.me/dinksportw?text=${encodeURIComponent(`Hi, I'm interested in ${product.name} (${product.sku})`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none min-w-[220px] inline-flex items-center justify-center gap-2 bg-[#0088cc] text-white px-4 py-3 rounded-md font-semibold hover:bg-[#007ab8] transition-colors"
              >
                <Send className="w-5 h-5" />
                Telegram
              </a>

              <Link
                to="/contact"
                className="hidden sm:inline-flex items-center justify-center gap-2 px-4 py-3 rounded-md bg-[#1A1A1A] text-white hover:bg-gray-800 transition-colors font-semibold"
              >
                Request Bulk Quote
              </Link>
            </div>
            <div className="mt-4 sm:hidden">
              <Link
                to="/contact"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-md bg-[#1A1A1A] text-white hover:bg-gray-800 transition-colors font-semibold"
              >
                Request Bulk Quote
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h2
            className="text-3xl font-bold text-[#1A1A1A] mb-6"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Need Custom Team Kits?
          </h2>
          <p className="text-gray-700 mb-6">
            We specialize in creating custom team kits with your logo, colors, and design. Minimum order quantity applies.
          </p>
          <Link
            to="/custom-kits"
            className="inline-block bg-[#D92128] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#b91a20] transition-colors"
          >
            Learn More About Custom Kits
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
