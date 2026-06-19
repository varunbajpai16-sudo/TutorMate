import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  BookOpen,
  MapPin,
  ShieldCheck,
  Calendar,
  Star,
  ArrowRight,
  CheckCircle2,
  Mail,
  Clock,
  GraduationCap,
  Camera,
  Edit2,
  Plus,
  X,
  Bell,
  Lock,
  LogOut,
  Brain,
} from "lucide-react";

const PURPLE = "#6C5DD3";
const PURPLE_DARK = "#5A4BC4";

const navLinks = [
  { label: "Home", link: "/" },
  { label: "Find Teachers", link: "/findteacher" },
  { label: "Subjects", link: "/subjects" },
  { label: "How it Works", link: "/howitwork" },
  { label: "Become a Teacher", link: "/teacher" },
];

const subjectList = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "Computer Science",
];

const stats = [
  {
    icon: Clock,
    bg: "bg-indigo-100",
    color: "text-indigo-600",
    label: "Hours Learned",
    value: "86",
  },
  {
    icon: BookOpen,
    bg: "bg-emerald-100",
    color: "text-emerald-600",
    label: "Subjects Enrolled",
    value: "4",
  },
  {
    icon: Calendar,
    bg: "bg-amber-100",
    color: "text-amber-500",
    label: "Sessions Completed",
    value: "32",
  },
  {
    icon: Star,
    bg: "bg-rose-100",
    color: "text-rose-500",
    label: "Avg. Rating Given",
    value: "4.8",
  },
];

const upcomingSessions = [
  {
    name: "Priya Sharma",
    subject: "Mathematics",
    date: "Mon, 22 Jun • 5:00 PM",
    rating: "4.9",
    ring: "ring-slate-200",
    img: "https://i.pravatar.cc/150?img=47",
  },
  {
    name: "Rahul Verma",
    subject: "Physics",
    date: "Wed, 24 Jun • 6:30 PM",
    rating: "4.8",
    ring: "ring-sky-200",
    img: "https://i.pravatar.cc/150?img=53",
  },
];

