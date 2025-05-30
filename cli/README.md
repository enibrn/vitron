# Vitron CLI

```text
██╗   ██╗██╗████████╗██████╗  ██████╗ ███╗   ██╗
██║   ██║██║╚══██╔══╝██╔══██╗██╔═══██╗████╗  ██║
██║   ██║██║   ██║   ██████╔╝██║   ██║██╔██╗ ██║
╚██╗ ██╔╝██║   ██║   ██╔══██╗██║   ██║██║╚██╗██║
 ╚████╔╝ ██║   ██║   ██║  ██║╚██████╔╝██║ ╚████║
  ╚═══╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝
                                                  
          A powerful command line interface       
```

A simple command line interface built with TypeScript and Bun, featuring a beautiful ASCII art title.

## Features

- Built with TypeScript for type safety
- Uses only Bun's built-in functionality (no external dependencies)
- Modular command structure
- Comprehensive test suite

## Usage

### Running the CLI

```bash
# Show help
bun run index.ts help

# Show version
bun run index.ts version

# Say hello
bun run index.ts hello
bun run index.ts hello Alice
```

### Available Commands

- `help` - Show help information
- `version` - Show version information  
- `hello [name]` - Say hello with an optional name

### Development

```bash
# Run the CLI
bun run start

# Run tests
bun test

# Run tests in watch mode
bun run test:watch
```

## Project Structure

```text
cli/
├── index.ts         # Main CLI entry point
├── index.test.ts    # Test suite
├── package.json     # Package configuration
├── tsconfig.json    # TypeScript configuration
└── README.md        # This file
```

## Adding New Commands

To add a new command:

1. Add the command definition to the `commands` array in `index.ts`
2. Create a handler function for the command
3. Add tests for the new command in `index.test.ts`

Example:

```typescript
// Add to commands array
{
  name: "greet",
  description: "Greet with a custom message",
  handler: handleGreet
}

// Add handler function
function handleGreet(args: string[]): void {
  const message = args.join(" ") || "Hello there!";
  console.log(message);
}
```
