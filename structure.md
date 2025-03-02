-Trap_House/
mcp-orchestrator/
├── src/
│   ├── orchestrator.ts               # Core orchestrator logic
│   ├── workers/
│   │   ├── task-manager.ts           # Task decomposition and execution
│   │   └── ollama-worker.ts          # Ollama integration
│   ├── services/
│   │   ├── knowledge-graph.ts        # Knowledge graph service
│   │   └── context-compressor.ts     # Context compression service
│   ├── utils/
│   │   ├── token-optimizer.ts        # Token optimization utilities
│   │   └── summarizer.ts             # Code and context summarization
│   ├── integrations/
│   │   ├── roocode.ts                # Roo Code integration
│   │   └── claude.ts                 # Claude integration (modular)
│   └── server.ts                     # API server
├── config/
│   └── mcp-servers.yaml              # MCP server configurations
├── docker-compose.yml                # Docker setup
├── package.json                      # Dependencies
├── tsconfig.json                     # TypeScript config
└── README.md                         # Project documentation
