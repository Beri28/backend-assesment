# Stakent Dashboard API Documentation

## Base URL
```
http://localhost:8081
```

## Authentication
The API uses JWT authentication. Most endpoints require a valid JWT token in the Authorization header.

### Authentication Endpoints

#### Register User
```http
POST /auth/register
```

**Request Body:**
```json
{
  "email": "string",
  "password": "string",
  "walletAddress": "string"
}
```

#### Login
```http
POST /auth/login
```

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

## Dashboard Endpoints

### Get Dashboard Overview
```http
GET /dashboard/overview?walletAddress={walletAddress}
```

### Get Recommended Assets
```http
GET /dashboard/recommended
```

### Get Performance Metrics
```http
GET /dashboard/performance?walletAddress={walletAddress}
```

### Get Investment Periods
```http
GET /dashboard/investment-periods
```

## Staking Endpoints

### Get Staking Assets
```http
GET /staking/assets
```

### Get Liquid Staking Portfolio
```http
GET /staking/portfolio?walletAddress={walletAddress}
```

### Stake Assets
```http
POST /staking/stake
```

**Request Body:**
```json
{
  "asset": "string",
  "amount": "number",
  "walletAddress": "string",
  "period": "number"
}
```

### Unstake Assets
```http
POST /staking/unstake
```

**Request Body:**
```json
{
  "asset": "string",
  "amount": "number",
  "walletAddress": "string"
}
```

### Get Staking Statistics
```http
GET /staking/statistics/{assetId}
```

### Get Staking Providers
```http
GET /staking/providers?asset={asset}
```

### Get Active Staking
```http
GET /staking/active?asset={asset}
```

### Get Top Stakings
```http
GET /staking/top?asset={asset}
```

### Get Liquid Stakings
```http
GET /staking/liquid?asset={asset}
```

### Add Staking Providers
```http
POST /staking/providers
```

**Request Body:**
```json
{
  "id": "string"
}
```

## Wallet Endpoints

### Create Wallet
```http
POST /wallet
```

**Request Body:**
```json
{
  "createWalletDto": {
    // Wallet creation parameters
  }
}
```

### Get All Wallets
```http
GET /wallet
```

### Get Wallet by ID
```http
GET /wallet/{id}
```

### Update Wallet
```http
PATCH /wallet/{id}
```

**Request Body:**
```json
{
  "updateWalletDto": {
    // Wallet update parameters
  }
}
```

### Delete Wallet
```http
DELETE /wallet/{id}
```

## Stablecoin Endpoints

### Create Stablecoin
```http
POST /stablecoin
```

**Request Body:**
```json
{
  "createStablecoinDto": {
    // Stablecoin creation parameters
  }
}
```

### Get All Stablecoins
```http
GET /stablecoin
```

### Get Stablecoin by ID
```http
GET /stablecoin/{id}
```

### Update Stablecoin
```http
PATCH /stablecoin/{id}
```

**Request Body:**
```json
{
  "updateStablecoinDto": {
    // Stablecoin update parameters
  }
}
```

### Delete Stablecoin
```http
DELETE /stablecoin/{id}
```

## Error Responses

The API uses standard HTTP response codes:

- `200 OK` - The request was successful
- `201 Created` - The request was successful and a resource was created
- `400 Bad Request` - The request was malformed
- `401 Unauthorized` - Authentication failed
- `403 Forbidden` - The authenticated user doesn't have access to the requested resource
- `404 Not Found` - The requested resource was not found
- `500 Internal Server Error` - Something went wrong on the server

Error responses will include a message describing the error:

```json
{
  "statusCode": 400,
  "message": "Error description",
  "error": "Bad Request"
}
```

## Notes

1. All endpoints except `/auth/login` and `/auth/register` require JWT authentication
2. The JWT token should be included in the Authorization header as a Bearer token
3. All timestamps are in ISO 8601 format
4. All amounts are in decimal format with up to 18 decimal places
5. Wallet addresses should be valid Ethereum addresses 