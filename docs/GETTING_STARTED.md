# Getting Started with Company AI

## Installation

### Prerequisites

- Node.js 18+ or higher
- npm or yarn
- Database of choice (MongoDB or PostgreSQL)

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd company-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Build the project**
   ```bash
   npm run build
   ```

5. **Run tests**
   ```bash
   npm test
   ```

## Quick Start

### Basic Usage

```typescript
import {
  BrandingGenerator,
  LLMProvider,
  MessagingEngine,
  VisualDirectionService,
  AuditLogger,
} from '@company-ai/branding-toolkit';

// Initialize LLM
const llm = new LLMProvider({
  provider: 'openai',
  apiKey: process.env.OPENAI_API_KEY,
  model: 'gpt-4',
  temperature: 0.7,
});

// Create brand configuration
const brandConfig = {
  companyName: 'TechVenture',
  industry: 'SaaS',
  targetAudience: 'Enterprise Developers',
  brandValues: ['Innovation', 'Reliability', 'Simplicity'],
  tone: 'professional' as const,
  visualStyle: {
    primaryColor: '#1F6FBE',
    secondaryColor: '#CCFF00',
    fontFamily: 'Inter',
  },
};

// Generate branding output
const generator = new BrandingGenerator(llm);
const brandingOutput = await generator.generateBrandingOutput(brandConfig);

console.log('Naming Suggestions:', brandingOutput.namingSuggestions);
console.log('Messaging Guidelines:', brandingOutput.messagingGuidelines);
console.log('Visual Guidelines:', brandingOutput.visualGuidelines);
```

### Generate Messaging Templates

```typescript
const messagingEngine = new MessagingEngine(llm);

const emailTemplate = await messagingEngine.generateMessagingTemplate(
  {
    brandName: 'TechVenture',
    tone: 'professional',
    targetAudience: 'Enterprise Developers',
    brandValues: ['Innovation', 'Reliability'],
  },
  'email'
);

const rendered = await messagingEngine.renderTemplate(emailTemplate.id, {
  productName: 'TechVenture Pro',
  feature: 'AI-powered automation',
});

console.log('Email Template:', rendered);
```

### Create Visual System

```typescript
const visualService = new VisualDirectionService();
const visualSystem = visualService.createVisualSystem(brandConfig);

// Export as CSS variables
const cssVariables = visualService.exportAsCSS(visualSystem.id);
console.log(cssVariables);

// Export as JSON
const jsonExport = visualService.exportAsJSON(visualSystem.id);
console.log(JSON.parse(jsonExport));
```

### Audit Trail

```typescript
const auditLogger = new AuditLogger();

// Log an action
await auditLogger.logAction(
  'brand_generated',
  {
    companyName: 'TechVenture',
    outputId: brandingOutput.id,
  },
  'user-123',
  { source: 'api' }
);

// Generate audit report
const report = await auditLogger.generateAuditReport(
  new Date('2024-01-01'),
  new Date('2024-12-31')
);

console.log('Total Actions:', report.totalActions);
console.log('Actions by Type:', report.actionsByType);
```

## Configuration Guide

### LLM Configuration

**OpenAI:**
```env
LLM_PROVIDER=openai
OPENAI_API_KEY=sk-...
```

**Anthropic:**
```env
LLM_PROVIDER=anthropic
ANTHROPIC_API_KEY=sk-ant-...
```

### Database Configuration

**MongoDB:**
```env
DB_TYPE=mongodb
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/dbname
```

**PostgreSQL:**
```env
DB_TYPE=postgresql
MONGODB_URI=postgresql://user:password@localhost:5432/dbname
```

### Cloud Storage

**AWS S3:**
```env
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_REGION=us-east-1
AWS_S3_BUCKET=company-ai-branding
```

**Google Cloud Storage:**
```env
GOOGLE_CLOUD_PROJECT_ID=...
GOOGLE_CLOUD_STORAGE_BUCKET=...
```

## Development

### Watch mode
```bash
npm run dev
```

### Linting
```bash
npm run lint
npm run lint:fix
```

### Formatting
```bash
npm run format
npm run format:check
```

### Type checking
```bash
npm run type-check
```

## Troubleshooting

### API Key Issues
- Verify API keys in `.env` are correct
- Check API quota and rate limits
- Ensure API keys have required permissions

### Database Connection
- Verify connection string format
- Check database is running and accessible
- Ensure proper credentials and permissions

### Missing Dependencies
- Run `npm install` again
- Check `node_modules` directory exists
- Clear npm cache: `npm cache clean --force`

## Next Steps

1. Review [Architecture Guide](./ARCHITECTURE.md)
2. Check [API Documentation](./API.md)
3. Explore [Examples](./EXAMPLES.md)
4. Run test suite: `npm test`
