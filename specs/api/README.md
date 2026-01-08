# API Specifications

This directory contains API contracts and documentation for the hackathon-todo application.

## Purpose

API specifications serve as the **interface contract** between frontend and backend workspaces. Both teams must adhere to these contracts to ensure seamless integration.

## Structure

```
api/
├── README.md           # This file
├── openapi.yaml        # OpenAPI/Swagger specification (if using REST)
├── schema.graphql      # GraphQL schema (if using GraphQL)
└── endpoints/          # Individual endpoint documentation
    ├── todos.md
    ├── users.md
    └── auth.md
```

## API Contract Guidelines

### 1. Endpoint Documentation

For each endpoint, document:
- **Method**: GET, POST, PUT, PATCH, DELETE
- **Path**: `/api/v1/todos/:id`
- **Authentication**: Required? Token type?
- **Request Headers**: Content-Type, Authorization, etc.
- **Request Body**: Schema with examples
- **Response Codes**: 200, 201, 400, 401, 403, 404, 500, etc.
- **Response Body**: Schema with examples
- **Error Responses**: Format and error codes

### 2. Data Models

Define shared data models:
```typescript
interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}
```

### 3. Versioning

- Use versioned endpoints: `/api/v1/`, `/api/v2/`
- Document breaking changes
- Maintain backward compatibility when possible

### 4. Error Format

Standardize error responses:
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "title",
        "message": "Title is required"
      }
    ]
  }
}
```

## Workflow

1. **Design First**: Define API contracts before implementation
2. **Review**: Both frontend and backend teams review and approve
3. **Implement**: Backend implements the contract
4. **Integrate**: Frontend consumes the API
5. **Test**: Verify contract compliance with integration tests

## Tools

- **OpenAPI/Swagger**: For REST APIs
- **GraphQL Schema**: For GraphQL APIs
- **Postman Collections**: For manual testing
- **Contract Testing**: Use tools like Pact for automated contract testing
