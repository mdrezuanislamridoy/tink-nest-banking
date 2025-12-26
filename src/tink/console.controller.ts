import { Controller, Get, Query } from '@nestjs/common';
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
export class ConsoleController {
  constructor(private tinkService: TinkService) {}

  @Get('fetch-transactions')
  async fetchTransactions(@Query('code') code: string) {
    if (!code) return 'Missing code query parameter';

    // Exchange OAuth code for access token
    const tokenData = (await this.tinkService.exchangeToken(code)) as TokenData;
    const accessToken = tokenData.access_token;

    // Fetch transactions
    const trxData = (await this.tinkService.getTransactions(
      accessToken,
    )) as TransactionData;

    // Log to server console
    console.log('===== TRANSACTIONS =====', trxData);
    // trxData.transactions.forEach((trx, idx) => {
    //   console.log(
    //     `${idx + 1}. ${trx.dates.booked} - ${trx.descriptions.display} - ${trx.amount.value.unscaledValue / 10 ** trx.amount.value.scale} ${trx.amount.currencyCode}`,
    //   );
    // });
    console.log('========================');

    return 'Transactions printed to server console';
  }
}
