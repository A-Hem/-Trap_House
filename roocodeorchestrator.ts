// Example usage in orchestrator.ts
const rooOrchestrator = new RooCodeOrchestrator();

// Create mode based on MCP server analysis
const serverAnalysis = await analyzeMCPServers();
const documentationMode = await rooOrchestrator.createOptimizedMode(`
  Create documentation writer mode with:
  - Markdown file restrictions
  - Focus on API documentation
  - Token budget: 1500 tokens
`);

await rooOrchestrator.activateMode(documentationMode);

// Execute task with optimized mode
const result = await rooOrchestrator.executeWithMode(
  "Generate API docs for user service endpoints",
  documentationMode.slug
);
