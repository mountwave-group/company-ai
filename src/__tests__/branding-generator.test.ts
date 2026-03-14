import { BrandingGenerator } from '../generators/branding-generator';
import { LLMProvider } from '../llm/llm-provider';
import { BrandConfig } from '../types';

/**
 * Test suite for BrandingGenerator
 */

// Mock LLMProvider
jest.mock('../llm/llm-provider');

describe('BrandingGenerator', () => {
  let generator: BrandingGenerator;
  let mockLLM: jest.Mocked<LLMProvider>;

  beforeEach(() => {
    mockLLM = new LLMProvider({
      provider: 'openai',
      apiKey: 'test-key',
      model: 'gpt-4',
    }) as jest.Mocked<LLMProvider>;

    generator = new BrandingGenerator(mockLLM);
  });

  const mockBrandConfig: BrandConfig = {
    companyName: 'TechVenture',
    industry: 'SaaS',
    targetAudience: 'Enterprise',
    brandValues: ['Innovation', 'Reliability', 'Simplicity'],
    tone: 'professional',
    visualStyle: {
      primaryColor: '#1F6FBE',
      secondaryColor: '#CCFF00',
    },
  };

  test('should generate branding output', async () => {
    mockLLM.generateText = jest.fn().mockResolvedValue('Name1\nName2\nName3');

    const output = await generator.generateBrandingOutput(mockBrandConfig);

    expect(output).toBeDefined();
    expect(output.id).toBeDefined();
    expect(output.timestamp).toBeInstanceOf(Date);
    expect(output.brandConfig).toEqual(mockBrandConfig);
    expect(output.namingSuggestions).toHaveLength(3);
  });

  test('should handle generation errors gracefully', async () => {
    mockLLM.generateText = jest.fn().mockRejectedValue(new Error('API Error'));

    await expect(generator.generateBrandingOutput(mockBrandConfig)).rejects.toThrow();
  });
});
