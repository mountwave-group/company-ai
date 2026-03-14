# Company AI - Enterprise Branding Toolkit

A TypeScript-based, company-grade AI branding toolkit for generating consistent naming, messaging, and visual-direction outputs—built for reliability, auditability, and easy integration into real production workflows.

## ✨ Features

- **AI-Powered Branding**: Generate creative naming suggestions, messaging guidelines, and visual direction using OpenAI or Anthropic
- **Multi-Channel Messaging**: Create templates for taglines, elevator pitches, social posts, emails, and press releases
- **Visual Direction**: Complete design system generation with color palettes, typography, and component libraries
- **Audit Trail**: Comprehensive logging and audit trail for all operations with compliance-ready reporting
- **Database Support**: MongoDB and PostgreSQL backends for persistence
- **Cloud Storage**: AWS S3 and Google Cloud Storage integration for artifact management
- **Type-Safe**: Full TypeScript with Zod validation for runtime safety
- **Enterprise Ready**: Winston logging, error handling, and configurable environments

## 🚀 Quick Start

### Installation

```bash
npm install @company-ai/branding-toolkit
```

### Basic Usage

```typescript
import { BrandingGenerator, LLMProvider } from '@company-ai/branding-toolkit';

const llm = new LLMProvider({
  provider: 'openai',
  apiKey: process.env.OPENAI_API_KEY,
  model: 'gpt-4',
});

const generator = new BrandingGenerator(llm);

const output = await generator.generateBrandingOutput({
  companyName: 'TechVenture',
  industry: 'SaaS',
  targetAudience: 'Enterprise',
  brandValues: ['Innovation', 'Reliability'],
  tone: 'professional',
  visualStyle: {
    primaryColor: '#1F6FBE',
    secondaryColor: '#CCFF00',
  },
});

console.log(output.namingSuggestions);
console.log(output.visualGuidelines);
```

## 📚 Documentation

- [Getting Started Guide](./docs/GETTING_STARTED.md)
- [Architecture Overview](./docs/ARCHITECTURE.md)
- [API Reference](./docs/API.md)

## 🛠 Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Development watch mode
npm run dev

# Tests
npm test

# Linting
npm run lint
npm run lint:fix

# Format code
npm run format
```

## 🔧 Environment Setup

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

Required environment variables:
- `OPENAI_API_KEY` or `ANTHROPIC_API_KEY`
- `MONGODB_URI` or PostgreSQL connection string
- `AWS_S3_BUCKET` (optional) or GCS configuration

## 📦 Project Structure

```
src/
├── llm/              # LLM provider implementations
├── generators/       # Branding output generation
├── messaging/        # Messaging template engine
├── visual/           # Visual direction service
├── audit/            # Audit logging
├── database/         # Database abstractions
├── storage/          # Cloud storage integrations
├── types/            # TypeScript definitions
├── utils/            # Utilities (logging, helpers)
└── __tests__/        # Test suite

docs/
├── ARCHITECTURE.md   # System architecture
├── GETTING_STARTED.md # Setup & usage guide
└── API.md            # API reference
```

## 🔐 Security

- Credentials stored in environment variables
- Audit trail for compliance
- Database encryption recommended
- Cloud storage with signed URLs

## 📄 License

MIT

## 🤝 Contributing

Contributions welcome! Please ensure tests pass and code is linted before submitting PRs.
