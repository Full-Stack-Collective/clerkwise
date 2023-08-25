'use client';

import { useProviderStore } from '@/stores/currentProviderStore';
import { useRef } from 'react';

export default function ProviderStoreInitialiser({
  practiceId,
  providerFirstName,
  providerLastName,
  providerId,
}: ProviderInfo) {
  const initialized = useRef(false);
  if (!initialized.current) {
    useProviderStore.setState({
      practiceId,
      providerFirstName,
      providerLastName,
      providerId,
    });
    initialized.current = true;
  }
  return null;
}
