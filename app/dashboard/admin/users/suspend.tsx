'use client';
import { Button } from '@/components/ui/button';
import React from 'react';
import { toast } from 'sonner';

function Suspend({ id }: { id: string }) {
  return (
    <>
      <Button
        onClick={() => {
          fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/admin/users/${id}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ isActive: false }),
          }).then((res) => {
            window.location.reload();
            toast.success('User suspended successfully');
          });
        }}
        variant='destructive'
        size='sm'
      >
        Suspend
      </Button>
    </>
  );
}

export default Suspend;
