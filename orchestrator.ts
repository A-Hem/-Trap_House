import { TaskManager } from './workers/task-manager';
import { KnowledgeGraphService } from './services/knowledge-graph';
import { ContextCompressor } from './services/context-compressor';
import { RooCodeIntegration } from './integrations/roocode';
import { ClaudeIntegration } from './integrations/claude';

class Orchestrator {
  private knowledgeGraph = new KnowledgeGraphService();
  private contextCompressor = new ContextCompressor();
  private rooCode = new RooCodeIntegration();
  private claude = new ClaudeIntegration();

  async processPrompt(userPrompt: string, aiAssistor: string = 'roocode'): Promise<string> {
    // Step 1: Decompose task
    const tasks = await TaskManager.decomposePrompt(userPrompt);

    // Step 2: Compress context using knowledge graph
    const compressedContext = this.contextCompressor.compress(
      this.knowledgeGraph.getRelevantContext(userPrompt)
    );

    // Step 3: Execute with selected AI assistor
    if (aiAssistor === 'claude') {
      return this.claude.execute(compressedContext);
    } else {
      return this.rooCode.execute(compressedContext);
    }
  }
}

export { Orchestrator };
