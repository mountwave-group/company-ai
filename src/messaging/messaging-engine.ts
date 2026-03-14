import { Logger } from '../utils/logger';
import { LLMProvider } from '../llm/llm-provider';

/**
 * Messaging Engine - Manages brand messaging templates and guidelines
 */
export interface MessagingTemplate {
  id: string;
  name: string;
  category: 'tagline' | 'elevator-pitch' | 'social' | 'email' | 'press';
  template: string;
  variables: string[];
}

export interface MessageContext {
  brandName: string;
  tone: string;
  targetAudience: string;
  brandValues: string[];
}

export class MessagingEngine {
  private llm: LLMProvider;
  private templates: Map<string, MessagingTemplate> = new Map();

  constructor(llm: LLMProvider) {
    this.llm = llm;
  }

  async generateMessagingTemplate(
    context: MessageContext,
    category: MessagingTemplate['category']
  ): Promise<MessagingTemplate> {
    Logger.info(`Generating ${category} messaging template for ${context.brandName}`);

    const categoryDescriptions = {
      'tagline': 'A short, memorable tagline (max 10 words)',
      'elevator-pitch': 'A 30-second elevator pitch',
      'social': 'A social media post (280 characters max)',
      'email': 'An email subject line and 3-line preview',
      'press': 'A press release headline and opening paragraph',
    };

    const prompt = `
      Create a ${categoryDescriptions[category]} for:
      - Brand: ${context.brandName}
      - Tone: ${context.tone}
      - Target Audience: ${context.targetAudience}
      - Brand Values: ${context.brandValues.join(', ')}
      
      The message should be compelling and aligned with the brand values.
    `;

    const content = await this.llm.generateText(prompt);

    const template: MessagingTemplate = {
      id: `${category}-${Date.now()}`,
      name: `${context.brandName} - ${category}`,
      category,
      template: content,
      variables: this.extractVariables(content),
    };

    this.templates.set(template.id, template);
    return template;
  }

  async renderTemplate(
    templateId: string,
    variables: Record<string, string>
  ): Promise<string> {
    const template = this.templates.get(templateId);
    if (!template) {
      throw new Error(`Template not found: ${templateId}`);
    }

    let rendered = template.template;
    for (const [key, value] of Object.entries(variables)) {
      rendered = rendered.replace(new RegExp(`{{${key}}}`, 'g'), value);
    }

    return rendered;
  }

  getTemplate(templateId: string): MessagingTemplate | undefined {
    return this.templates.get(templateId);
  }

  getAllTemplates(): MessagingTemplate[] {
    return Array.from(this.templates.values());
  }

  private extractVariables(template: string): string[] {
    const regex = /{{(\w+)}}/g;
    const variables: string[] = [];
    let match;

    while ((match = regex.exec(template)) !== null) {
      variables.push(match[1]);
    }

    return [...new Set(variables)];
  }
}
