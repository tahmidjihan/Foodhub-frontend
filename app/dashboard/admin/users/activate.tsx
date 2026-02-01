import { Button } from '@/components/ui/button';
import React from 'react';
import { toast } from 'sonner';

function Activate({ id }: { id: string }) {
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
            body: JSON.stringify({ isActive: true }),
          }).then((res) => {
            window.location.reload();
            toast.success('User activated successfully');
          });
        }}
        size='sm'
      >
        Activate
      </Button>
    </>
  );
}

export default Activate;
