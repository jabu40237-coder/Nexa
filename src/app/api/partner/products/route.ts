import { NextRequest } from 'next/server';
import { partnerResponse } from '@/lib/api-proxy';

export async function GET(request: NextRequest) {
  const provider = request.nextUrl.searchParams.get('provider');
  const qs = provider ? `?provider=${encodeURIComponent(provider)}` : '';
  return partnerResponse(`/catalog/products${qs}`);
}
