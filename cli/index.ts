#!/usr/bin/env bun

/**
 * Vitron CLI - A simple command line interface
 */

// ASCII Art title
function showAsciiTitle(): void {
  console.log(`
██╗   ██╗██╗████████╗██████╗  ██████╗ ███╗   ██╗
██║   ██║██║╚══██╔══╝██╔══██╗██╔═══██╗████╗  ██║
██║   ██║██║   ██║   ██████╔╝██║   ██║██╔██╗ ██║
╚██╗ ██╔╝██║   ██║   ██╔══██╗██║   ██║██║╚██╗██║
 ╚████╔╝ ██║   ██║   ██║  ██║╚██████╔╝██║ ╚████║
  ╚═══╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝
                                                  
          A powerful command line interface       
`);
}

// Command definitions
interface Command {
  name: string;
  description: string;
  handler: (args: string[]) => void;
}

// Available commands
const commands: Command[] = [
  {
    name: "help",
    description: "Show help information",
    handler: showHelp
  },
  {
    name: "version",
    description: "Show version information",
    handler: showVersion
  },
  {
    name: "hello",
    description: "Say hello with an optional name",
    handler: handleHello
  }
];

function showHelp(): void {
  showAsciiTitle();
  console.log("Usage: bun run index.ts <command> [options]\n");
  console.log("Available commands:");
  
  commands.forEach(cmd => {
    console.log(`  ${cmd.name.padEnd(12)} ${cmd.description}`);
  });
  
  console.log("\nExamples:");
  console.log("  bun run index.ts help");
  console.log("  bun run index.ts hello world");
  console.log("  bun run index.ts version");
}

function showVersion(): void {
  console.log("Vitron CLI v1.0.0");
}

function handleHello(args: string[]): void {
  const name = args[0] || "World";
  console.log(`Hello, ${name}!`);
}

function findCommand(commandName: string): Command | undefined {
  return commands.find(cmd => cmd.name === commandName);
}

function main(): void {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    showHelp();
    return;
  }
  
  const commandName = args[0];
  if (!commandName) {
    showHelp();
    return;
  }
  
  const commandArgs = args.slice(1);
  
  const command = findCommand(commandName);
  
  if (!command) {
    console.error(`Unknown command: ${commandName}`);
    console.error("Run 'bun run index.ts help' for available commands.");
    process.exit(1);
  }
  
  try {
    command.handler(commandArgs);
  } catch (error) {
    console.error(`Error executing command '${commandName}':`, error);
    process.exit(1);
  }
}

// Export functions for testing
export { commands, findCommand, showHelp, showVersion, handleHello, showAsciiTitle };

// Run main if this file is executed directly
if (import.meta.main) {
  main();
}