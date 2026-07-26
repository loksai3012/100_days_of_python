# Database Design

## Tables

### 1) Users
- id (PK)
- name
- email (unique)
- passwordHash
- role (ADMIN)
- createdAt, updatedAt

### 2) Categories
- id (PK)
- name (unique)
- description
- createdAt, updatedAt

### 3) Suppliers
- id (PK)
- name
- email (unique, nullable)
- phone
- address
- createdAt, updatedAt

### 4) Products
- id (PK)
- name
- sku (unique)
- description
- imageUrl
- unitPrice (decimal)
- quantity
- lowStockThreshold
- categoryId (FK -> Categories)
- supplierId (FK -> Suppliers)
- createdAt, updatedAt

### 5) StockTransactions
- id (PK)
- productId (FK -> Products)
- type (IN | OUT)
- quantity
- unitPrice
- note
- performedBy (user id)
- createdAt

## Relationships
- Category 1:N Product
- Supplier 1:N Product
- Product 1:N StockTransaction

## Constraints
- Unique: users.email, categories.name, products.sku
- Positive values: stock quantity movements, unit prices
- Stock-out validation: quantity cannot become negative

## Business Rules
- **Stock In:** Product quantity += input quantity
- **Stock Out:** Product quantity -= output quantity (if enough stock)
- **Low Stock:** `quantity <= lowStockThreshold`
- **Inventory Value:** sum(`quantity * unitPrice`) across products
