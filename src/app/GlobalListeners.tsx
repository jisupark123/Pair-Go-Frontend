'use client';

import { useWelcomeMessage } from '@/features/auth/hooks/useWelcomeMessage';
import { useGlobalSocket } from '@/shared/hooks/useGlobalSocket';

export function GlobalListeners() {
  useWelcomeMessage();
  useGlobalSocket();

  return null;
}
