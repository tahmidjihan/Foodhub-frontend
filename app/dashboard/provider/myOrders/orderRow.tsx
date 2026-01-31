'use client';

import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

const STATUSES = ['Pending', 'InProgress', 'Completed', 'Cancelled'];

function OrderRow({ item }: { item: any }) {
  async function updateStatus(status: string) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/api/providers/orders/${item.id}`,
      {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      }
    );
    if (res.ok) {
      toast.success('Order status updated');
      // router.refresh(); // Removed
    } else {
      toast.error('Failed to update status');
    }
  }

  return (
    <TableRow key={item.id}>
      <TableCell className='font-medium text-white'>
        {item.Meal?.name ?? '—'}
      </TableCell>
      <TableCell className='font-medium text-white'>
        {item.User?.name ?? '—'}
      </TableCell>
      <TableCell className='font-medium text-white'>{item.quantity}</TableCell>
      <TableCell className='font-medium text-white'>
        ${Number(item.total).toFixed(2)}
      </TableCell>
      <TableCell className='font-medium text-white'>{item.status}</TableCell>
      <TableCell className='font-medium text-white'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' size='sm'>
              Update
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {STATUSES.map((s) => (
              <DropdownMenuItem
                key={s}
                onClick={() => updateStatus(s)}
                disabled={item.status === s}
              >
                {s}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}

export default OrderRow;
