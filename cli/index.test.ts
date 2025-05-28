import { test, expect, describe } from "bun:test";
import { commands, findCommand, showHelp, showVersion, handleHello, showAsciiTitle } from "./index";

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

  describe("commands array", () => {
    test("should contain expected commands", () => {
      const commandNames = commands.map(cmd => cmd.name);
      expect(commandNames).toContain("help");
      expect(commandNames).toContain("version");
      expect(commandNames).toContain("hello");
    });

    test("should have correct number of commands", () => {
      expect(commands).toHaveLength(3);
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
    });

    test("showAsciiTitle should execute without error", () => {
      expect(() => showAsciiTitle()).not.toThrow();
    });
  });
});
