'use client';

import { useParams } from 'next/navigation';
import { PreparationLayout } from '@/components/preparation';

export default function PreparePage() {
  const params = useParams();
  const planId = params.planId;
  const itemId = params.itemId;

  return <PreparationLayout planId={planId} itemId={itemId} />;
}