export default function ProfilePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const [isEditing, setIsEditing] = useState(false);
  const [showSavedPopup, setShowSavedPopup] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    location: "Meerut, Uttar Pradesh",
    grade: "",
    bio: "",
  });
  const [mySubjects, setMySubjects] = useState(["Mathematics", "Physics"]);
  const [subjectToAdd, setSubjectToAdd] = useState("");
  const [notifPrefs, setNotifPrefs] = useState({
    email: true,
    sms: false,
    reminders: true,
  });

  const handleFieldChange = (field) => (e) =>
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSave = () => {
    setIsEditing(false);
    setShowSavedPopup(true);
  };

  const addSubject = () => {
    if (subjectToAdd && !mySubjects.includes(subjectToAdd)) {
      setMySubjects((prev) => [...prev, subjectToAdd]);
    }
    setSubjectToAdd("");
  };

  const removeSubject = (subject) =>
    setMySubjects((prev) => prev.filter((s) => s !== subject));

  const toggleNotif = (key) =>
    setNotifPrefs((prev) => ({ ...prev, [key]: !prev[key] }));

  const inputClass = (editable) =>
    `w-full rounded-lg border px-4 py-2.5 text-sm font-medium outline-none transition-colors placeholder:text-slate-400 ${
      editable
        ? "border-slate-200 text-slate-700 hover:border-violet-300"
        : "border-slate-100 bg-slate-50 text-slate-500"
    }`;

  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      {showSavedPopup && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
            <div className="flex justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
                <CheckCircle2 className="h-10 w-10 text-emerald-600" />
              </div>
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">
              Changes Saved!
            </h2>
            <p className="mt-3 text-center text-slate-500">
              Your profile has been updated successfully.
            </p>
            <button
              onClick={() => setShowSavedPopup(false)}
              className="mt-8 w-full rounded-xl px-5 py-3 font-semibold text-white"
              style={{ backgroundColor: PURPLE }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = PURPLE_DARK)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = PURPLE)
              }
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="border-b border-slate-100 bg-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 shadow-lg">
              <BookOpen className="h-6 w-6 text-amber-300" />
            </div>
            <div>
              <div className="text-xl font-extrabold leading-tight text-slate-900">
                TutorMate
              </div>
              <div className="text-xs leading-tight text-slate-400">
                Find the right teacher for you
              </div>
            </div>
          </div>

          <nav className="hidden items-center gap-9 text-sm font-medium lg:flex">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.link;
              return (
                <button
                  key={link.label}
                  onClick={() => navigate(link.link)}
                  className={`pb-5 -mb-5 transition-colors hover:cursor-pointer  ${
                    isActive
                      ? "border-b-2 font-semibold text-violet-600"
                      : "text-slate-600 hover:text-black"
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-5">
            <a
              onClick={() => navigate("/login")}
              className="hidden items-center gap-1.5 text-sm font-medium text-slate-700 sm:flex hover:cursor-pointer hover:text-violet-600"
            >
              <ShieldCheck className="h-4 w-4" />
              Login
            </a>
            <button
              className="rounded-lg px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors"
              style={{ backgroundColor: PURPLE }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = PURPLE_DARK)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = PURPLE)
              }
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>

            <div
              onClick={() => navigate("/profile")}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-violet-600 bg-violet-600 text-sm font-bold text-white">
                {(user?.name || "S").charAt(0).toUpperCase()}
              </div>

              <div className="hidden md:block">
                <p className="text-sm font-semibold text-slate-800">
                  {user?.name || "Student"}
                </p>
                <p className="text-xs text-slate-500">Student</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Profile Hero */}
      <section style={{ backgroundColor: "#F4F2FC" }}>
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
          <div className="flex flex-col gap-6 rounded-2xl bg-white p-6 shadow-xl shadow-indigo-100/70 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-5">
              <div className="relative">
                <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-violet-600 text-3xl font-bold text-white shadow-md sm:h-28 sm:w-28 sm:text-4xl">
                  {(user?.name || "S").charAt(0).toUpperCase()}
                </div>
                <button
                  className="absolute -bottom-1 -right-1 flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-violet-600 shadow-sm hover:bg-violet-50"
                  aria-label="Change profile photo"
                >
                  <Camera className="h-4 w-4" />
                </button>
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
                    {user?.name || "Student"}
                  </h1>
                  <span
                    className="inline-flex items-center gap-1 rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold"
                    style={{ color: PURPLE }}
                  >
                    <GraduationCap className="h-3.5 w-3.5" />
                    Student
                  </span>
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <Mail className="h-4 w-4 text-slate-400" />
                    {user?.email || "your.email@example.com"}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-slate-400" />
                    {formData.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-slate-400" />
                    Joined March 2025
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center justify-center gap-2 whitespace-nowrap rounded-lg border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-indigo-50"
              style={{ borderColor: "#D9D2F5", color: PURPLE }}
            >
              <Edit2 className="h-4 w-4" />
              Edit Profile
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        <div className="grid gap-8 divide-y divide-slate-100 rounded-2xl border border-slate-100 bg-white px-6 py-8 shadow-sm sm:grid-cols-2 sm:divide-y-0 sm:divide-x lg:grid-cols-4">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className={`flex items-start gap-4 pt-8 sm:pt-0 ${i === 0 ? "" : "sm:pl-8"}`}
              >
                <div
                  className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${s.bg}`}
                >
                  <Icon className={`h-6 w-6 ${s.color}`} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900">
                    {s.value}
                  </div>
                  <div className="mt-0.5 text-sm leading-snug text-slate-500">
                    {s.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Main content */}
      <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[1.65fr_1fr]">
          {/* Left column */}
          <div>
            {/* Personal Information */}
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900">
                  Personal Information
                </h2>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-1 text-sm font-medium hover:cursor-pointer hover:underline"
                    style={{ color: PURPLE }}
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                    Edit
                  </button>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-500">
                    Full Name
                  </label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={formData.name}
                    onChange={handleFieldChange("name")}
                    className={inputClass(isEditing)}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-500">
                    Email Address
                  </label>
                  <input
                    type="email"
                    disabled={!isEditing}
                    value={formData.email}
                    onChange={handleFieldChange("email")}
                    className={inputClass(isEditing)}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-500">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    disabled={!isEditing}
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={handleFieldChange("phone")}
                    className={inputClass(isEditing)}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-500">
                    Location
                  </label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={formData.location}
                    onChange={handleFieldChange("location")}
                    className={inputClass(isEditing)}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-500">
                    Grade / Class
                  </label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    placeholder="e.g. Class 10"
                    value={formData.grade}
                    onChange={handleFieldChange("grade")}
                    className={inputClass(isEditing)}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-xs font-medium text-slate-500">
                    Bio
                  </label>
                  <textarea
                    rows={3}
                    disabled={!isEditing}
                    placeholder="Tell teachers a little about your learning goals..."
                    value={formData.bio}
                    onChange={handleFieldChange("bio")}
                    className={`resize-none ${inputClass(isEditing)}`}
                  />
                </div>
              </div>

              {isEditing && (
                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex-1 rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 sm:flex-none sm:px-8"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex-1 rounded-lg px-5 py-2.5 text-sm font-semibold text-white sm:flex-none sm:px-8"
                    style={{ backgroundColor: PURPLE }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = PURPLE_DARK)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = PURPLE)
                    }
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>

            {/* My Subjects */}
            <div className="mt-8 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <h2 className="mb-5 text-xl font-bold text-slate-900">
                My Subjects
              </h2>
              <div className="flex flex-wrap gap-2.5">
                {mySubjects.map((subject) => (
                  <span
                    key={subject}
                    className="flex items-center gap-2 rounded-full bg-violet-100 px-4 py-2 text-sm font-medium"
                    style={{ color: PURPLE }}
                  >
                    {subject}
                    <button
                      onClick={() => removeSubject(subject)}
                      aria-label={`Remove ${subject}`}
                    >
                      <X className="h-3.5 w-3.5 hover:text-rose-500" />
                    </button>
                  </span>
                ))}
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <div className="relative flex flex-1 items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 hover:border-violet-300 transition-colors">
                  <BookOpen className="h-4 w-4 flex-shrink-0 text-slate-400" />
                  <select
                    value={subjectToAdd}
                    onChange={(e) => setSubjectToAdd(e.target.value)}
                    className="w-full appearance-none bg-transparent text-sm font-medium text-slate-700 outline-none cursor-pointer"
                  >
                    <option value="">Add a subject</option>
                    {subjectList
                      .filter((s) => !mySubjects.includes(s))
                      .map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                  </select>
                </div>
                <button
                  onClick={addSubject}
                  className="flex items-center justify-center gap-2 whitespace-nowrap rounded-lg px-5 py-2.5 text-sm font-semibold text-white"
                  style={{ backgroundColor: PURPLE }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = PURPLE_DARK)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = PURPLE)
                  }
                >
                  <Plus className="h-4 w-4" />
                  Add
                </button>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div>
            {/* Upcoming Sessions */}
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900">
                  Upcoming Sessions
                </h2>
                <a
                  onClick={() => navigate("/findteacher")}
                  className="flex items-center gap-1 text-xs font-medium hover:cursor-pointer hover:underline"
                  style={{ color: PURPLE }}
                >
                  Find More <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
              <div className="space-y-4">
                {upcomingSessions.map((s) => (
                  <div
                    key={s.name}
                    className="rounded-xl border border-slate-100 p-4"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={s.img}
                        alt={s.name}
                        className={`h-12 w-12 flex-shrink-0 rounded-full object-cover ring-2 ${s.ring}`}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="truncate font-semibold text-slate-900">
                          {s.name}
                        </div>
                        <div className="truncate text-xs text-slate-500">
                          {s.subject}
                        </div>
                        <div className="mt-1 flex items-center gap-1 text-xs">
                          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                          <span className="font-semibold text-slate-700">
                            {s.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-1.5 text-xs font-medium text-slate-500">
                      <Clock className="h-3.5 w-3.5" />
                      {s.date}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Account Settings */}
            <div className="mt-8 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <h2 className="mb-5 text-lg font-bold text-slate-900">
                Account Settings
              </h2>

              <div className="space-y-4">
                {[
                  { key: "email", label: "Email Notifications" },
                  { key: "sms", label: "SMS Reminders" },
                  { key: "reminders", label: "Session Reminders" },
                ].map((pref) => (
                  <div key={pref.key} className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm text-slate-600">
                      <Bell className="h-4 w-4 text-slate-400" />
                      {pref.label}
                    </span>
                    <button
                      onClick={() => toggleNotif(pref.key)}
                      className="relative h-6 w-11 flex-shrink-0 rounded-full transition-colors"
                      style={{
                        backgroundColor: notifPrefs[pref.key]
                          ? PURPLE
                          : "#E2E8F0",
                      }}
                      aria-pressed={notifPrefs[pref.key]}
                    >
                      <span
                        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                          notifPrefs[pref.key]
                            ? "translate-x-5"
                            : "translate-x-0.5"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={() => navigate("/change-password")}
                className="mt-6 flex w-full items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                <Lock className="h-4 w-4" />
                Change Password
              </button>

              <button
                onClick={() => navigate("/login")}
                className="mt-3 flex w-full items-center gap-2 rounded-lg border border-rose-200 px-4 py-2.5 text-sm font-medium text-rose-500 hover:bg-rose-50"
              >
                <LogOut className="h-4 w-4" />
                Log Out
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* AI Tutor Assistant Button */}
      <button
        onClick={() => navigate("/chatbot")}
        className="fixed bottom-6 right-6 z-50 group"
      >
        <div className="relative">
          <span className="absolute inset-0 rounded-full bg-violet-500 animate-ping opacity-30"></span>

          <div className="absolute right-20 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-xl border border-violet-100 bg-white px-4 py-2 shadow-lg opacity-0 invisible translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:visible group-hover:translate-x-0">
            <p className="text-sm font-semibold text-slate-800">
              Talk to AI Teacher
            </p>
            <p className="text-xs text-slate-500">Ask doubts anytime</p>
          </div>

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 shadow-xl transition-all duration-300 hover:scale-110">
            <Brain className="h-8 w-8 text-amber-300" />
          </div>
        </div>
      </button>
    </div>
  );
}