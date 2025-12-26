import { Controller, Get, Query, Res } from '@nestjs/common';
import type { Response } from 'express';
import { TinkService } from './tink.service';

interface TokenData {
  access_token: string;
  [key: string]: unknown;
}

interface Transaction {
  amount: {
    value: {
      unscaledValue: number;
      scale: number;
    };
    currencyCode: string;
  };
  dates: {
    booked: string;
  };
  descriptions: {
    display: string;
  };
}

interface TransactionData {
  transactions: Transaction[];
}

@Controller()
export class CallbackController {
  constructor(private tinkService: TinkService) {}

  @Get('callback')
  async callback(
    @Query('code') code: string,
    @Query('credentialsId') credentialsId: string,
    @Res() res: Response,
  ): Promise<void> {
    if (!code) {
      res.status(400).send('Missing code');
      return;
    }

    try {
      // 1️⃣ Exchange code for access token
      const tokenData = (await this.tinkService.exchangeToken(
        code,
      )) as TokenData;
      const accessToken = tokenData.access_token;

      // 2️⃣ Fetch transactions
      const trxData = (await this.tinkService.getTransactions(
        accessToken,
      )) as TransactionData;

      // 3️⃣ Print to server console
      console.log('===== TINK TRANSACTIONS =====');
      console.log('CredentialsId:', credentialsId);
      console.log('Access Token:', accessToken);
      trxData.transactions.forEach((trx, idx) => {
        const amount =
          trx.amount.value.unscaledValue / 10 ** trx.amount.value.scale;
        console.log(
          `${idx + 1}. ${trx.dates.booked} - ${trx.descriptions.display} - ${amount} ${trx.amount.currencyCode}`,
        );
      });
      console.log('==============================');

      // 4️⃣ Optional: redirect to a simple page
      res.send('Transactions printed in server console!');
    } catch (err) {
      console.error('Callback error:', err);
      res.status(500).send('Tink callback error');
    }
  }
}
