'use client'

import React from 'react';
import { Button } from './ui/button';

const LogoutButton = ({ handleSignOut }: { handleSignOut: () => void }) => {
  return (
    <div >
      <Button className='h-7' variant='outline' onClick={handleSignOut}>Sign out</Button>
    </div>
  );
};

export default LogoutButton;
