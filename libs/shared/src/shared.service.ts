import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RmqOptions, Transport } from '@nestjs/microservices';

@Injectable()
export class SharedService {
  constructor(private readonly configService: ConfigService) {}

  getRmqOptions(queue: string): RmqOptions {
    const usr = this.configService.get('RABBITMQ_USER');
    const password = this.configService.get('RABBITMQ_PASS');
    const host = this.configService.get('RABBITMQ_HOST');

    return {
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://${usr}:${password}@${host}`],
        queue: queue,
        queueOptions: {
          durable: true,
        },
      },
    };
  }
}
