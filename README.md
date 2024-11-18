<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Multilingual Product

---

## 1. **Multilingual Product API**
   - **Purpose**: Allows the creation of products with multilingual support for name and description attributes.
   - **Endpoint**: `POST /products`
   - **Request Body**:
     ```json
     {
       "translations": [
         { "language": "en", "name": "Product Name", "description": "Product Description" },
         { "language": "th", "name": "ชื่อสินค้า", "description": "รายละเอียดสินค้า" }
       ]
     }
     ```
   - **Description**: This endpoint allows users to create a new product while providing translations for the product name and description in different languages. The translations are stored as part of the product, allowing products to be retrieved in various languages.

---

## 2. **Multilingual Product Search API**
   - **Purpose**: Enables searching for products by name in any language and returns results in a paginated format.
   - **Endpoint**: `GET /products/search`
   - **Query Parameters**:
     - `query`: The search term to look for in the product name.
     - `language`: The language in which the product name should be searched (e.g., "en", "th").
     - `page`: The page number for pagination.
   - **Example Request**:
     ```
     GET /products/search?query=Product&language=en&page=1
     ```
   - **Description**: This API endpoint allows users to search for products by name in their chosen language. It supports pagination for easier navigation through large sets of products.

---

## 3. **Database Design**

### Product Model
The database schema needs to support multilingual attributes (name, description) for products. Here’s how we can model it:

1. **Product** model will store basic product data (e.g., id).
2. **ProductTranslation** model will store the translations for each product’s name and description, each associated with a specific language.

### Prisma Schema:
```prisma
model Product {
  id           String               @id @default(uuid())
  translations ProductTranslation[]
}

model ProductTranslation {
  id          String  @id @default(uuid())
  language    String
  name        String
  description String
  productId   String
  product     Product @relation(fields: [productId], references: [id])
}

```

---
## 4. Validation

- **Product Creation**:
  - We'll use the class-validator library in combination with DTOs (Data Transfer Objects) to validate incoming request data before it reaches the business logic layer. This guarantees that only valid data is processed by the system.
  - Use **class-validator** decorators such as `@IsString()`, `@IsNotEmpty()`, and `@IsArray()` to ensure data integrity.
  - Example validation in the DTO:
    ```typescript
    @IsArray()
    @ValidateNested()
    translations: ProductTranslationDto[];
    ```
  - **Product Search**:
    - Ensure that the `query` parameter is a non-empty string, the `language` is valid, and `page` is a positive integer.


## Environment Configuration

- **.env**: Store environment variables for database connections, API keys, etc. Make sure to set up a `.env` file with values for your environment before running the application.

## Example `.env` file

```dotenv
PORT=3001
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password
POSTGRES_HOST=localhost
POSTGRES_PORT=5433
POSTGRES_DB=postgres
POSTGRES_SCHEMA=public
DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}?schema=${POSTGRES_SCHEMA}"
```
## Database Setup With Docker Compose
Running PostgreSQL with Docker Compose
```bash
$ docker-compose up -d
```

## Project setup

```bash
$ pnpm install
```


## Run Migration
```bash
$ npx prisma migrate dev
```

## Generate Prisma Client (after schema changes)
```bash
$ npx prisma generate
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```
