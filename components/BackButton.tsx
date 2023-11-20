'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { Button } from './ui/button';
import { ChevronLeft } from 'lucide-react';

function BackButton({ buttonType = 'default' }) {
  const router = useRouter();

  const handleClick = () => {
    if(buttonType === 'patientChart') router.push('/dashboard');
    else router.back();
  };

  return (
    <Button variant="outline" size="sm" className="my-3" onClick={handleClick}>
      <ChevronLeft className="h-4 w-4" />
      Back
    </Button>
  );
}

export default BackButton;
