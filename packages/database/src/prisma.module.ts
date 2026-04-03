import { DynamicModule, Global, Module } from '@nestjs/common';
import {
  PrismaModuleOptions,
  PRISMA_MODULE_OPTIONS,
} from './prisma-module-options.interface';
import { PrismaService } from './prisma.service';

@Global()
@Module({})
export class PrismaModule {
  static forRoot(options: PrismaModuleOptions): DynamicModule {
    return {
      module: PrismaModule,
      providers: [
        {
          provide: PRISMA_MODULE_OPTIONS,
          useValue: options,
        },
        PrismaService,
      ],
      exports: [PrismaService],
    };
  }

  static forRootAsync(options: {
    imports?: any[];
    inject?: any[];
    useFactory: (...args: any[]) => Promise<PrismaModuleOptions> | PrismaModuleOptions;
  }): DynamicModule {
    return {
      module: PrismaModule,
      imports: options.imports ?? [],
      providers: [
        {
          provide: PRISMA_MODULE_OPTIONS,
          useFactory: options.useFactory,
          inject: options.inject ?? [],
        },
        PrismaService,
      ],
      exports: [PrismaService],
    };
  }
}
