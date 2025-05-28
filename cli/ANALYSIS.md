# Vitron CLI - Project Analysis

## Objective

Create a CLI with Bun that replicates essential Dendron functions for hierarchical note management, without external dependencies and without requiring VSCode.

## Features

### Main Command: `note`

Unified command to navigate and manage notes with progressive autocomplete:

- If file exists → opens it in VSCode
- If file doesn't exist → creates and opens it
- Smart tab completion: works both after `.` and within words (like `cd`)

#### Usage Example

```bash
$ vitron note daily.<TAB>
daily.2025.

$ vitron note daily.2025.<TAB>
daily.2025.01.  daily.2025.02.  daily.2025.05.

$ vitron note proj<TAB>
projects.

$ vitron note daily.2025.05.26<ENTER>
# If exists: opens the file
# If doesn't exist: creates and opens the file
```

### Command `init`

Initializes a new Vitron workspace with the structure:

```text
workspace/
├── .vitron/
│   └── config.json
└── notes/
    ├── assets/
    │   └── images/
    └── index.md
```

The `index.md` file serves as the main entry point and workspace overview.

#### Configuration Example

```json
{
  "workspace": "./notes",
  "editor": "code",
  "dateFormat": "YYYY.MM.DD",
  "assetsPath": "./assets/images"
}
```

## Technical Aspects

### Main Components

1. **CLI Parser** - Command and argument handling
2. **Tab Completion Engine** - Smart autocomplete logic
3. **Note Manager** - File and workspace operations
4. **Hierarchy Scanner** - Hierarchical structure analysis

### Technologies

- **Runtime**: Bun (zero dependencies)
- **Language**: TypeScript
- **File Format**: Markdown with YAML frontmatter
- **Config**: JSON

### Tab Completion Implementation

- Use native readline/terminal APIs
- Incremental parsing of hierarchical paths
- Autocomplete works both after separators (`.`) and within words
- Structure caching for performance
- Pattern matching support

### Performance Considerations

- Lazy loading of hierarchy
- Smart caching
- Async/parallel operations where possible
- Optimization for large workspaces

## Development Approach

### Test-Driven Development (TDD)

This project follows a strict TDD approach to ensure reliability and maintainability:

#### Testing Strategy

- **Unit Tests**: Each component (CLI Parser, Note Manager, Hierarchy Scanner) has comprehensive unit tests
- **Integration Tests**: End-to-end testing of command flows and file operations
- **Tab Completion Tests**: Automated testing of autocomplete scenarios with mock file systems
- **Performance Tests**: Benchmarking for large workspace scenarios

#### Development Workflow

1. **Red**: Write failing tests that define the expected behavior
2. **Green**: Implement minimal code to make tests pass
3. **Refactor**: Improve code quality while keeping tests green
4. **Repeat**: Iterate for each feature increment

#### Test Structure

```text
tests/
├── unit/
│   ├── cli-parser.test.ts
│   ├── note-manager.test.ts
│   ├── hierarchy-scanner.test.ts
│   └── tab-completion.test.ts
├── integration/
│   ├── command-flows.test.ts
│   └── file-operations.test.ts
└── performance/
    └── large-workspace.test.ts
```

#### Key Testing Principles

- **Fast Feedback**: Tests run quickly with minimal setup
- **Isolated**: Each test is independent and can run in isolation
- **Deterministic**: Tests produce consistent results across environments
- **Comprehensive**: High code coverage with focus on edge cases
- **Mock File System**: Use in-memory file system for reliable, fast testing

## Future TODOs

### Programmed Commands (Template-based)

- `daily` - Create/open daily note (daily.YYYY.MM.DD)
- `scratch` - Create temporary note with timestamp
- Complete template system for custom commands

### Command `cleanup` - Cleaning and Standardization

Customizable command to automate note maintenance:

- **Wikilinks**: conversion from `[[link]]` to standard Markdown `[text](link)`
- **Images**: rename to lowercase (names + extensions) for VitePress compatibility
- **Dead links**: automatic removal of non-working links
- **Orphaned images**: removal of unreferenced images
- **Assets movement**: move images from notes folder to `assetsPath` and update links
- **Auto-update**: synchronize link text with actual content
- Dedicated configuration in `config.json` for confirmations and warnings

### Command `refactor` - Hierarchy Reorganization

- Refactoring of existing note hierarchies
- Automatic update of all affected links/wikilinks
- Preview of changes with configurable warnings
- Print of notes that will be modified

### Command `organize` - Powered by AI

Advanced AI-based features:

- **Auto-cataloging**: analyze scratch notes and suggest semantic renaming
- **Image descriptions**: replace `![img]` placeholders with automatic content descriptions
- **Smart classification**: suggest hierarchical placement based on content
- Configurable parameters for automation level
