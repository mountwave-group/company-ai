import { Logger } from '../utils/logger';
import { LLMProvider } from '../llm/llm-provider';
import { BrandConfig, BrandingOutput } from '../types';
import { v4 as uuidv4 } from 'crypto';

/**
 * Branding Generator - Creates naming suggestions and brand outputs
 */
export class BrandingGenerator {
  private llm: LLMProvider;

  constructor(llm: LLMProvider) {
    this.llm = llm;
  }

  async generateBrandingOutput(brandConfig: BrandConfig): Promise<BrandingOutput> {
    Logger.info(`Generating branding output for: ${brandConfig.companyName}`);

    try {
      const [namingSuggestions, messagingGuidelines, visualGuidelines] = await Promise.all([
        this.generateNamingSuggestions(brandConfig),
        this.generateMessagingGuidelines(brandConfig),
        this.generateVisualGuidelines(brandConfig),
      ]);

      const output: BrandingOutput = {
        id: uuidv4().toString(),
        timestamp: new Date(),
        brandConfig,
        namingSuggestions,
        messagingGuidelines,
        visualGuidelines,
      };

      Logger.info(`Successfully generated branding output: ${output.id}`);
      return output;
    } catch (error) {
      Logger.error('Error generating branding output', { error });
      throw error;
    }
  }

  private async generateNamingSuggestions(config: BrandConfig): Promise<string[]> {
    const prompt = `
      Generate 5 creative and memorable brand names for:
      - Company: ${config.companyName}
      - Industry: ${config.industry}
      - Target Audience: ${config.targetAudience}
      - Brand Values: ${config.brandValues.join(', ')}
      - Tone: ${config.tone}
      
      Return only the names, one per line.
    `;

    const response = await this.llm.generateText(prompt);
    return response.split('\n').filter((name) => name.trim());
  }

  private async generateMessagingGuidelines(config: BrandConfig): Promise<string[]> {
    const prompt = `
      Create messaging guidelines for a brand with these characteristics:
      - Company: ${config.companyName}
      - Industry: ${config.industry}
      - Target Audience: ${config.targetAudience}
      - Brand Values: ${config.brandValues.join(', ')}
      - Tone: ${config.tone}
      
      Provide 5-6 key messaging guidelines as actionable statements.
    `;

    const response = await this.llm.generateText(prompt);
    return response.split('\n').filter((guideline) => guideline.trim());
  }

  private async generateVisualGuidelines(config: BrandConfig): Promise<{
    colorPalette: string[];
    typography: string[];
    imagery: string;
  }> {
    const prompt = `
      Create visual direction guidelines for:
      - Company: ${config.companyName}
      - Industry: ${config.industry}
      - Primary Color: ${config.visualStyle.primaryColor}
      - Secondary Color: ${config.visualStyle.secondaryColor}
      - Brand Values: ${config.brandValues.join(', ')}
      
      Respond with a JSON object containing:
      {
        "colorPalette": ["color1", "color2", ...],
        "typography": ["guideline1", "guideline2", ...],
        "imagery": "description of imagery style"
      }
    `;

    try {
      const response = await this.llm.generateStructured(prompt, null);
      return response as any;
    } catch {
      Logger.warn('Failed to generate structured visual guidelines, using defaults');
      return {
        colorPalette: [config.visualStyle.primaryColor, config.visualStyle.secondaryColor],
        typography: ['Sans-serif for headlines', 'Serif for body text'],
        imagery: 'Modern, minimalist style with emphasis on brand values',
      };
    }
  }
}
