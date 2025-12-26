import { Injectable } from '@nestjs/common';

@Injectable()
export class TinkService {
  private apiUrl = 'https://api.tink.com';

  async exchangeToken(code: string): Promise<any> {
    const body = new URLSearchParams({
      code,
      client_id: process.env.TINK_CLIENT_ID!,
      client_secret: process.env.TINK_CLIENT_SECRET!,
      grant_type: 'authorization_code',
    });

    const res = await fetch(`${this.apiUrl}/api/v1/oauth/token`, {
      method: 'POST',
      body,
    });

    if (!res.ok) throw new Error(`Tink token error: ${res.status}`);
    return res.json();
  }

  async getTransactions(accessToken: string): Promise<any> {
    const res = await fetch(`${this.apiUrl}/data/v2/transactions`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!res.ok) throw new Error(`Failed to fetch transactions: ${res.status}`);

    return res.json();
  }
}
