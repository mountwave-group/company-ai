import { Logger } from '../utils/logger';
import { BrandConfig } from '../types';

/**
 * Visual Direction Service - Manages visual branding guidelines
 */
export interface VisualSystem {
  id: string;
  brandName: string;
  colorPalette: ColorPalette;
  typography: Typography;
  imagery: ImageryGuidelines;
  components: ComponentLibrary;
  createdAt: Date;
}

export interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  neutral: string[];
  semantics: {
    success: string;
    warning: string;
    danger: string;
    info: string;
  };
}

export interface Typography {
  headings: Font[];
  body: Font;
  captions: Font;
}

export interface Font {
  family: string;
  weights: number[];
  lineHeight: number;
}

export interface ImageryGuidelines {
  style: string;
  photography: string;
  illustrations: string;
  iconography: string;
}

export interface ComponentLibrary {
  buttons: ComponentStyle[];
  cards: ComponentStyle[];
  inputs: ComponentStyle[];
  badges: ComponentStyle[];
}

export interface ComponentStyle {
  name: string;
  description: string;
  usage: string;
  variants: string[];
}

export class VisualDirectionService {
  private visualSystems: Map<string, VisualSystem> = new Map();

  createVisualSystem(brandConfig: BrandConfig): VisualSystem {
    Logger.info(`Creating visual system for: ${brandConfig.companyName}`);

    const system: VisualSystem = {
      id: `vs-${Date.now()}`,
      brandName: brandConfig.companyName,
      colorPalette: this.generateColorPalette(brandConfig),
      typography: this.generateTypography(brandConfig),
      imagery: this.generateImageryGuidelines(brandConfig),
      components: this.generateComponentLibrary(brandConfig),
      createdAt: new Date(),
    };

    this.visualSystems.set(system.id, system);
    return system;
  }

  private generateColorPalette(config: BrandConfig): ColorPalette {
    return {
      primary: config.visualStyle.primaryColor,
      secondary: config.visualStyle.secondaryColor,
      accent: this.generateAccentColor(config.visualStyle.primaryColor),
      neutral: [
        '#F5F5F7',
        '#D1D1D6',
        '#8E8E93',
        '#424245',
        '#1C1C1E',
      ],
      semantics: {
        success: '#34C759',
        warning: '#FF9500',
        danger: '#FF3B30',
        info: '#00B4DB',
      },
    };
  }

  private generateAccentColor(primaryColor: string): string {
    // Simple accent generation (in production, this would be more sophisticated)
    return primaryColor;
  }

  private generateTypography(config: BrandConfig): Typography {
    const fontFamily = config.visualStyle.fontFamily || 'Inter';

    return {
      headings: [
        { family: fontFamily, weights: [700], lineHeight: 1.2 },
        { family: fontFamily, weights: [600], lineHeight: 1.3 },
        { family: fontFamily, weights: [600], lineHeight: 1.4 },
      ],
      body: {
        family: fontFamily,
        weights: [400, 500],
        lineHeight: 1.6,
      },
      captions: {
        family: fontFamily,
        weights: [400],
        lineHeight: 1.4,
      },
    };
  }

  private generateImageryGuidelines(_config: BrandConfig): ImageryGuidelines {
    return {
      style: 'Modern, minimal with emphasis on clarity and simplicity',
      photography: 'Authentic, candid photography with natural lighting',
      illustrations: 'Geometric, clean line-work with brand colors',
      iconography: 'Consistent stroke weight, 24px base grid',
    };
  }

  private generateComponentLibrary(_config: BrandConfig): ComponentLibrary {
    return {
      buttons: [
        {
          name: 'Primary Button',
          description: 'Main call-to-action button',
          usage: 'High-emphasis actions',
          variants: ['default', 'hover', 'active', 'disabled'],
        },
        {
          name: 'Secondary Button',
          description: 'Secondary action button',
          usage: 'Secondary actions',
          variants: ['default', 'hover', 'active', 'disabled'],
        },
      ],
      cards: [
        {
          name: 'Default Card',
          description: 'Standard card container',
          usage: 'Content containers',
          variants: ['default', 'elevated', 'outlined'],
        },
      ],
      inputs: [
        {
          name: 'Text Input',
          description: 'Single-line text input',
          usage: 'Form inputs',
          variants: ['default', 'active', 'error', 'disabled'],
        },
      ],
      badges: [
        {
          name: 'Status Badge',
          description: 'Status indicator badge',
          usage: 'Status indication',
          variants: ['success', 'warning', 'error', 'info'],
        },
      ],
    };
  }

  getVisualSystem(id: string): VisualSystem | undefined {
    return this.visualSystems.get(id);
  }

  exportAsJSON(id: string): string {
    const system = this.visualSystems.get(id);
    if (!system) {
      throw new Error(`Visual system not found: ${id}`);
    }
    return JSON.stringify(system, null, 2);
  }

  exportAsCSS(id: string): string {
    const system = this.visualSystems.get(id);
    if (!system) {
      throw new Error(`Visual system not found: ${id}`);
    }

    const palette = system.colorPalette;
    let css = ':root {\n';
    css += `  --color-primary: ${palette.primary};\n`;
    css += `  --color-secondary: ${palette.secondary};\n`;
    css += `  --color-accent: ${palette.accent};\n`;
    css += `  --color-success: ${palette.semantics.success};\n`;
    css += `  --color-warning: ${palette.semantics.warning};\n`;
    css += `  --color-danger: ${palette.semantics.danger};\n`;
    css += `  --color-info: ${palette.semantics.info};\n`;
    css += '}\n';

    return css;
  }
}
