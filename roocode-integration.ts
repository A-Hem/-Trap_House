// src/roocode-integration.ts
interface RooModeConfig {
  slug: string;
  name: string;
  roleDefinition: string;
  groups: Array<string | [string, FileRestriction]>;
  customInstructions?: string;
}

interface FileRestriction {
  fileRegex: string;
  description: string;
}

class RooCodeOrchestrator {
  private activeModes: Map<string, RooModeConfig> = new Map();

  async createOptimizedMode(taskRequirements: string): Promise<RooModeConfig> {
    // Use Ollama to generate mode configuration
    const ollamaResponse = await this.queryOllama(`
      Based on these task requirements: ${taskRequirements}
      Generate a Roo Code custom mode configuration with:
      1. Appropriate role definition
      2. File restrictions
      3. Token-optimized instructions
      Return JSON format only
    `);

    return JSON.parse(ollamaResponse);
  }

  async activateMode(modeConfig: RooModeConfig): Promise<void> {
    this.activeModes.set(modeConfig.slug, modeConfig);
    await this.updateRooConfiguration();
  }

  private async updateRooConfiguration(): Promise<void> {
    // Generate .roomodes file content
    const config = {
      customModes: Array.from(this.activeModes.values())
    };

    // Write to project's .roomodes file
    await Deno.writeTextFile('.roomodes', JSON.stringify(config, null, 2));
  }

  async executeWithMode(task: string, modeSlug: string): Promise<string> {
    const mode = this.activeModes.get(modeSlug);
    if (!mode) throw new Error(`Mode ${modeSlug} not found`);

    // Generate mode-optimized prompt
    const optimizedPrompt = await this.optimizePromptForMode(task, mode);
    
    // Execute through Roo Code CLI
    return this.runRooCommand(`roo execute --mode ${modeSlug} "${optimizedPrompt}"`);
  }

  private async optimizePromptForMode(prompt: string, mode: RooModeConfig): Promise<string> {
    // Use MCP context compression
    const compressedContext = await this.compressContext(prompt);
    
    return `
      ${mode.roleDefinition}
      
      Task: ${compressedContext}
      
      Constraints:
      - ${mode.groups.map(g => Array.isArray(g) ? g[1].description : g).join('\n- ')}
      ${mode.customInstructions ? '\n' + mode.customInstructions : ''}
    `;
  }
}