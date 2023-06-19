import { Controller, Get } from '@nestjs/common';
import { ProductManagementService } from './product-management.service';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from '@app/shared';
import { Repository } from 'typeorm';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { NewProductDTO } from './dtos/product.dto';

@Controller()
export class ProductManagementController {
  constructor(
    private readonly productManagementService: ProductManagementService,
  ) {}

  @MessagePattern({ cmd: 'create-product' })
  async createProduct(@Payload() newProduct: NewProductDTO) {
    return this.productManagementService.createProduct(newProduct);
  }

  @MessagePattern({ cmd: 'get-all-product' })
  async getAllProduct() {
    return this.productManagementService.getAllProduct();
  }

  @MessagePattern({ cmd: 'get-product-id' })
  async getProductById(@Payload() payload: { id: number }) {
    return this.productManagementService.getProductById(payload.id);
  }
}
