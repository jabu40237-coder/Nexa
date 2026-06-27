import { partnerResponse } from '@/lib/api-proxy';

export async function GET() {
  return partnerResponse('/health');
}
