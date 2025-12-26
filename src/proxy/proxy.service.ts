import { Injectable } from '@nestjs/common';

@Injectable()
export class ProxyService {
  private apiUrl = 'https://api.tink.com';

  async proxyRequest(
    path: string,
    method: string,
    authHeader?: string,
  ): Promise<any> {
    const res = await fetch(`${this.apiUrl}${path}`, {
      method,
      headers: {
        Authorization: authHeader ?? '',
      },
    });

    if (!res.ok) {
      throw new Error(`Proxy error: ${res.status}`);
    }

    return res.json();
  }
}
