import { useEffect, useRef, useState } from "react";
import MacWindow from "./MacWindow";
import "./cli.scss";

const commands = {
  help: {
    description: "Show available commands.",
    execute: () => "Available commands: help, echo, date, clear",
  },

  echo: {
    description: "Print a message.",
    execute: (...args) => args.join(" "),
  },

  date: {
    description: "Show current date and time.",
    execute: () => new Date().toString(),
  },

  clear: {
    description: "Clear terminal.",
    execute: () => "__clear__",
  },
};

const Cli = ({
  windowsState,
  windowName,
  setWindowsState,
  activeWindow,
  setActiveWindow,
}) => {
  const [history, setHistory] = useState([
    {
      type: "output",
      text: "Welcome to your custom CLI. Type 'help' and press Enter.",
    },
  ]);

  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  // Keep terminal scrolled to the latest output
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop =
        terminalRef.current.scrollHeight;
    }
  }, [history]);

  // Focus terminal whenever user clicks inside it
  const focusTerminal = () => {
    inputRef.current?.focus();
  };

  const runCommand = (commandLine) => {
    const trimmedCommand = commandLine.trim();
    if (!trimmedCommand) {
      return;
    }

    const [commandName, ...args] =
      trimmedCommand.split(/\s+/);
    const command = commands[commandName.toLowerCase()];

    // Show entered command
    setHistory((previous) => [
      ...previous,
      {
        type: "input",
        text: trimmedCommand,
      },
    ]);

    // Command doesn't exist
    if (!command) {
      setHistory((previous) => [
        ...previous,
        {
          type: "output",
          text: `${commandName}: command not found`,
        },
      ]);
      return;
    }

    const result = command.execute(...args);

    // Clear terminal
    if (result === "__clear__") {
      setHistory([
        {
          type: "output",
          text: "Terminal cleared. Type 'help' for commands.",
        },
      ]);
      return;
    }

    // Add command output
    setHistory((previous) => [
      ...previous,
      {
        type: "output",
        text: result,
      },
    ]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    runCommand(input);
    setInput("");
  };

  return (
    <MacWindow
      windowName={windowName}
      windowsState={windowsState}
      setWindowsState={setWindowsState}
      activeWindow={activeWindow}
      setActiveWindow={setActiveWindow}
    >
      <div
        className="cli-window"
        onClick={focusTerminal}
      >
        <div
          className="terminal-body"
          ref={terminalRef}
        >
          {history.map((entry, index) => (
            <div
              key={`${entry.type}-${index}`}
              className={`terminal-line terminal-line-${entry.type}`}
            >

              {entry.type === "input" && (
                <span className="terminal-prompt">
                  user@mac:~$
                </span>
              )}

              {entry.type === "input" ? (
                <span className="terminal-command">
                  {" "}{entry.text}
                </span>
              ) : (
                entry.text
              )}

            </div>
          ))}

          <form
            className="terminal-input-line"
            onSubmit={handleSubmit}
          >
            <span className="terminal-prompt">
              user@mac:~$
            </span>
            <span className="terminal-typing">
              {" "}{input}
            </span>
            <span className="terminal-cursor" />
            <input
              ref={inputRef}
              value={input}
              onChange={(event) =>
                setInput(event.target.value)
              }
              className="terminal-hidden-input"
              autoFocus
              autoComplete="off"
              spellCheck="false"
              aria-label="Terminal input"
            />
          </form>
        </div>
      </div>
    </MacWindow>
  );
};

export default Cli;