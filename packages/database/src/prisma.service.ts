import { Inject, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from './generated/prisma/client';
import { PRISMA_MODULE_OPTIONS } from './prisma-module-options.interface';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(@Inject(PRISMA_MODULE_OPTIONS) options: { url: string }) {
    const adapter = new PrismaMariaDb(options.url);
    super({ adapter, log: ['info', 'warn', 'error'] });
  }

  async onModuleInit() {
    try {
      await this.$connect();
      await this.$queryRaw`SELECT 1`;
      console.log('Prisma connected to MySQL');
    } catch (error) {
      console.error('Prisma connection error:', error);
      throw error;
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
    console.log('Prisma disconnected from MySQL');
  }
}
