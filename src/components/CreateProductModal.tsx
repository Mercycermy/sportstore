import React, { useState } from 'react';
import { API_BASE_URL } from '../services/api';
import apiFetch from '../services/fetcher';
import { X, Upload, Loader2 } from 'lucide-react';

interface CreateProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const CreateProductModal: React.FC<CreateProductModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: 'match-kits',
    gender: 'men',
    size: '',
    colorValues: '',
    sku: '',
    material: '100% Polyester',
    weight: '180g',
    fit: 'Athletic Fit',
    features: 'Moisture Wicking, Breathable, Quick Dry',
    coverImage: '',
    image1: '',
    image2: '',
    status: 'published',
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'coverImage' | 'image1' | 'image2') => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setLoading(true);
      
      // Upload to Cloudinary via backend
      const formData = new FormData();
      formData.append('image', file);
      
      const response = await apiFetch(`${API_BASE_URL}/upload`, { 
        method: 'POST', 
        body: formData 
      });
      
      if (!response.ok) {
        throw new Error('Failed to upload image');
      }
      
      const data = await response.json();
      
      // Update form with Cloudinary URL
      setFormData(prev => ({ ...prev, [field]: data.url }));
      
      // Set preview for cover image
      if (field === 'coverImage') {
        setImagePreview(data.url);
      }
      
      setError(null);
      
    } catch (err) {
      console.error('Image upload error:', err);
      setError('Failed to upload image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Convert features string to JSON array
      const featuresArray = formData.features.split(',').map(f => f.trim()).filter(Boolean);
      
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        features: JSON.stringify(featuresArray),
      };

      const response = await apiFetch(`${API_BASE_URL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error('Failed to create product');
      }

      onSuccess();
      onClose();
      
      // Reset form
      setFormData({
        name: '',
        description: '',
        price: '',
        stock: '',
        category: 'match-kits',
        gender: 'men',
        size: '',
        colorValues: '',
        sku: '',
        material: '100% Polyester',
        weight: '180g',
        fit: 'Athletic Fit',
        features: 'Moisture Wicking, Breathable, Quick Dry',
        coverImage: '',
        image1: '',
        image2: '',
        status: 'published',
      });
      setImagePreview('');
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create product');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Create New Product</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg">
              {error}
            </div>
          )}

          {/* Basic Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Basic Information</h3>
            
            <div>
              <label className="block text-sm font-medium mb-2">Product Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                placeholder="e.g., Manchester United Home Jersey"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description *</label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                rows={3}
                placeholder="Product description..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Price (ETB) *</label>
                <input
                  type="number"
                  required
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                  placeholder="1500.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Stock Quantity *</label>
                <input
                  type="number"
                  required
                  value={formData.stock}
                  onChange={(e) => setFormData(prev => ({ ...prev, stock: e.target.value }))}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                  placeholder="50"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                >
                  <option value="match-kits">Match Kits</option>
                  <option value="training">Training</option>
                  <option value="casual">Casual</option>
                  <option value="accessories">Accessories</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Gender *</label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value }))}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                >
                  <option value="men">Men</option>
                  <option value="women">Women</option>
                  <option value="kids">Kids</option>
                  <option value="unisex">Unisex</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Sizes (comma-separated)</label>
                <input
                  type="text"
                  value={formData.size}
                  onChange={(e) => setFormData(prev => ({ ...prev, size: e.target.value }))}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                  placeholder="S, M, L, XL"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Colors (comma-separated)</label>
                <input
                  type="text"
                  value={formData.colorValues}
                  onChange={(e) => setFormData(prev => ({ ...prev, colorValues: e.target.value }))}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                  placeholder="Red, Blue, White"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">SKU</label>
              <input
                type="text"
                value={formData.sku}
                onChange={(e) => setFormData(prev => ({ ...prev, sku: e.target.value }))}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                placeholder="SKU-0001"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Product Details</h3>
            
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Material</label>
                <input
                  type="text"
                  value={formData.material}
                  onChange={(e) => setFormData(prev => ({ ...prev, material: e.target.value }))}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Weight</label>
                <input
                  type="text"
                  value={formData.weight}
                  onChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.value }))}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Fit</label>
                <input
                  type="text"
                  value={formData.fit}
                  onChange={(e) => setFormData(prev => ({ ...prev, fit: e.target.value }))}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Features (comma-separated)</label>
              <input
                type="text"
                value={formData.features}
                onChange={(e) => setFormData(prev => ({ ...prev, features: e.target.value }))}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                placeholder="Moisture Wicking, Breathable, Quick Dry"
              />
            </div>
          </div>

          {/* Images */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Product Images</h3>
            <p className="text-sm text-gray-600">Upload images (recommended) or paste Cloudinary URLs</p>
            
            <div>
              <label className="block text-sm font-medium mb-2">Cover Image *</label>
              <div className="flex gap-4">
                <input
                  type="text"
                  value={formData.coverImage}
                  onChange={(e) => setFormData(prev => ({ ...prev, coverImage: e.target.value }))}
                  className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                  placeholder="https://res.cloudinary.com/... or upload below"
                  disabled={loading}
                />
                <label className={`px-4 py-2 rounded-lg cursor-pointer flex items-center gap-2 ${loading ? 'bg-gray-200 cursor-not-allowed' : 'bg-gray-100 hover:bg-gray-200'}`}>
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                  {loading ? 'Uploading...' : 'Upload'}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'coverImage')}
                    className="hidden"
                    disabled={loading}
                  />
                </label>
              </div>
              {imagePreview && (
                <img src={imagePreview} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded-lg border" />
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Image 1 (Optional)</label>
              <div className="flex gap-4">
                <input
                  type="text"
                  value={formData.image1}
                  onChange={(e) => setFormData(prev => ({ ...prev, image1: e.target.value }))}
                  className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                  placeholder="https://res.cloudinary.com/... or upload below"
                  disabled={loading}
                />
                <label className={`px-4 py-2 rounded-lg cursor-pointer flex items-center gap-2 ${loading ? 'bg-gray-200 cursor-not-allowed' : 'bg-gray-100 hover:bg-gray-200'}`}>
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                  {loading ? 'Uploading...' : 'Upload'}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'image1')}
                    className="hidden"
                    disabled={loading}
                  />
                </label>
              </div>
              {formData.image1 && formData.image1.startsWith('http') && (
                <img src={formData.image1} alt="Image 1" className="mt-2 w-32 h-32 object-cover rounded-lg border" />
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Image 2 (Optional)</label>
              <div className="flex gap-4">
                <input
                  type="text"
                  value={formData.image2}
                  onChange={(e) => setFormData(prev => ({ ...prev, image2: e.target.value }))}
                  className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                  placeholder="https://res.cloudinary.com/... or upload below"
                  disabled={loading}
                />
                <label className={`px-4 py-2 rounded-lg cursor-pointer flex items-center gap-2 ${loading ? 'bg-gray-200 cursor-not-allowed' : 'bg-gray-100 hover:bg-gray-200'}`}>
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                  {loading ? 'Uploading...' : 'Upload'}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'image2')}
                    className="hidden"
                    disabled={loading}
                  />
                </label>
              </div>
              {formData.image2 && formData.image2.startsWith('http') && (
                <img src={formData.image2} alt="Image 2" className="mt-2 w-32 h-32 object-cover rounded-lg border" />
              )}
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
            >
              <option value="published">Published</option>
              <option value="unpublished">Unpublished</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border rounded-lg hover:bg-gray-50 transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="w-5 h-5 animate-spin" />}
              {loading ? 'Creating...' : 'Create Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProductModal;
