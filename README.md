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

