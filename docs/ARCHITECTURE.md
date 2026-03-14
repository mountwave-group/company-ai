# Company AI Branding Toolkit - Architecture

## Overview

Company AI is an enterprise-grade AI branding toolkit designed for generating consistent naming, messaging, and visual-direction outputs. The architecture follows a modular, plugin-based approach with clear separation of concerns.

## Core Modules

### 1. **LLM Provider** (`src/llm/`)
- Abstract interface for LLM integration
- Implementations for OpenAI and Anthropic
- Handles text generation and structured output parsing
- Configurable temperature, max tokens, and model selection

### 2. **Branding Generator** (`src/generators/`)
- Generates naming suggestions
- Creates messaging guidelines
- Produces visual direction guidelines
- Orchestrates LLM calls for comprehensive branding outputs

### 3. **Messaging Engine** (`src/messaging/`)
- Creates messaging templates (taglines, pitches, social posts, emails, press)
- Manages template variables and rendering
- Supports multiple messaging categories
- Template storage and retrieval

### 4. **Visual Direction Service** (`src/visual/`)
- Defines complete visual systems (colors, typography, imagery)
- Generates component libraries
- Exports CSS variable definitions
- Manages design system consistency

### 5. **Audit Logger** (`src/audit/`)
- Maintains comprehensive audit trail of all operations
- Time-range queries and filtering
- Audit report generation
- Integration with database for persistence

### 6. **Database Client** (`src/database/`)
- Abstracted database interface
- MongoDB and PostgreSQL implementations
- CRUD operations on audit logs, branding records, templates
- Connection pooling and error handling

### 7. **Storage Client** (`src/storage/`)
- Cloud storage abstraction layer
- AWS S3 and Google Cloud Storage implementations
- File upload, download, delete, and listing operations
- Content type and metadata handling

## Data Flow

```
User Input (BrandConfig)
    ↓
LLMProvider (generates suggestions)
    ↓
BrandingGenerator (orchestrates output)
    ↓
BrandingOutput (naming, messaging, visual)
    ↓
AuditLogger (logs actions)
    ↓
DatabaseClient (persists to DB)
    ↓
StorageClient (stores artifacts in cloud)
```

## Type Safety

- Full TypeScript support with strict mode enabled
- Zod schemas for runtime validation
- Type-safe configuration objects
- Compile-time type checking

## Configuration

Environment variables in `.env`:

- `LLM_PROVIDER`: 'openai' or 'anthropic'
- `OPENAI_API_KEY` / `ANTHROPIC_API_KEY`: API credentials
- `MONGODB_URI`: Database connection string
- `AWS_S3_BUCKET`: Cloud storage bucket name
- `NODE_ENV`: 'development' or 'production'
- `LOG_LEVEL`: 'debug', 'info', 'warn', 'error'

## Extension Points

The toolkit is designed for easy extension:

1. **Add new LLM providers**: Implement `ILLMProvider` interface
2. **Add new databases**: Implement `IDatabase` interface
3. **Add new storage providers**: Implement `IStorage` interface
4. **Custom generation logic**: Extend `BrandingGenerator` class
5. **Custom messaging templates**: Add to `MessagingEngine`

## Error Handling

- Winston-based logging throughout
- Graceful fallbacks for LLM failures
- Database connection pooling and retry logic
- Comprehensive error metadata for debugging

## Security Considerations

- Environment variables for sensitive credentials
- API key rotation recommendations
- Audit trail for compliance and accountability
- Database encryption at rest (recommended)
- Signed URLs for cloud storage access

## Testing

- Jest configuration with ts-jest preset
- Unit tests for core modules
- Mock implementations for external services
- Test database and storage clients
