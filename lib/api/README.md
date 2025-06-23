# API Client Documentation

## Overview

The API client has been updated to work with the new standardized backend response format. All API responses from the backend are now wrapped in a consistent structure.

## Backend Response Format

All API responses from the backend follow this structure:

```typescript
interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  timestamp: string;
  path?: string;
}
```

### Success Response Example
```json
{
  "success": true,
  "data": { "id": "123", "name": "John Doe" },
  "message": "User created successfully",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "path": "/api/users"
}
```

### Error Response Example
```json
{
  "success": false,
  "message": "User not found",
  "error": "NOT_FOUND",
  "statusCode": 404,
  "timestamp": "2024-01-01T00:00:00.000Z",
  "path": "/api/users/123"
}
```

## Enhanced API Client

The API client automatically handles the response wrapping and extraction:

### Basic Usage

```typescript
import api from '@/lib/api';

// GET request - automatically extracts data from response
const user = await api.get<User>('/users/123');

// POST request - automatically extracts data from response
const newUser = await api.post<User>('/users', userData);

// PUT request - automatically extracts data from response
const updatedUser = await api.put<User>('/users/123', updateData);

// DELETE request - automatically extracts data from response
const result = await api.delete<{ success: boolean }>('/users/123');
```

### Error Handling

The API client automatically handles errors and throws them with meaningful messages:

```typescript
try {
  const user = await api.get<User>('/users/123');
} catch (error) {
  // error.message will contain the message from the backend
  console.error('API Error:', error.message);
}
```

### Raw API Access

If you need access to the full response (including metadata), use the raw API:

```typescript
import api from '@/lib/api';

// Get the full response including success, message, timestamp, etc.
const response = await api.raw.get<ApiResponse<User>>('/users/123');
console.log(response.data.success); // true/false
console.log(response.data.message); // "User found"
console.log(response.data.timestamp); // "2024-01-01T00:00:00.000Z"
```

## Migration from Old API

The API client is backward compatible. Existing code should continue to work without changes:

```typescript
// Old way (still works)
const user = await api.get<User>('/users/123');

// New way (same result)
const user = await api.get<User>('/users/123');
```

The only difference is that the client now automatically extracts the `data` field from the wrapped response, so you don't need to access `.data` manually.

## Pagination Support

For paginated responses, the backend returns:

```typescript
interface PaginatedResponse<T = unknown> extends ApiResponse<T[]> {
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}
```

Usage:

```typescript
// The client will return just the data array
const users = await api.get<User[]>('/users?page=1&limit=10');

// For pagination info, use raw API
const response = await api.raw.get<PaginatedResponse<User>>('/users?page=1&limit=10');
const { data: users, pagination } = response.data;
``` 
