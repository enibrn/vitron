import { test, expect, describe, beforeEach, afterEach } from "bun:test";
import { commands, findCommand, showHelp, showVersion, handleHello, showAsciiTitle, handleInit, createProjectFiles } from "./index";
import { existsSync, rmSync, mkdirSync } from "fs";
import { join } from "path";

describe("Vitron CLI", () => {

  describe("findCommand", () => {
    test("should find existing command", () => {
      const command = findCommand("help");
      expect(command).toBeDefined();
      expect(command?.name).toBe("help");
    });

    test("should return undefined for non-existing command", () => {
      const command = findCommand("nonexistent");
      expect(command).toBeUndefined();
    });
  });

  describe("commands array", () => {    test("should contain expected commands", () => {
      const commandNames = commands.map(cmd => cmd.name);
      expect(commandNames).toContain("help");
      expect(commandNames).toContain("version");
      expect(commandNames).toContain("hello");
      expect(commandNames).toContain("init");
    });

    test("should have correct number of commands", () => {
      expect(commands).toHaveLength(4);
    });
  });

  describe("command handlers", () => {
    test("showHelp should not throw", () => {
      expect(() => showHelp()).not.toThrow();
    });

    test("showVersion should not throw", () => {
      expect(() => showVersion()).not.toThrow();
    });

    test("handleHello should not throw", () => {
      expect(() => handleHello(["test"])).not.toThrow();
      expect(() => handleHello([])).not.toThrow();
    });
  });
  describe("command output", () => {
    test("showVersion should output version info", () => {
      // Simple test to ensure function executes without error
      // In a real scenario, you might want to capture stdout
      expect(() => showVersion()).not.toThrow();
    });
    
    test("handleHello should execute without error", () => {
      expect(() => handleHello(["World"])).not.toThrow();
      expect(() => handleHello([])).not.toThrow();
      expect(() => handleHello(["Alice"])).not.toThrow();
    });    test("showAsciiTitle should execute without error", () => {
      expect(() => showAsciiTitle()).not.toThrow();
    });
  });

  describe("init command", () => {
    const testProjectName = "test-vitron-project";
    const testProjectPath = join(process.cwd(), testProjectName);

    afterEach(() => {
      // Cleanup test project if it exists
      if (existsSync(testProjectPath)) {
        rmSync(testProjectPath, { recursive: true, force: true });
      }
    });

    test("should find init command", () => {
      const command = findCommand("init");
      expect(command).toBeDefined();
      expect(command?.name).toBe("init");
    });

    test("createProjectFiles should create all necessary files", () => {
      // Create test directory first
      mkdirSync(testProjectPath, { recursive: true });
      mkdirSync(join(testProjectPath, "src"), { recursive: true });
      mkdirSync(join(testProjectPath, "tests"), { recursive: true });
      mkdirSync(join(testProjectPath, "docs"), { recursive: true });
      mkdirSync(join(testProjectPath, "config"), { recursive: true });

      // Test createProjectFiles function
      expect(() => createProjectFiles(testProjectPath, testProjectName)).not.toThrow();

      // Verify files were created
      expect(existsSync(join(testProjectPath, "package.json"))).toBe(true);
      expect(existsSync(join(testProjectPath, "tsconfig.json"))).toBe(true);
      expect(existsSync(join(testProjectPath, "src", "index.ts"))).toBe(true);
      expect(existsSync(join(testProjectPath, "tests", "index.test.ts"))).toBe(true);
      expect(existsSync(join(testProjectPath, "README.md"))).toBe(true);
      expect(existsSync(join(testProjectPath, ".gitignore"))).toBe(true);
    });

    test("package.json should have correct structure", () => {
      // Create test directory and files
      mkdirSync(testProjectPath, { recursive: true });
      mkdirSync(join(testProjectPath, "src"), { recursive: true });
      mkdirSync(join(testProjectPath, "tests"), { recursive: true });
      mkdirSync(join(testProjectPath, "docs"), { recursive: true });
      mkdirSync(join(testProjectPath, "config"), { recursive: true });

      createProjectFiles(testProjectPath, testProjectName);

      // Read and parse package.json
      const packageJsonPath = join(testProjectPath, "package.json");
      const packageJsonContent = require(packageJsonPath);

      expect(packageJsonContent.name).toBe(testProjectName);
      expect(packageJsonContent.version).toBe("1.0.0");
      expect(packageJsonContent.main).toBe("src/index.ts");
      expect(packageJsonContent.scripts).toBeDefined();
      expect(packageJsonContent.scripts.dev).toBe("bun run src/index.ts");
      expect(packageJsonContent.scripts.test).toBe("bun test");
    });
  });
});
