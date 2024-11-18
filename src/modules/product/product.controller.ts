import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { SearchProductsDto } from './dto/search-products.dto';
import { UsePipes, ValidationPipe } from '@nestjs/common';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto.translations);
  }

  @Get()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async searchProducts(@Query() searchProductsDto: SearchProductsDto) {
    return this.productService.searchProducts(searchProductsDto);
  }
}
