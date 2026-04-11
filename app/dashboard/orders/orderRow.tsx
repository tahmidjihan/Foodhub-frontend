'use client';

import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { AlertCircle, Ban } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';

const statusColors: Record<string, string> = {
  Pending: 'bg-yellow-500/10 text-yellow-400',
  InProgress: 'bg-blue-500/10 text-blue-400',
  Completed: 'bg-green-500/10 text-green-400',
  Cancelled: 'bg-red-500/10 text-red-400',
};

function OrderRow({ order }: { order: any }) {
  const [open, setOpen] = React.useState(false);
  const [cancelling, setCancelling] = React.useState(false);

  async function cancelOrder() {
    setCancelling(true);
    try {
      const res = await fetch(
        `/api/orders/${order.id}`,
        {
          method: 'DELETE',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        }
      );
      if (res.ok) {
        toast.success('Order cancelled successfully');
        window.location.reload();
      } else {
        const error = await res.json().catch(() => ({}));
        toast.error(error.message || 'Failed to cancel order');
      }
    } catch {
      toast.error('Error cancelling order');
    } finally {
      setCancelling(false);
      setOpen(false);
    }
  }

  const canCancel = order.status === 'Pending';

  return (
    <TableRow key={order.id}>
      <TableCell className='font-medium text-white'>
        {order.Meal?.name || 'Unknown Meal'}
      </TableCell>
      <TableCell className='font-medium text-white'>{order.quantity}</TableCell>
      <TableCell className='font-medium text-white'>
        ${Number(order.total).toFixed(2)}
      </TableCell>
      <TableCell className='font-medium text-zinc-300 max-w-[150px] truncate'>
        {order.address}
      </TableCell>
      <TableCell>
        <span
          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
            statusColors[order.status] || 'bg-zinc-800 text-zinc-300'
          }`}
        >
          <AlertCircle className='w-3 h-3' />
          {order.status}
        </span>
      </TableCell>
      <TableCell>
        <div className='flex items-center gap-2'>
          {order.status === 'Completed' && order.Meal?.id && (
            <Link href={`/dashboard/reviews/${order.Meal.id}`}>
              <Button size='sm' className='bg-[#008148] hover:bg-[#006b3d] text-white'>
                Review
              </Button>
            </Link>
          )}

          {canCancel && (
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button
                  size='sm'
                  variant='outline'
                  className='border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300'
                >
                  <Ban className='w-3 h-3 mr-1' />
                  Cancel
                </Button>
              </DialogTrigger>
              <DialogContent className='bg-zinc-900 border-zinc-800 text-white'>
                <DialogHeader>
                  <DialogTitle>Cancel Order</DialogTitle>
                  <DialogDescription className='text-zinc-400'>
                    Are you sure you want to cancel this order for{' '}
                    <span className='font-semibold text-white'>
                      {order.Meal?.name}
                    </span>
                    ? This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button
                      variant='outline'
                      className='border-zinc-700 text-zinc-300'
                    >
                      Keep Order
                    </Button>
                  </DialogClose>
                  <Button
                    onClick={cancelOrder}
                    disabled={cancelling}
                    className='bg-red-500 hover:bg-red-600 text-white'
                  >
                    {cancelling ? 'Cancelling...' : 'Yes, Cancel Order'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
}

export default OrderRow;
