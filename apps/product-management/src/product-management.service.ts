import { ProductEntity } from '@app/shared';
import { Injectable } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewProductDTO } from './dtos/product.dto';

@Injectable()
export class ProductManagementService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async createProduct(
    newProduct: Readonly<NewProductDTO>,
  ): Promise<ProductEntity> {
    const { skuCode, skuName, unitPrice } = newProduct;

    const product: ProductEntity = new ProductEntity();

    product.skuCode = skuCode;
    product.skuName = skuName;
    product.unitPrice = unitPrice;
    product.createDate = new Date(Date.now());
    product.updateDate = new Date(Date.now());
    return this.productRepository.save(product);
  }

  async getAllProduct(): Promise<ProductEntity[]> {
    return this.productRepository.find();
  }

  async getProductById(id: number): Promise<ProductEntity> {
    return this.productRepository.findOne({
      where: {
        id: id,
      },
    });
  }
}
