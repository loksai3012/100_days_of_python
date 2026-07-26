# API Documentation

Base URL: `http://localhost:5000/api`

## Auth
- `POST /auth/register`
- `POST /auth/login`

## Categories
- `GET /categories`
- `POST /categories`
- `PUT /categories/:id`
- `DELETE /categories/:id`

## Suppliers
- `GET /suppliers`
- `POST /suppliers`
- `PUT /suppliers/:id`
- `DELETE /suppliers/:id`

## Products
- `GET /products?q=term`
- `GET /products/:id`
- `POST /products` (multipart/form-data, image optional)
- `PUT /products/:id` (multipart/form-data, image optional)
- `DELETE /products/:id`

## Stock
- `POST /stock/in`
- `POST /stock/out`
- `GET /stock/transactions?productId=1`

## Dashboard
- `GET /dashboard`

## Reports
- `GET /reports/inventory`
- `GET /reports/sales`
- `GET /reports/inventory/pdf`

## Auth Header
Protected APIs require:
`Authorization: ******

## Standard Response Format
```json
{
  "success": true,
  "message": "Success",
  "data": {}
}
```
