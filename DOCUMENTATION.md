# Technical Documentation

## Overview

This Inventory Management System is a full-stack web application designed for e-commerce merchants to track and manage their product inventory. It provides real-time analytics, stock tracking, and comprehensive product management features.

## Architecture

### System Design

```
┌─────────────────┐     ┌─────────────────┐
│   React App     │────▶│  Express API    │
│   (Frontend)    │◀────│  (Backend)      │
└─────────────────┘     └─────────────────┘
                              │
                              ▼
                        ┌─────────────────┐
                        │  In-Memory DB   │
                        │  (Data Store)   │
                        └─────────────────┘
```

### Data Flow

1. User interacts with React frontend
2. Frontend makes API calls via Axios
3. Express handles requests and validates data
4. Data is stored/retrieved from in-memory store
5. Response is sent back to frontend
6. UI updates to reflect changes

## API Documentation

### Products API

#### GET /api/products

Retrieve all products with optional filtering, searching, and sorting.

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| search | string | Search by name or SKU |
| status | string | Filter by status: `all`, `in-stock`, `low-stock`, `out-of-stock` |
| sortBy | string | Sort field: `name`, `price`, `stockQuantity` |
| sortOrder | string | Sort direction: `asc`, `desc` |

**Response:**
```json
[
  {
    "id": "uuid",
    "name": "Laptop",
    "sku": "LP103",
    "price": 849.99,
    "stockQuantity": 34,
    "minStockThreshold": 10,
    "status": "in-stock",
    "createdAt": "2024-01-15T10:00:00.000Z",
    "updatedAt": "2024-01-15T10:00:00.000Z"
  }
]
```

#### GET /api/products/:id

Get a single product by ID.

**Response:** Single product object

#### POST /api/products

Create a new product.

**Request Body:**
```json
{
  "name": "Product Name",
  "sku": "SKU001",
  "price": 99.99,
  "stockQuantity": 50,
  "minStockThreshold": 10
}
```

**Validation Rules:**
- `name`: Required, non-empty string
- `sku`: Required, must be unique
- `price`: Required, must be >= 0
- `stockQuantity`: Required, must be >= 0
- `minStockThreshold`: Optional, defaults to 5

**Error Response (400):**
```json
{
  "errors": [
    { "field": "sku", "message": "SKU already exists" }
  ]
}
```

#### PUT /api/products/:id

Update an existing product. Only provided fields are updated.

**Request Body:** Same as POST (all fields optional)

**Note:** Changing `stockQuantity` automatically creates a stock history entry.

#### DELETE /api/products/:id

Delete a product.

**Response:**
```json
{
  "message": "Product deleted successfully"
}
```

### Analytics API

#### GET /api/analytics

Get dashboard analytics data.

**Response:**
```json
{
  "totalProducts": 128,
  "totalInventoryValue": 12540.00,
  "lowStockCount": 5,
  "outOfStockCount": 3,
  "inStockCount": 120,
  "lowStockItems": [
    {
      "id": "uuid",
      "name": "Wireless Mouse",
      "currentStock": 2,
      "threshold": 5
    }
  ]
}
```

### Stock History API

#### GET /api/stock-history

Get stock change history log.

**Response:**
```json
[
  {
    "id": "uuid",
    "productId": "uuid",
    "productName": "Wireless Mouse",
    "productSku": "WM203",
    "previousStock": 10,
    "newStock": 2,
    "change": -8,
    "timestamp": "2024-01-15T10:30:00.000Z"
  }
]
```

## Data Models

### Product

| Field | Type | Description |
|-------|------|-------------|
| id | string (UUID) | Unique identifier |
| name | string | Product name |
| sku | string | Stock Keeping Unit (unique) |
| price | number | Unit price |
| stockQuantity | number | Current stock level |
| minStockThreshold | number | Low stock warning threshold |
| createdAt | string (ISO) | Creation timestamp |
| updatedAt | string (ISO) | Last update timestamp |

### Stock History Entry

| Field | Type | Description |
|-------|------|-------------|
| id | string (UUID) | Unique identifier |
| productId | string | Reference to product |
| productName | string | Product name at time of change |
| productSku | string | Product SKU |
| previousStock | number | Stock before change |
| newStock | number | Stock after change |
| change | number | Difference (+/-) |
| timestamp | string (ISO) | When change occurred |

## Stock Status Logic

Products are categorized into three status levels:

```javascript
function getProductStatus(product) {
  if (stockQuantity === 0) return 'out-of-stock';
  if (stockQuantity <= minStockThreshold) return 'low-stock';
  return 'in-stock';
}
```

## Frontend Components

### Layout Components
- **Layout** - Main app wrapper with sidebar and header
- **Sidebar** - Navigation menu with icons
- **Header** - App branding and user controls

### Dashboard Components
- **StatCard** - Metric display card
- **InventoryChart** - Bar chart using Chart.js
- **LowStockAlerts** - Warning list for low stock items

### Product Components
- **ProductTable** - Data table with actions
- **StatusBadge** - Color-coded status indicator
- **SearchBar** - Search input with icon
- **FilterDropdown** - Status filter select
- **SortDropdown** - Sort options select
- **ProductModal** - Add/Edit form modal
- **DeleteModal** - Delete confirmation dialog

## Assumptions

1. **Single User**: No authentication/authorization required
2. **In-Memory Storage**: Data resets on server restart
3. **Single Currency**: All prices in USD
4. **Integer Stock**: Stock quantities are whole numbers
5. **Unique SKU**: SKUs are case-insensitive and unique

## Trade-offs

### In-Memory vs Database
- **Chosen**: In-memory array storage
- **Reason**: Simplicity for demo, no setup required
- **Trade-off**: Data doesn't persist across restarts
- **Production**: Would use PostgreSQL or MongoDB

### Client-Side vs Server-Side Filtering
- **Chosen**: Server-side filtering/sorting
- **Reason**: Scales better with large datasets
- **Trade-off**: More API calls, slightly more latency
- **Benefit**: Consistent behavior regardless of data size

### Modal vs Separate Page for Forms
- **Chosen**: Modal dialogs
- **Reason**: Faster workflow, no navigation
- **Trade-off**: Limited space for complex forms
- **Benefit**: Context preserved, smoother UX

### Tailwind vs Custom CSS
- **Chosen**: Tailwind CSS
- **Reason**: Rapid development, consistent design
- **Trade-off**: Larger HTML, learning curve
- **Benefit**: No context switching, easy maintenance

## Future Improvements

1. **Database Integration** - PostgreSQL for data persistence
2. **User Authentication** - JWT-based auth system
3. **CSV Import/Export** - Bulk data operations
4. **Pagination** - Handle large product catalogs
5. **Image Upload** - Product photos
6. **Categories** - Product categorization
7. **Warehouse Locations** - Multi-location inventory
8. **Audit Log** - Complete change tracking
9. **Email Alerts** - Low stock notifications
10. **Barcode Scanning** - Mobile-friendly input

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance Considerations

- Debounced search (300ms delay)
- Component-level loading states
- Optimized re-renders with proper React keys
- Minimal bundle size with tree-shaking
