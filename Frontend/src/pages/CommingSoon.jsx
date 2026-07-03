import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Construction,
  CalendarCheck,
  MessageCircle,
  ArrowLeft,
  Sparkles,
  BookOpen,
} from "lucide-react";

const PURPLE = "#6C5DD3";

export default function ComingSoon() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-violet-50 to-indigo-100 flex items-center justify-center px-6">
      <div className="max-w-3xl w-full rounded-3xl bg-white shadow-2xl border border-slate-200 overflow-hidden">

        {/* Header */}
        <div
          className="h-3"
          style={{ background: "linear-gradient(90deg,#4F46E5,#6C5DD3,#2563EB)" }}
        />

        <div className="p-10 text-center">

          {/* Icon */}
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-violet-100 animate-bounce">
            <Construction
              className="h-12 w-12"
              style={{ color: PURPLE }}
            />
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-5 py-2 text-sm font-semibold text-violet-700 animate-pulse">
            <Sparkles className="h-4 w-4" />
            Feature Coming Soon
          </div>

          {/* Title */}
          <h1 className="mt-6 text-4xl font-extrabold text-slate-900">
            We're Building Something Awesome 🚀
          </h1>

          {/* Subtitle */}
          <p className="mt-5 text-lg leading-8 text-slate-600">
            The{" "}
            <span className="font-semibold text-violet-600">
              Book Session
            </span>{" "}
            and{" "}
            <span className="font-semibold text-violet-600">
              Message Teacher
            </span>{" "}
            features are currently under development.
          </p>

          <p className="mt-3 text-slate-500">
            We're working hard to make scheduling sessions and chatting with
            teachers fast, secure, and seamless.
          </p>

          {/* Features */}
          <div className="mt-10 grid gap-5 sm:grid-cols-2">

            <div className="rounded-2xl border border-slate-200 p-5 text-left hover:shadow-md transition">
              <CalendarCheck
                className="h-8 w-8 mb-3"
                style={{ color: PURPLE }}
              />
              <h3 className="font-bold text-slate-900">
                Book Sessions
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Schedule classes with your preferred teachers in just a few
                clicks.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-5 text-left hover:shadow-md transition">
              <MessageCircle
                className="h-8 w-8 mb-3"
                style={{ color: PURPLE }}
              />
              <h3 className="font-bold text-slate-900">
                Chat with Teachers
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Discuss learning goals, ask questions, and stay connected.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-5 text-left hover:shadow-md transition">
              <BookOpen
                className="h-8 w-8 mb-3"
                style={{ color: PURPLE }}
              />
              <h3 className="font-bold text-slate-900">
                Learning Dashboard
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Track upcoming classes, learning progress, and completed
                sessions.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-5 text-left hover:shadow-md transition">
              <Sparkles
                className="h-8 w-8 mb-3"
                style={{ color: PURPLE }}
              />
              <h3 className="font-bold text-slate-900">
                Smart Notifications
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Receive reminders and booking updates instantly.
              </p>
            </div>

          </div>

          {/* Buttons */}
          <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:justify-center">

            <button
              onClick={() => navigate(-1)}
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 hover:bg-slate-100 transition"
            >
              <ArrowLeft className="h-5 w-5" />
              Go Back
            </button>

            <button
              onClick={() => navigate("/findteacher")}
              className="rounded-xl px-8 py-3 font-semibold text-white transition hover:opacity-90"
              style={{ backgroundColor: PURPLE }}
            >
              Browse Teachers
            </button>

          </div>

          <p className="mt-8 text-sm text-slate-400">
            Thank you for your patience ❤️
            <br />
            This feature will be available in a future update.
          </p>

        </div>
      </div>
    </div>
  );
}