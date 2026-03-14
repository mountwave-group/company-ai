# Company AI API Reference

## Core Classes

### BrandingGenerator

Orchestrates the generation of complete branding outputs including naming suggestions, messaging guidelines, and visual direction.

```typescript
class BrandingGenerator {
  constructor(llm: LLMProvider);
  
  async generateBrandingOutput(brandConfig: BrandConfig): Promise<BrandingOutput>;
  private async generateNamingSuggestions(config: BrandConfig): Promise<string[]>;
  private async generateMessagingGuidelines(config: BrandConfig): Promise<string[]>;
  private async generateVisualGuidelines(config: BrandConfig): Promise<VisualGuidelines>;
}
```

**Example:**
```typescript
const generator = new BrandingGenerator(llm);
const output = await generator.generateBrandingOutput({
  companyName: 'MyBrand',
  industry: 'Technology',
  targetAudience: 'Developers',
  brandValues: ['Innovation'],
  tone: 'professional',
  visualStyle: { primaryColor: '#000', secondaryColor: '#FFF' }
});
```

### MessagingEngine

Creates and manages brand messaging templates across multiple channels.

```typescript
class MessagingEngine {
  constructor(llm: LLMProvider);
  
  async generateMessagingTemplate(
    context: MessageContext,
    category: 'tagline' | 'elevator-pitch' | 'social' | 'email' | 'press'
  ): Promise<MessagingTemplate>;
  
  async renderTemplate(
    templateId: string,
    variables: Record<string, string>
  ): Promise<string>;
  
  getTemplate(templateId: string): MessagingTemplate | undefined;
  getAllTemplates(): MessagingTemplate[];
}
```

**Example:**
```typescript
const messaging = new MessagingEngine(llm);
const template = await messaging.generateMessagingTemplate({
  brandName: 'MyBrand',
  tone: 'professional',
  targetAudience: 'Enterprise',
  brandValues: ['Trust']
}, 'elevator-pitch');

const rendered = await messaging.renderTemplate(template.id, {
  feature: 'Cloud automation'
});
```

### VisualDirectionService

Manages complete visual direction systems including colors, typography, and components.

```typescript
class VisualDirectionService {
  createVisualSystem(brandConfig: BrandConfig): VisualSystem;
  getVisualSystem(id: string): VisualSystem | undefined;
  exportAsJSON(id: string): string;
  exportAsCSS(id: string): string;
}
```

**Example:**
```typescript
const visual = new VisualDirectionService();
const system = visual.createVisualSystem(brandConfig);
const css = visual.exportAsCSS(system.id);
```

### AuditLogger

Maintains comprehensive audit trails for all operations.

```typescript
class AuditLogger {
  constructor(database?: DatabaseClient);
  
  async logAction(
    action: string,
    changes: Record<string, any>,
    userId?: string,
    metadata?: Record<string, any>
  ): Promise<AuditEntry>;
  
  getEntry(id: string): AuditEntry | undefined;
  getEntriesByAction(action: string): AuditEntry[];
  getEntriesByUser(userId: string): AuditEntry[];
  getEntriesInTimeRange(startTime: Date, endTime: Date): AuditEntry[];
  
  async generateAuditReport(
    startDate: Date,
    endDate: Date
  ): Promise<AuditReport>;
  
  exportAsJSON(startDate?: Date, endDate?: Date): string;
  clearOldEntries(olderThanDays: number): number;
}
```

**Example:**
```typescript
const audit = new AuditLogger(database);
await audit.logAction('brand_created', { brandId: '123' }, 'user-1');
const report = await audit.generateAuditReport(startDate, endDate);
```

### LLMProvider

Unified interface for multiple LLM providers.

```typescript
class LLMProvider {
  constructor(config: LLMConfig);
  
  async generateText(prompt: string): Promise<string>;
  async generateStructured<T>(prompt: string, schema: any): Promise<T>;
}
```

**Example:**
```typescript
const llm = new LLMProvider({
  provider: 'openai',
  apiKey: 'sk-...',
  model: 'gpt-4',
  temperature: 0.7
});

const text = await llm.generateText('Generate 5 brand names');
```

### DatabaseClient

Abstracted database interface supporting MongoDB and PostgreSQL.

```typescript
class DatabaseClient {
  constructor(config: DatabaseConfig);
  
  async connect(): Promise<void>;
  async disconnect(): Promise<void>;
  async saveRecord<T>(collection: string, data: T): Promise<string>;
  async getRecord<T>(collection: string, id: string): Promise<T | null>;
  async updateRecord<T>(collection: string, id: string, data: Partial<T>): Promise<void>;
  async queryRecords<T>(collection: string, filter: Record<string, any>): Promise<T[]>;
}
```

**Example:**
```typescript
const db = new DatabaseClient({
  type: 'mongodb',
  uri: 'mongodb://localhost:27017/company-ai'
});

await db.connect();
const id = await db.saveRecord('brands', brandingOutput);
```

### StorageClient

Cloud storage abstraction for AWS S3 and Google Cloud Storage.

```typescript
class StorageClient {
  constructor(config: StorageConfig);
  
  async connect(): Promise<void>;
  async uploadFile(path: string, buffer: Buffer, contentType: string): Promise<string>;
  async downloadFile(path: string): Promise<Buffer>;
  async deleteFile(path: string): Promise<void>;
  async listFiles(prefix: string): Promise<string[]>;
}
```

**Example:**
```typescript
const storage = new StorageClient({
  provider: 'aws',
  bucket: 'company-ai-branding',
  region: 'us-east-1'
});

const url = await storage.uploadFile(
  'brands/mybrand.json',
  Buffer.from(JSON.stringify(brandingOutput)),
  'application/json'
);
```

## Type Definitions

### BrandConfig
```typescript
interface BrandConfig {
  companyName: string;
  industry: string;
  targetAudience: string;
  brandValues: string[];
  tone: 'professional' | 'casual' | 'playful' | 'innovative' | 'trustworthy';
  visualStyle: {
    primaryColor: string;
    secondaryColor: string;
    fontFamily?: string;
  };
}
```

### BrandingOutput
```typescript
interface BrandingOutput {
  id: string;
  timestamp: Date;
  brandConfig: BrandConfig;
  namingSuggestions: string[];
  messagingGuidelines: string[];
  visualGuidelines: {
    colorPalette: string[];
    typography: string[];
    imagery: string;
  };
  auditTrail?: Record<string, any>;
}
```

### AuditEntry
```typescript
interface AuditEntry {
  id: string;
  timestamp: Date;
  action: string;
  userId?: string;
  changes: Record<string, any>;
  metadata?: Record<string, any>;
}
```

## Error Handling

All async operations may throw errors. Wrap calls in try-catch blocks:

```typescript
try {
  const output = await generator.generateBrandingOutput(config);
} catch (error) {
  console.error('Generation failed:', error);
  // Handle error appropriately
}
```

## Logging

The toolkit uses Winston for logging. Configure via environment variables:

```env
LOG_LEVEL=debug  # debug, info, warn, error
NODE_ENV=development
```

Logs are output to console in development and to files in production.
