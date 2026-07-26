# Database Design (Prisma + MySQL)

## Core Tables
- `User`, `RefreshToken`
- `Category`, `Supplier`, `Product`
- `Purchase`, `PurchaseItem`
- `Sale`, `SaleItem`
- `InventoryLog`, `AuditLog`, `Notification`

## Constraints and Normalization
- UUID primary keys for parent entities.
- Composite keys for line items (`PurchaseItem`, `SaleItem`).
- Unique constraints on key business identifiers (`email`, `sku`, `invoiceNo`, `token`).
- Foreign keys with explicit cascading/restrict rules.
- 3NF maintained by separating transactional headers and line items.
