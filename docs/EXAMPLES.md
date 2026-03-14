# Examples

This directory contains practical examples of using the Company AI Branding Toolkit.

## Basic Branding Generation

```typescript
import {
  BrandingGenerator,
  LLMProvider,
  MessagingEngine,
  VisualDirectionService,
  AuditLogger,
} from '@company-ai/branding-toolkit';

async function generateCompletebranding() {
  // Initialize LLM Provider
  const llm = new LLMProvider({
    provider: process.env.LLM_PROVIDER as 'openai' | 'anthropic',
    apiKey: process.env.OPENAI_API_KEY || process.env.ANTHROPIC_API_KEY!,
    model: process.env.LLM_MODEL || 'gpt-4',
    temperature: 0.7,
  });

  // Brand configuration
  const brandConfig = {
    companyName: 'CloudSync',
    industry: 'Cloud Infrastructure',
    targetAudience: 'DevOps Engineers and Cloud Architects',
    brandValues: ['Reliability', 'Simplicity', 'Security'],
    tone: 'professional' as const,
    visualStyle: {
      primaryColor: '#0066CC',
      secondaryColor: '#FF6B35',
      fontFamily: 'Inter',
    },
  };

  // Generate branding
  const generator = new BrandingGenerator(llm);
  const brandingOutput = await generator.generateBrandingOutput(brandConfig);

  console.log('=== BRANDING OUTPUT ===');
  console.log('ID:', brandingOutput.id);
  console.log('Generated:', brandingOutput.timestamp);
  console.log('\nNaming Suggestions:');
  brandingOutput.namingSuggestions.forEach((name, i) => {
    console.log(`  ${i + 1}. ${name}`);
  });
  console.log('\nMessaging Guidelines:');
  brandingOutput.messagingGuidelines.forEach((guideline, i) => {
    console.log(`  ${i + 1}. ${guideline}`);
  });

  return brandingOutput;
}

generateCompletebranding().catch(console.error);
```

## Messaging Template Generation

```typescript
import { MessagingEngine, LLMProvider } from '@company-ai/branding-toolkit';

async function createMessagingTemplates() {
  const llm = new LLMProvider({
    provider: 'openai',
    apiKey: process.env.OPENAI_API_KEY!,
    model: 'gpt-4',
  });

  const messaging = new MessagingEngine(llm);

  // Generate different message types
  const categories = ['tagline', 'elevator-pitch', 'social', 'email'] as const;

  for (const category of categories) {
    const template = await messaging.generateMessagingTemplate(
      {
        brandName: 'CloudSync',
        tone: 'professional',
        targetAudience: 'Enterprise DevOps Teams',
        brandValues: ['Efficiency', 'Security', 'Scalability'],
      },
      category
    );

    console.log(`\n${category.toUpperCase()}`);
    console.log('ID:', template.id);
    console.log('Template:', template.template);
    console.log('Variables:', template.variables);
  }
}

createMessagingTemplates().catch(console.error);
```

## Visual System Export

```typescript
import { VisualDirectionService } from '@company-ai/branding-toolkit';
import * as fs from 'fs';

function demonstrateVisualSystem() {
  const visualService = new VisualDirectionService();

  const brandConfig = {
    companyName: 'CloudSync',
    industry: 'Infrastructure',
    targetAudience: 'DevOps',
    brandValues: ['Reliability', 'Security'],
    tone: 'professional' as const,
    visualStyle: {
      primaryColor: '#0066CC',
      secondaryColor: '#FF6B35',
      fontFamily: 'Inter',
    },
  };

  // Create visual system
  const visualSystem = visualService.createVisualSystem(brandConfig);

  // Export as CSS
  const cssVariables = visualService.exportAsCSS(visualSystem.id);
  fs.writeFileSync('design-system.css', cssVariables);
  console.log('CSS variables exported to design-system.css');

  // Export as JSON
  const jsonExport = visualService.exportAsJSON(visualSystem.id);
  fs.writeFileSync('design-system.json', jsonExport);
  console.log('Design system exported to design-system.json');
}

demonstrateVisualSystem();
```

## Audit Trail and Reporting

