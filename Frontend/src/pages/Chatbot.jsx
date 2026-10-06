import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import api from "../services/axios";
import {
  Send,
  BookOpen,
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

export default function TutorMateAI() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const idRef = useRef(1);

  // Auto scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, typing]);

  const sendMessage = async (text) => {
    const trimmed = text.trim();

    if (!trimmed || typing) return;

    // History BEFORE current message
    const history = messages.map((msg) => ({
      role: msg.from === "user" ? "user" : "assistant",
      content: msg.text,
    }));

    // Add user message
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

    try {
      const res = await api.post("user/chat", {
        message: trimmed,
        history,
      });

      setMessages((prev) => [
        ...prev,
        {
          id: idRef.current++,
          from: "bot",
          text: res.data.reply,
        },
      ]);
    } catch (err) {
      console.error(err);

      setMessages((prev) => [
        ...prev,
        {
          id: idRef.current++,
          from: "bot",
          text: "Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <div className="h-[100dvh] overflow-hidden bg-slate-50">
      <div className="flex h-full flex-col">

        {/* =====================================================
            HEADER
        ====================================================== */}
        <header className="shrink-0 border-b border-slate-200 bg-white/95 backdrop-blur">
          <div className="mx-auto flex w-full max-w-5xl items-center px-4 py-3 sm:px-6 sm:py-4">

            <button
              onClick={() => navigate("/")}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 shadow-md transition hover:scale-105 sm:h-12 sm:w-12 sm:rounded-2xl"
            >
              <BookOpen className="h-5 w-5 text-amber-300 sm:h-6 sm:w-6" />
            </button>

            <div className="ml-3 min-w-0 sm:ml-4">
              <h1 className="truncate text-base font-bold text-slate-900 sm:text-xl">
                TutorMate AI Teacher
              </h1>

              <p className="truncate text-xs text-slate-500 sm:text-sm">
                Your personal learning assistant
              </p>
            </div>

          </div>
        </header>

        {/* =====================================================
            MAIN CHAT
        ====================================================== */}
        <main className="min-h-0 flex-1">

          {/* ===================================================
              EMPTY STATE
          ==================================================== */}
          {messages.length === 0 ? (
            <div className="flex h-full overflow-y-auto px-4 py-8 sm:px-6 sm:py-12">

              <div className="m-auto w-full max-w-4xl text-center">

                <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 shadow-xl sm:mb-7 sm:h-28 sm:w-28">
                  <BookOpen className="h-9 w-9 text-amber-300 sm:h-14 sm:w-14" />
                </div>

                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                  TutorMate AI
                </h1>

                <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:mt-5 sm:text-lg sm:leading-relaxed">
                  Get instant help with homework, assignments, concepts,
                  exam preparation, coding questions, and finding tutors.
                </p>

                {/* Suggestions */}
                <div className="mx-auto mt-8 grid w-full max-w-3xl grid-cols-1 gap-3 sm:mt-12 sm:grid-cols-2 sm:gap-4">

                  {suggestions.map((item) => {
                    const Icon = item.icon;

                    return (
                      <button
                        key={item.title}
                        onClick={() => sendMessage(item.title)}
                        className="group flex items-center rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-violet-200 hover:shadow-md active:scale-[0.98] sm:p-5"
                      >
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-100 sm:h-12 sm:w-12">
                          <Icon className="h-5 w-5 text-violet-600 sm:h-6 sm:w-6" />
                        </div>

                        <div className="ml-3 min-w-0 sm:ml-4">
                          <h3 className="truncate text-sm font-semibold text-slate-900 sm:text-base">
                            {item.title}
                          </h3>

                          <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                            Start a conversation
                          </p>
                        </div>
                      </button>
                    );
                  })}

                </div>
              </div>
            </div>
          ) : (

            /* ===================================================
                CHAT MESSAGES
            ==================================================== */
            <div
              ref={scrollRef}
              className="
                h-full
                min-w-0
                overflow-y-auto
                overscroll-contain
                px-3
                py-5
                sm:px-6
                sm:py-8
              "
            >

              <div
                className="
                  mx-auto
                  flex
                  min-w-0
                  w-full
                  max-w-4xl
                  flex-col
                  gap-4
                  sm:gap-6
                "
              >

                {messages.map((message) => {
                  const isUser = message.from === "user";

                  return (
                    <div
                      key={message.id}
                      className={`flex min-w-0 w-full ${
                        isUser ? "justify-end" : "justify-start"
                      }`}
                    >

                      {/* =================================================
                          USER MESSAGE
                      ================================================== */}
                      {isUser ? (
                        <div
                          className="
                            relative
                            min-w-0
                            max-w-[88%]
                            break-words
                            rounded-2xl
                            rounded-br-md
                            bg-violet-600
                            px-4
                            py-3
                            text-[15px]
                            leading-6
                            text-white
                            shadow-sm
                            sm:max-w-[75%]
                            sm:rounded-3xl
                            sm:px-5
                            sm:py-4
                          "
                        >
                          <p className="whitespace-pre-wrap break-words">
                            {message.text}
                          </p>
                        </div>
                      ) : (

                        /* =================================================
                            AI MESSAGE
                        ================================================== */
                        <div
                          className="
                            relative
                            min-w-0
                            w-full
                            max-w-full
                            overflow-hidden
                            rounded-2xl
                            rounded-bl-md
                            border
                            border-slate-200
                            bg-white
                            px-4
                            py-3
                            shadow-sm
                            sm:max-w-[85%]
                            sm:rounded-3xl
                            sm:px-5
                            sm:py-4
                          "
                        >

                          <div
                            className="
                              min-w-0
                              w-full
                              max-w-full
                              break-words
                              text-[15px]
                              leading-6
                              text-slate-800
                            "
                          >

                            <ReactMarkdown
                              remarkPlugins={[remarkGfm]}
                              rehypePlugins={[rehypeRaw]}
                              components={{

                                /* ===========================
                                   PARAGRAPH
                                ============================ */
                                p: ({ children }) => (
                                  <p className="my-2 break-words">
                                    {children}
                                  </p>
                                ),

                                /* ===========================
                                   HEADINGS
                                ============================ */
                                h1: ({ children }) => (
                                  <h1 className="mb-3 mt-5 break-words text-xl font-bold text-slate-900">
                                    {children}
                                  </h1>
                                ),

                                h2: ({ children }) => (
                                  <h2 className="mb-3 mt-5 break-words text-lg font-bold text-slate-900">
                                    {children}
                                  </h2>
                                ),

                                h3: ({ children }) => (
                                  <h3 className="mb-2 mt-4 break-words text-base font-bold text-slate-900">
                                    {children}
                                  </h3>
                                ),

                                /* ===========================
                                   LISTS
                                ============================ */
                                ul: ({ children }) => (
                                  <ul className="my-3 list-disc space-y-1 pl-5 break-words">
                                    {children}
                                  </ul>
                                ),

                                ol: ({ children }) => (
                                  <ol className="my-3 list-decimal space-y-1 pl-5 break-words">
                                    {children}
                                  </ol>
                                ),

                                li: ({ children }) => (
                                  <li className="break-words">
                                    {children}
                                  </li>
                                ),

                                /* ===========================
                                   TABLE
                                ============================ */
                                table: ({ children }) => (
                                  <div className="my-4 w-full max-w-full overflow-x-auto rounded-xl border border-slate-200">
                                    <table className="w-full min-w-[600px] border-collapse text-sm">
                                      {children}
                                    </table>
                                  </div>
                                ),

                                thead: ({ children }) => (
                                  <thead className="bg-slate-50">
                                    {children}
                                  </thead>
                                ),

                                tbody: ({ children }) => (
                                  <tbody>{children}</tbody>
                                ),

                                tr: ({ children }) => (
                                  <tr className="border-b border-slate-100 last:border-0">
                                    {children}
                                  </tr>
                                ),

                                th: ({ children }) => (
                                  <th className="whitespace-normal break-words border-b border-slate-200 px-3 py-2 text-left font-semibold text-slate-800">
                                    {children}
                                  </th>
                                ),

                                td: ({ children }) => (
                                  <td className="whitespace-normal break-words px-3 py-2 align-top text-slate-700">
                                    {children}
                                  </td>
                                ),

                                /* ===========================
                                   CODE BLOCK
                                ============================ */
                                pre: ({ children }) => (
                                  <pre
                                    className="
                                      my-4
                                      max-w-full
                                      overflow-x-auto
                                      rounded-xl
                                      bg-slate-900
                                      p-4
                                      text-sm
                                      leading-6
                                      text-slate-100
                                    "
                                  >
                                    {children}
                                  </pre>
                                ),

                                code: ({
                                  inline,
                                  children,
                                  ...props
                                }) => {
                                  if (inline) {
                                    return (
                                      <code
                                        {...props}
                                        className="
                                          break-words
                                          rounded
                                          bg-slate-100
                                          px-1.5
                                          py-0.5
                                          text-[13px]
                                          text-violet-700
                                        "
                                      >
                                        {children}
                                      </code>
                                    );
                                  }

                                  return (
                                    <code
                                      {...props}
                                      className="whitespace-pre"
                                    >
                                      {children}
                                    </code>
                                  );
                                },

                                /* ===========================
                                   LINKS
                                ============================ */
                                a: ({ children, href }) => (
                                  <a
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="break-all text-violet-600 hover:underline"
                                  >
                                    {children}
                                  </a>
                                ),

                                /* ===========================
                                   IMAGES
                                ============================ */
                                img: ({ src, alt }) => (
                                  <img
                                    src={src}
                                    alt={alt || ""}
                                    className="my-3 h-auto max-w-full rounded-xl"
                                  />
                                ),

                                /* ===========================
                                   BLOCKQUOTE
                                ============================ */
                                blockquote: ({ children }) => (
                                  <blockquote className="my-3 border-l-4 border-violet-300 bg-violet-50 px-4 py-2 text-slate-600">
                                    {children}
                                  </blockquote>
                                ),

                                /* ===========================
                                   HORIZONTAL RULE
                                ============================ */
                                hr: () => (
                                  <hr className="my-4 border-slate-200" />
                                ),
                              }}
                            >
                              {message.text}
                            </ReactMarkdown>

                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* =================================================
                    TYPING INDICATOR
                ================================================== */}
                {typing && (
                  <div className="flex justify-start">

                    <div
                      className="
                        rounded-2xl
                        rounded-bl-md
                        border
                        border-slate-200
                        bg-white
                        px-4
                        py-3
                        shadow-sm
                        sm:rounded-3xl
                        sm:px-5
                        sm:py-4
                      "
                    >
                      <div className="flex items-center gap-1.5">
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
        </main>

        {/* =====================================================
            INPUT
        ====================================================== */}
        <div
          className="
            shrink-0
            border-t
            border-slate-200
            bg-white/95
            px-3
            py-3
            backdrop-blur
            sm:px-5
            sm:py-4
          "
        >

          <div
            className="
              mx-auto
              flex
              w-full
              max-w-4xl
              items-center
              gap-2
              sm:gap-3
            "
          >

            <div
              className="
                flex
                min-w-0
                flex-1
                items-center
                rounded-2xl
                border
                border-slate-200
                bg-slate-50
                px-3
                transition
                focus-within:border-violet-300
                focus-within:bg-white
                focus-within:ring-4
                focus-within:ring-violet-100
                sm:px-4
              "
            >

              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={typing}
                placeholder="Ask anything..."
                className="
                  min-w-0
                  flex-1
                  bg-transparent
                  px-1
                  py-3
                  text-sm
                  text-slate-900
                  outline-none
                  placeholder:text-slate-400
                  disabled:cursor-not-allowed
                  sm:py-4
                  sm:text-base
                "
              />

            </div>

            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || typing}
              className="
                flex
                h-12
                w-12
                shrink-0
                items-center
                justify-center
                rounded-2xl
                text-white
                shadow-md
                transition-all
                duration-200
                hover:scale-105
                active:scale-95
                disabled:cursor-not-allowed
                disabled:opacity-50
                disabled:hover:scale-100
                sm:h-14
                sm:w-14
              "
              style={{
                backgroundColor: PURPLE,
              }}
              onMouseEnter={(e) => {
                if (!e.currentTarget.disabled) {
                  e.currentTarget.style.backgroundColor = PURPLE_DARK;
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = PURPLE;
              }}
            >
              <Send className="h-5 w-5" />
            </button>

          </div>

          <p className="mt-2 hidden text-center text-[11px] text-slate-400 sm:block">
            Press Enter to send
          </p>

        </div>
      </div>
    </div>
  );
}