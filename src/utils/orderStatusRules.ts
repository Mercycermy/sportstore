// Order Status Business Rules
// Defines allowed status transitions and validation logic

export type OrderStatus = 'pending' | 'paid' | 'completed' | 'cancelled' | 'refunded' | 'failed';

export interface StatusTransition {
  from: OrderStatus;
  to: OrderStatus[];
  description: string;
}

/**
 * Order Status Workflow Rules:
 * 
 * pending -> [paid, cancelled, failed]
 *   - New orders start as pending
 *   - Can be paid (payment confirmed)
 *   - Can be cancelled (customer/admin cancels)
 *   - Can fail (payment failed)
 * 
 * paid -> [completed, refunded, cancelled]
 *   - Payment received
 *   - Can be completed (order fulfilled)
 *   - Can be refunded (customer returns)
 *   - Can be cancelled (before shipping)
 * 
 * completed -> [refunded]
 *   - Order fulfilled and delivered
 *   - Can only be refunded (return/dispute)
 *   - Cannot go back to pending/paid
 * 
 * cancelled -> []
 *   - Terminal state
 *   - No further transitions allowed
 * 
 * refunded -> []
 *   - Terminal state
 *   - Money returned to customer
 * 
 * failed -> [pending]
 *   - Payment failed
 *   - Can retry (go back to pending)
 */

export const STATUS_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  pending: ['paid', 'cancelled', 'failed'],
  paid: ['completed', 'refunded', 'cancelled'],
  completed: ['refunded'],
  cancelled: [], // Terminal state
  refunded: [], // Terminal state
  failed: ['pending'], // Allow retry
};

export const STATUS_COLORS: Record<OrderStatus, string> = {
  pending: 'bg-blue-100 text-blue-800',
  paid: 'bg-green-100 text-green-800',
  completed: 'bg-purple-100 text-purple-800',
  cancelled: 'bg-red-100 text-red-800',
  refunded: 'bg-orange-100 text-orange-800',
  failed: 'bg-gray-100 text-gray-800',
};

export const STATUS_LABELS: Record<OrderStatus, string> = {
  pending: 'Pending',
  paid: 'Paid',
  completed: 'Completed',
  cancelled: 'Cancelled',
  refunded: 'Refunded',
  failed: 'Failed',
};

export const STATUS_DESCRIPTIONS: Record<OrderStatus, string> = {
  pending: 'Order placed, awaiting payment confirmation',
  paid: 'Payment confirmed, preparing for shipment',
  completed: 'Order fulfilled and delivered',
  cancelled: 'Order cancelled by customer or admin',
  refunded: 'Payment refunded to customer',
  failed: 'Payment failed, customer can retry',
};

/**
 * Check if a status transition is allowed
 */
export function canTransitionTo(currentStatus: OrderStatus, newStatus: OrderStatus): boolean {
  if (currentStatus === newStatus) {
    return false; // No self-transitions
  }
  
  const allowedTransitions = STATUS_TRANSITIONS[currentStatus];
  return allowedTransitions.includes(newStatus);
}

/**
 * Get allowed next statuses for current status
 */
export function getAllowedStatuses(currentStatus: OrderStatus): OrderStatus[] {
  return STATUS_TRANSITIONS[currentStatus] || [];
}

/**
 * Validate status transition with error message
 */
export function validateStatusTransition(
  currentStatus: OrderStatus,
  newStatus: OrderStatus
): { valid: boolean; error?: string } {
  if (currentStatus === newStatus) {
    return {
      valid: false,
      error: 'Order is already in this status',
    };
  }

  if (!canTransitionTo(currentStatus, newStatus)) {
    return {
      valid: false,
      error: `Cannot change status from "${STATUS_LABELS[currentStatus]}" to "${STATUS_LABELS[newStatus]}"`,
    };
  }

  return { valid: true };
}

/**
 * Check if status is terminal (no further transitions)
 */
export function isTerminalStatus(status: OrderStatus): boolean {
  return STATUS_TRANSITIONS[status].length === 0;
}