```typescript
import { AuditLogger } from '@company-ai/branding-toolkit';

async function demonstrateAuditTrail() {
  const auditLogger = new AuditLogger();

  // Log various actions
  await auditLogger.logAction(
    'brand_created',
    { companyName: 'CloudSync', tier: 'enterprise' },
    'user-123',
    { source: 'api' }
  );

  await auditLogger.logAction(
    'messaging_template_generated',
    { templateCount: 4, brand: 'CloudSync' },
    'user-123'
  );

  await auditLogger.logAction(
    'visual_system_exported',
    { exportFormat: 'css', systemId: 'vs-12345' },
    'user-456'
  );

  // Generate audit report
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 30);
  const endDate = new Date();

  const report = await auditLogger.generateAuditReport(startDate, endDate);

  console.log('=== AUDIT REPORT ===');
  console.log('Period:', report.period.start, '-', report.period.end);
  console.log('Total Actions:', report.totalActions);
  console.log('Actions by Type:');
  Object.entries(report.actionsByType).forEach(([action, count]) => {
    console.log(`  ${action}: ${count}`);
  });

  // Export as JSON
  const auditJson = auditLogger.exportAsJSON(startDate, endDate);
  console.log('\nAudit Export:', auditJson);
}

demonstrateAuditTrail().catch(console.error);
```

## Database Integration

```typescript
import {
  DatabaseClient,
  BrandingGenerator,
  LLMProvider,
} from '@company-ai/branding-toolkit';

async function demonstrateDatabaseIntegration() {
  // Initialize database
  const db = new DatabaseClient({
    type: 'mongodb',
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/company-ai',
  });

  await db.connect();

  try {
    // Generate branding
    const llm = new LLMProvider({
      provider: 'openai',
      apiKey: process.env.OPENAI_API_KEY!,
      model: 'gpt-4',
    });

    const generator = new BrandingGenerator(llm);
    const output = await generator.generateBrandingOutput({
      companyName: 'CloudSync',
      industry: 'Infrastructure',
      targetAudience: 'DevOps',
      brandValues: ['Reliability'],
      tone: 'professional',
      visualStyle: {
        primaryColor: '#0066CC',
        secondaryColor: '#FF6B35',
      },
    });

    // Save to database
    const id = await db.saveRecord('branding_outputs', output);
    console.log('Saved branding output:', id);

    // Retrieve from database
    const retrieved = await db.getRecord('branding_outputs', id);
    console.log('Retrieved:', retrieved);

    // Query records
    const allBrandings = await db.queryRecords('branding_outputs', {
      'brandConfig.companyName': 'CloudSync',
    });
    console.log('Found branding outputs:', allBrandings.length);
  } finally {
    await db.disconnect();
  }
}

demonstrateDatabaseIntegration().catch(console.error);
```

## Cloud Storage Integration

```typescript
import { StorageClient } from '@company-ai/branding-toolkit';
import * as fs from 'fs';

async function demonstrateCloudStorage() {
  // Initialize storage
  const storage = new StorageClient({
    provider: 'aws',
    bucket: process.env.AWS_S3_BUCKET!,
    region: process.env.AWS_REGION || 'us-east-1',
  });

  await storage.connect();

  try {
    // Upload branding output as JSON
    const brandingData = {
      companyName: 'CloudSync',
      timestamp: new Date(),
      namingSuggestions: ['CloudSync Premium', 'SyncCloud Pro'],
    };

    const buffer = Buffer.from(JSON.stringify(brandingData, null, 2));
    const url = await storage.uploadFile(
      'branding-outputs/cloudsync-2024.json',
      buffer,
      'application/json'
    );

    console.log('Uploaded to:', url);

    // List files
    const files = await storage.listFiles('branding-outputs/');
    console.log('Files in branding-outputs/:', files);

    // Download file
    const downloaded = await storage.downloadFile('branding-outputs/cloudsync-2024.json');
    console.log('Downloaded:', downloaded.toString());
  } finally {
    // Note: StorageClient doesn't have a disconnect method in current impl
  }
}

demonstrateCloudStorage().catch(console.error);
```

## Running Examples

To run these examples:

1. Set up your `.env` file with necessary credentials
2. For database examples, ensure MongoDB or PostgreSQL is running
3. Run with ts-node:

```bash
npx ts-node examples/01-basic-branding.ts
npx ts-node examples/02-messaging-templates.ts
npx ts-node examples/03-visual-systems.ts
npx ts-node examples/04-audit-trail.ts
npx ts-node examples/05-database-integration.ts
npx ts-node examples/06-cloud-storage.ts
```
