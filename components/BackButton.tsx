'use client'

import { useRouter } from 'next/navigation';
import React from 'react';
import { Button } from './ui/button';
import { ChevronLeft } from 'lucide-react';

function BackButton() {
  const router = useRouter();

  return (
    <Button variant="outline" size="sm" className='my-3' onClick={() => router.back()}>
      <ChevronLeft className="h-4 w-4" />
      Back
    </Button>
  );
}

export default BackButton;
