const API_BASE = 'https://ggsoma.store/api/partner/v1';

function getApiKey(): string {
  return process.env.PARTNER_API_KEY || '';
}

export async function partnerFetch<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const key = getApiKey();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options?.headers as Record<string, string>),
  };

  if (key) {
    headers['Authorization'] = `Bearer ${key}`;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  const data = await res.json();
  return data as T;
}

export async function partnerResponse(path: string, init?: RequestInit) {
  try {
    const data = await partnerFetch(path, init);
    return Response.json(data);
  } catch (error) {
    return Response.json(
      { ok: false, error: { code: 'PROXY_ERROR', message: String(error) } },
      { status: 500 }
    );
  }
}
