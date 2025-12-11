import { useEffect, useState } from 'react';
import { getOrders, updateOrderStatus, getOrderById, type Order } from '../../services/api';
import {
  STATUS_COLORS,
  STATUS_LABELS,
  getAllowedStatuses,
  validateStatusTransition,
  isTerminalStatus,
  type OrderStatus,
} from '../../utils/orderStatusRules';
import { X } from 'lucide-react';

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<(Order & { items?: any[] }) | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    try {
      setLoading(true);
      const data = await getOrders();
      setOrders(data);
    } catch (error) {
      console.error('Failed to load orders', error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleViewDetails(orderId: number) {
    try {
      const orderDetails = await getOrderById(orderId);
      setSelectedOrder(orderDetails);
      setShowDetailModal(true);
    } catch (error) {
      alert('Failed to load order details');
    }
  }

  async function handleStatusChange(orderId: number, currentStatus: OrderStatus, newStatus: OrderStatus) {
    const validation = validateStatusTransition(currentStatus, newStatus);
    
    if (!validation.valid) {
      alert(validation.error);
      return;
    }

    if (!confirm(`Are you sure you want to change status from "${STATUS_LABELS[currentStatus]}" to "${STATUS_LABELS[newStatus]}"?`)) {
      return;
    }

    try {
      setUpdatingStatus(true);
      await updateOrderStatus(orderId, newStatus);
      await loadOrders(); // Refresh orders list
      alert('Order status updated successfully');
    } catch (error: any) {
      alert(error.message || 'Failed to update order status');
    } finally {
      setUpdatingStatus(false);
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Orders Management</h2>
        <div className="text-sm text-gray-600">
          Total: {orders.length} orders
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order #
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4">
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    No orders found
                  </td>
                </tr>
              ) : (
                orders.map((order) => {
                  const orderStatus = order.status as OrderStatus;
                  const allowedStatuses = getAllowedStatuses(orderStatus);
                  const terminal = isTerminalStatus(orderStatus);

                  return (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {order.orderNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        <div>{order.customerName}</div>
                        <div className="text-xs text-gray-500">{order.customerEmail}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {(order as any).customerPhone || '—'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {terminal ? (
                          <span
                            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              STATUS_COLORS[orderStatus] || 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {STATUS_LABELS[orderStatus]}
                          </span>
                        ) : (
                          <select
                            value={order.status}
                            onChange={(e) =>
                              handleStatusChange(order.id, orderStatus, e.target.value as OrderStatus)
                            }
                            disabled={updatingStatus}
                            className={`px-2 py-1 text-xs font-semibold rounded-full border-0 focus:ring-2 focus:ring-blue-500 ${
                              STATUS_COLORS[orderStatus] || 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            <option value={order.status}>{STATUS_LABELS[orderStatus]}</option>
                            {allowedStatuses.map((status) => (
                              <option key={status} value={status}>
                                → {STATUS_LABELS[status]}
                              </option>
                            ))}
                          </select>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        ETB {order.total.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.createdAt
                          ? new Date(order.createdAt).toLocaleDateString()
                          : '—'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => handleViewDetails(order.id)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {showDetailModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold">Order Details</h3>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Order Number</p>
                    <p className="font-medium">{selectedOrder.orderNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <span
                      className={`px-2 py-1 inline-flex text-xs font-semibold rounded-full ${
                        STATUS_COLORS[selectedOrder.status as OrderStatus] ||
                        'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {STATUS_LABELS[selectedOrder.status as OrderStatus]}
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Customer</p>
                  <p className="font-medium">{selectedOrder.customerName}</p>
                  <p className="text-sm">{selectedOrder.customerEmail}</p>
                  <p className="text-sm">{(selectedOrder as any).customerPhone}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Address</p>
                  <p>{selectedOrder.address}</p>
                </div>

                {selectedOrder.items && selectedOrder.items.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Order Items</p>
                    <div className="border rounded-lg">
                      <table className="min-w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Product</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Qty</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Price</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Subtotal</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {selectedOrder.items.map((item: any, idx: number) => (
                            <tr key={idx}>
                              <td className="px-4 py-2 text-sm">{item.productName}</td>
                              <td className="px-4 py-2 text-sm">{item.quantity}</td>
                              <td className="px-4 py-2 text-sm">ETB {item.price.toLocaleString()}</td>
                              <td className="px-4 py-2 text-sm">ETB {(item.price * item.quantity).toLocaleString()}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>ETB {selectedOrder.total.toLocaleString()}</span>
                  </div>
                </div>

                {selectedOrder.notes && (
                  <div>
                    <p className="text-sm text-gray-600">Notes</p>
                    <p className="text-sm">{selectedOrder.notes}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
