import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Product } from '@prisma/client';
import { SearchProductsDto } from './dto/search-products.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  public async createProduct(
    translations: { language: string; name: string; description: string }[],
  ): Promise<Product> {
    return this.prisma.product.create({
      data: {
        translations: {
          create: translations,
        },
      },
      include: { translations: true },
    });
  }

  public async searchProducts(searchProductsDto: SearchProductsDto) {
    const { query, language, page = 1, limit = 10 } = searchProductsDto;
    const skip = (page - 1) * limit;
    const products = await this.prisma.product.findMany({
      where: {
        translations: {
          some: {
            name: {
              contains: query,
              mode: 'insensitive',
            },
            language,
          },
        },
      },
      include: {
        translations: {
          where: {
            language,
          },
        },
      },
      skip,
      take: limit,
    });

    const total = await this.prisma.product.count({
      where: {
        translations: {
          some: {
            name: {
              contains: query,
              mode: 'insensitive',
            },
            language,
          },
        },
      },
    });

    return {
      data: products,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}
