import { NextRequest } from 'next/server';
import { partnerResponse } from '@/lib/api-proxy';

export async function POST(request: NextRequest) {
  const body = await request.json();
  return partnerResponse('/orders', {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const qs = new URLSearchParams();
  params.forEach((v, k) => qs.set(k, v));
  const query = qs.toString();
  return partnerResponse(`/orders${query ? `?${query}` : ''}`);
}
