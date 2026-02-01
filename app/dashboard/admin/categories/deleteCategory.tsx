'use client';
import { Button } from '@/components/ui/button';
import React from 'react';

function DeleteCategory({ id }: any) {
  return (
    <>
      <Button
        onClick={() => {
          fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/categories/${id}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
          }).then((res) => {
            window.location.reload();
          });
        }}
        variant='destructive'
        size='sm'
      >
        Delete
      </Button>
    </>
  );
}

export default DeleteCategory;
