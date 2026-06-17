import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Send,
  BookOpen,
  Sparkles,
  Calculator,
  Atom,
  FlaskConical,
  Monitor,
} from "lucide-react";

const PURPLE = "#6C5DD3";
const PURPLE_DARK = "#5A4BC4";

const suggestions = [
  {
    title: "Solve a Maths Problem",
    icon: Calculator,
  },
  {
    title: "Explain Physics",
    icon: Atom,
  },
  {
    title: "Learn Chemistry",
    icon: FlaskConical,
  },
  {
    title: "Programming Help",
    icon: Monitor,
  },
];

function getBotReply(input) {
  const t = input.toLowerCase();

  if (t.includes("math")) {
    return "Let's solve it together. Send me the complete maths question.";
  }

  if (t.includes("physics")) {
    return "I'd be happy to explain any physics concept. What topic are you studying?";
  }

  if (t.includes("chemistry")) {
    return "Tell me the chemistry topic or equation you're struggling with.";
  }

  if (
    t.includes("computer") ||
    t.includes("coding") ||
    t.includes("programming")
  ) {
    return "I can help with coding, debugging, DSA, React, Node.js, and more.";
  }

  return "I understand. Could you provide a little more detail so I can help you better?";
}

export default function TutorMateAI() {
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const scrollRef = useRef(null);
  const idRef = useRef(1);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing]);

  const sendMessage = (text) => {
    const trimmed = text.trim();

    if (!trimmed || typing) return;

    setMessages((prev) => [
      ...prev,
      {
        id: idRef.current++,
        from: "user",
        text: trimmed,
      },
    ]);

    setInput("");
    setTyping(true);

    setTimeout(() => {
      setTyping(false);

      setMessages((prev) => [
        ...prev,
        {
          id: idRef.current++,
          from: "bot",
          text: getBotReply(trimmed),
        },
      ]);
    }, 1000);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <div className="flex h-screen flex-col">
        {/* Header */}
        <header className="border-b border-slate-200 bg-white/90 backdrop-blur flex justify-center">
          <div className="flex items-center gap-4 px-6 py-5">
            <div onClick={()=>navigate("/")}  
            className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 shadow-lg">
              <BookOpen className="h-7 w-7 text-amber-300" />
            </div>

            <div>
              <h1 className="text-xl font-bold text-slate-900">
                TutorMate AI Teacher
              </h1>

              <p className="text-sm text-slate-500">
                Your personal learning assistant
              </p>
            </div>
          </div>
        </header>

        {/* Main Chat Area */}
        <div className="flex-1 overflow-hidden">
          {messages.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center px-6 text-center">
              <div className="mb-8 flex h-28 w-28 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 shadow-xl">
                <BookOpen className="h-14 w-14 text-amber-300" />
              </div>

              <h1 className="text-5xl font-extrabold tracking-tight text-slate-900">
                TutorMate AI
              </h1>

              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-500">
                Get instant help with homework, assignments, concepts,
                exam preparation, coding questions, and finding tutors.
              </p>

              <div className="mt-12 grid w-full max-w-4xl gap-4 sm:grid-cols-2">
                {suggestions.map((item) => {
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.title}
                      onClick={() => sendMessage(item.title)}
                      className="group rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition-all hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100">
                          <Icon className="h-6 w-6 text-violet-600" />
                        </div>

                        <div>
                          <h3 className="font-semibold text-slate-900">
                            {item.title}
                          </h3>

                          <p className="mt-1 text-sm text-slate-500">
                            Start a conversation
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div
              ref={scrollRef}
              className="h-full overflow-y-auto px-6 py-8"
            >
              <div className="mx-auto max-w-4xl space-y-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.from === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={
                        message.from === "user"
                          ? "max-w-[75%] rounded-3xl rounded-br-lg px-5 py-4 text-white shadow-lg"
                          : "max-w-[75%] rounded-3xl rounded-bl-lg border border-slate-100 bg-white px-5 py-4 text-slate-700 shadow-sm"
                      }
                      style={
                        message.from === "user"
                          ? { backgroundColor: PURPLE }
                          : {}
                      }
                    >
                      {message.text}
                    </div>
                  </div>
                ))}

                {typing && (
                  <div className="flex justify-start">
                    <div className="rounded-3xl rounded-bl-lg border border-slate-100 bg-white px-5 py-4 shadow-sm">
                      <div className="flex gap-1">
                        <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400" />
                        <span
                          className="h-2 w-2 animate-bounce rounded-full bg-slate-400"
                          style={{ animationDelay: "150ms" }}
                        />
                        <span
                          className="h-2 w-2 animate-bounce rounded-full bg-slate-400"
                          style={{ animationDelay: "300ms" }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="border-t border-slate-200 bg-white p-5">
          <div className="mx-auto flex max-w-4xl gap-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything..."
              className="flex-1 rounded-2xl border border-slate-200 px-5 py-4 outline-none transition focus:border-violet-300 focus:ring-4 focus:ring-violet-100"
            />

            <button
              onClick={() => sendMessage(input)}
              className="flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg transition-all hover:scale-105"
              style={{ backgroundColor: PURPLE }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = PURPLE_DARK)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = PURPLE)
              }
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
