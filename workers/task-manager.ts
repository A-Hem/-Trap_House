import { TaskDecomposer } from './task-decomposition'; // Replace w existing code

class TaskManager {
  static async decomposePrompt(prompt: string): Promise<string[]> {
    const decomposer = new TaskDecomposer();
    return decomposer.parseDecomposition(prompt);
  }

  static async processTask(task: string): Promise<string> {
    // Reuse your existing task processing logic
    return `Processed: ${task}`;
  }
}

export { TaskManager };
