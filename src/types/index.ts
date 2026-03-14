import { z } from 'zod';

/**
 * Core typing system for Company AI Branding Toolkit
 */

export const BrandConfigSchema = z.object({
  companyName: z.string().min(1),
  industry: z.string(),
  targetAudience: z.string(),
  brandValues: z.array(z.string()),
  tone: z.enum(['professional', 'casual', 'playful', 'innovative', 'trustworthy']),
  visualStyle: z.object({
    primaryColor: z.string(),
    secondaryColor: z.string(),
    fontFamily: z.string().optional(),
  }),
});

export type BrandConfig = z.infer<typeof BrandConfigSchema>;

export const BrandingOutputSchema = z.object({
  id: z.string(),
  timestamp: z.date(),
  brandConfig: BrandConfigSchema,
  namingSuggestions: z.array(z.string()),
  messagingGuidelines: z.array(z.string()),
  visualGuidelines: z.object({
    colorPalette: z.array(z.string()),
    typography: z.array(z.string()),
    imagery: z.string(),
  }),
  auditTrail: z.record(z.any()).optional(),
});

export type BrandingOutput = z.infer<typeof BrandingOutputSchema>;

export interface LLMConfig {
  provider: 'openai' | 'anthropic';
  apiKey: string;
  model: string;
  temperature?: number;
  maxTokens?: number;
}

export interface DatabaseConfig {
  type: 'mongodb' | 'postgresql';
  uri: string;
}

export interface StorageConfig {
  provider: 'aws' | 'google';
  bucket: string;
  region?: string;
}

export interface AuditEntry {
  id: string;
  timestamp: Date;
  action: string;
  userId?: string;
  changes: Record<string, any>;
  metadata?: Record<string, any>;
}
