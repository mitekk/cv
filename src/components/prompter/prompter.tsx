import { useEffect, useState } from "react";
import type { Prompt } from "../../types";
import "./prompter.css";

interface PrompterProps {
  prompt: Prompt;
  onFinish?: () => void;
}

export const Prompter = ({ prompt, onFinish }: PrompterProps) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [completedLines, setCompletedLines] = useState<string[]>([]);

  useEffect(() => {
    if (!prompt.lines[currentLine]) return;

    let timeout: ReturnType<typeof setTimeout>;

    if (currentChar < prompt.lines[currentLine].text.length) {
      timeout = setTimeout(() => {
        setTypedText(prompt.lines[currentLine].text.slice(0, currentChar + 1));
        setCurrentChar((idx) => idx + 1);
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      timeout = setTimeout(() => {
        setCompletedLines((lines) => [
          ...lines,
          prompt.lines[currentLine].text,
        ]);
        setTypedText("");
        setCurrentLine((idx) => idx + 1);

        if (currentLine === prompt.lines.length - 1) {
          if (onFinish) onFinish();
        }

        if (currentLine < prompt.lines.length - 1) {
          setCurrentChar(0);
        }
      }, 500);
    }
    return () => clearTimeout(timeout);
  }, [currentChar, currentLine, prompt.lines, onFinish]);

  return (
    <div className="prompter">
      <div className="h-full">
        <div>
          {completedLines.map((line, idx) => (
            <div key={idx} className="prompt-line prompt-text">
              {line}
              {idx === prompt.lines.length - 1 && (
                <div className="prompt-cursor">|</div>
              )}
            </div>
          ))}
          {!!typedText && (
            <div className="prompt-line">
              <div className="prompt-text">
                {typedText}
                {currentLine < prompt.lines.length && (
                  <div className="prompt-cursor">|</div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
