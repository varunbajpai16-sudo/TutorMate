import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import HomePageLoader from "../components/Loader";
import {
  BookOpen,
  MapPin,
  ShieldCheck,
  Star,
  ArrowLeft,
  GraduationCap,
  Briefcase,
  Wifi,
  Home as HomeIcon,
  Mail,
  Phone,
  MessageCircle,
  Brain,
  CalendarCheck,
  Users,
  BadgeCheck,
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

const SAMPLE_REVIEWS = [
  {
    name: "Ananya Gupta",
    rating: 5,
    text: "Explains concepts very clearly and is always patient with doubts. My son's grades improved a lot in two months.",
  },
  {
    name: "Karan Singh",
    rating: 5,
    text: "Very structured classes and punctual. Highly recommend for board exam preparation.",
  },
  {
    name: "Meera Joshi",
    rating: 4,
    text: "Good teaching style, sessions are interactive. Would have liked a few more practice sheets.",
  },
];

function renderStars(rating = 0) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(
        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />,
      );
    } else if (rating >= i - 0.5) {
      stars.push(
        <Star
          key={i}
          className="h-4 w-4 fill-amber-400 text-amber-400 opacity-50"
        />,
      );
    } else {
      stars.push(<Star key={i} className="h-4 w-4 text-slate-200" />);
    }
  }
  return stars;
}

// Accepts either shape that can land here:
//  A) the raw backend record  -> has `userid`, `hourelyfee`, `totalReviews`, `isVerifiedTeacher`...
//  B) the flattened "card" shape built by FindTeachersPage's normalizeTeacher()
//     -> has `name`, `price`, `reviews`, `img`, `verified`, `experienceYears`...
function normalizeProfileData(data) {
  if (!data) return null;

  const isRawShape = Boolean(data.userid) || data._id !== undefined;

  if (isRawShape) {
    return {
      tutor: data.userid || {},
      subjects: data.subjects || [],
      classes: data.classes || [],
      hourelyfee: data.hourelyfee,
      teacherLocation: data.location,
      bio: data.bio,
      rating: data.rating || 0,
      totalReviews: data.totalReviews || 0,
      mode: data.mode || [],
      isVerifiedTeacher: Boolean(data.isVerifiedTeacher),
      education: data.education || [],
      experienceDetails: data.experienceDetails || [],
    };
  }

  // Card shape from FindTeachersPage
  return {
    tutor: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      profileImage: data.img,
    },
    subjects: data.subjects || [],
    classes: data.classes || [],
    hourelyfee: data.price,
    teacherLocation: data.location,
    bio: data.bio,
    rating: data.rating || 0,
    totalReviews: data.reviews || 0,
    // card shape capitalizes mode ("Online"/"Offline"); normalize back to lowercase
    mode: (data.mode || []).map((m) => String(m).toLowerCase()),
    isVerifiedTeacher: Boolean(data.verified),
    education: data.education || [],
    experienceDetails:
      data.experienceDetails ||
      (data.experienceYears
        ? [{ institution: "Experience", years: data.experienceYears }]
        : []),
  };
}

export default function TeacherProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);
  const rawTeachers = useSelector((state) => state.teachers.teachers);

  // Prefer whatever was passed via navigation state (from FindTeachersPage).
  // Fall back to a redux lookup by :id for direct links / refreshes.
  const incomingData = useMemo(() => {
    if (location.state) return location.state;
    if (id && rawTeachers?.length) {
      return rawTeachers.find((t) => t._id === id) || null;
    }
    return null;
  }, [location.state, id, rawTeachers]);

  const profile = useMemo(
    () => normalizeProfileData(incomingData),
    [incomingData],
  );

  const [loading, setLoading] = useState(Boolean(id) && !location.state);

  useEffect(() => {
    // Nothing async to wait on right now (data comes from nav state or the
    // already-loaded redux store). This effect is a hook point for wiring
    // up a real GET ${BASE_URL}/teacher/:id call later if needed.
    setLoading(false);
  }, [profile]);

  if (loading) return <HomePageLoader />;

  if (!profile) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white px-6 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-100">
          <Users className="h-8 w-8 text-rose-500" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900">Teacher not found</h1>
        <p className="max-w-sm text-slate-500">
          This teacher profile doesn't exist or may have been removed.
        </p>
        <button
          onClick={() => navigate("/findteacher")}
          className="rounded-xl px-6 py-3 text-sm font-semibold text-white"
          style={{ backgroundColor: PURPLE }}
        >
          Browse Teachers
        </button>
      </div>
    );
  }

  const {
    tutor,
    subjects,
    classes,
    hourelyfee,
    teacherLocation,
    bio,
    rating,
    totalReviews,
    mode,
    isVerifiedTeacher,
    education,
    experienceDetails,
  } = profile;

  const totalExperience = experienceDetails.reduce(
    (sum, e) => sum + (Number(e.years) || 0),
    0,
  );

  return (
    <div className="min-h-screen bg-white font-sans antialiased">
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

          {user ? (
            <div
              onClick={() => navigate("/profile")}
              className="flex items-center gap-3 cursor-pointer"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 text-sm font-bold text-white shadow-md">
                {user.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-5 cursor-pointer">
                <a
                  onClick={() => navigate("/login")}
                  className="hidden items-center gap-1.5 text-sm font-medium text-slate-700 sm:flex hover:text-violet-600"
                >
                  <ShieldCheck className="h-4 w-4" />
                  Login
                </a>

                <button
                  onClick={() => navigate("/signup")}
                  className="rounded-lg px-5 py-2.5 text-sm font-semibold text-white"
                  style={{ backgroundColor: PURPLE }}
                >
                  Sign Up
                </button>
              </div>
            </>
          )}
        </div>
      </header>

      {/* Back link */}
      <div className="mx-auto max-w-7xl px-6 pt-6 lg:px-10">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-violet-600"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
      </div>

      {/* Profile hero */}
      <section className="mx-auto max-w-7xl px-6 pt-4 lg:px-10">
        <div className="overflow-hidden rounded-3xl border border-slate-100 shadow-sm">
          <div className="h-28 w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-700" />
          <div className="relative bg-white px-6 pb-8 sm:px-10">
            <div className="-mt-14 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                <img
                  src={tutor.profileImage || "https://i.pravatar.cc/300"}
                  alt={tutor.name || "Teacher"}
                  className="h-28 w-28 flex-shrink-0 rounded-2xl border-4 border-white object-cover shadow-md"
                />
                <div className="pb-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-2xl font-extrabold text-slate-900">
                      {tutor.name || "Tutor"}
                    </h1>
                    {isVerifiedTeacher && (
                      <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">
                        <ShieldCheck className="h-3.5 w-3.5" /> Verified
                      </span>
                    )}
                  </div>
                  <div className="mt-1.5 flex flex-wrap items-center gap-4 text-sm text-slate-500">
                    {teacherLocation && (
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {teacherLocation}
                      </span>
                    )}
                    {totalExperience > 0 && (
                      <span className="flex items-center gap-1">
                        <Briefcase className="h-4 w-4" />
                        {totalExperience}+ yrs experience
                      </span>
                    )}
                  </div>
                  <div className="mt-2 flex items-center gap-1.5">
                    {renderStars(rating)}
                    <span className="text-sm font-semibold text-slate-700">
                      {Number(rating).toFixed(1)}
                    </span>
                    <span className="text-sm text-slate-400">
                      ({totalReviews} Reviews)
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                  <MessageCircle className="h-4 w-4" /> Message
                </button>
                <button
                  className="flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white"
                  style={{ backgroundColor: PURPLE }}
                >
                  <CalendarCheck className="h-4 w-4" /> Book a Session
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="mx-auto max-w-7xl gap-8 px-6 py-10 lg:grid lg:grid-cols-[1.7fr_1fr] lg:px-10">
        <div className="space-y-8">
          {/* About */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">About</h2>
            <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-slate-600">
              {bio}
            </p>
          </div>

          {/* Subjects, classes, mode */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">
              Subjects &amp; Classes
            </h2>

            <div className="mt-4">
              <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                Subjects
              </div>
              <div className="flex flex-wrap gap-2">
                {subjects.map((s) => (
                  <span
                    key={s}
                    className="rounded-full px-3 py-1.5 text-sm font-medium"
                    style={{ backgroundColor: "#EEEAFC", color: PURPLE_DARK }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {classes.length > 0 && (
              <div className="mt-5">
                <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Classes
                </div>
                <div className="flex flex-wrap gap-2">
                  {classes.map((c) => (
                    <span
                      key={c}
                      className="rounded-full border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {mode.length > 0 && (
              <div className="mt-5">
                <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Teaching Mode
                </div>
                <div className="flex flex-wrap gap-2">
                  {mode.map((m) => (
                    <span
                      key={m}
                      className="flex items-center gap-1.5 rounded-full bg-sky-50 px-3 py-1.5 text-sm font-medium text-sky-600"
                    >
                      {m === "online" ? (
                        <Wifi className="h-3.5 w-3.5" />
                      ) : (
                        <HomeIcon className="h-3.5 w-3.5" />
                      )}
                      {m === "online" ? "Online" : "Home Tuition"}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Education */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">Education</h2>
            <div className="mt-4 space-y-5">
              {education.length === 0 && (
                <p className="text-sm text-slate-400">
                  No education details added yet.
                </p>
              )}
              {education.map((ed, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100">
                    <GraduationCap className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">
                      {ed.degree}
                    </div>
                    <div className="text-sm text-slate-500">
                      {ed.institute}
                      {ed.year ? ` • ${ed.year}` : ""}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">Experience</h2>
            <div className="mt-4 space-y-5">
              {experienceDetails.length === 0 && (
                <p className="text-sm text-slate-400">
                  No experience details added yet.
                </p>
              )}
              {experienceDetails.map((exp, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-amber-100">
                    <Briefcase className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">
                      {exp.institution}
                    </div>
                    <div className="text-sm text-slate-500">
                      {exp.years} {exp.years === 1 ? "year" : "years"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">
                Student Reviews
              </h2>
              <div className="flex items-center gap-1.5 text-sm">
                {renderStars(rating)}
                <span className="font-semibold text-slate-700">
                  {Number(rating).toFixed(1)}
                </span>
                <span className="text-slate-400">({totalReviews})</span>
              </div>
            </div>

            {totalReviews > 0 ? (
              <div className="mt-5 space-y-5 divide-y divide-slate-100">
                {SAMPLE_REVIEWS.map((r) => (
                  <div key={r.name} className="pt-5 first:pt-0 first:border-0">
                    <div className="flex items-center justify-between">
                      <div className="font-semibold text-slate-900">
                        {r.name}
                      </div>
                      <div className="flex">{renderStars(r.rating)}</div>
                    </div>
                    <p className="mt-1.5 text-sm text-slate-500">{r.text}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-sm text-slate-400">
                No reviews yet. Be the first to book a session and share your
                feedback.
              </p>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="mt-8 lg:mt-0">
          <div className="space-y-6 lg:sticky lg:top-6">
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-slate-900">
                  ₹{hourelyfee}
                </span>
                <span className="text-sm text-slate-400">/ hour</span>
              </div>

              <button
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white"
                style={{ backgroundColor: PURPLE }}
              >
                <CalendarCheck className="h-4 w-4" /> Book a Session
              </button>
              <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                <MessageCircle className="h-4 w-4" /> Message Teacher
              </button>

              <div className="mt-6 space-y-3 border-t border-slate-100 pt-5 text-sm">
                {teacherLocation && (
                  <div className="flex items-center gap-2 text-slate-600">
                    <MapPin className="h-4 w-4 text-slate-400" />
                    {teacherLocation}
                  </div>
                )}
                {tutor.email && (
                  <div className="flex items-center gap-2 text-slate-600">
                    <Mail className="h-4 w-4 text-slate-400" />
                    {tutor.email}
                  </div>
                )}
                {tutor.phone && (
                  <div className="flex items-center gap-2 text-slate-600">
                    <Phone className="h-4 w-4 text-slate-400" />
                    {tutor.phone}
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                <Users className="h-4 w-4 text-violet-600" />
                Why students choose{" "}
                {tutor.name?.split(" ")[0] || "this teacher"}
              </div>
              <ul className="mt-4 space-y-3 text-sm text-slate-500">
                <li className="flex gap-2">
                  <BadgeCheck className="h-4 w-4 flex-shrink-0 text-emerald-500" />
                  {isVerifiedTeacher
                    ? "Identity & qualifications verified"
                    : "Profile under review"}
                </li>
                <li className="flex gap-2">
                  <BadgeCheck className="h-4 w-4 flex-shrink-0 text-emerald-500" />
                  {totalExperience > 0
                    ? `${totalExperience}+ years of teaching experience`
                    : "Building teaching experience"}
                </li>
                <li className="flex gap-2">
                  <BadgeCheck className="h-4 w-4 flex-shrink-0 text-emerald-500" />
                  Responds quickly to messages
                </li>
              </ul>
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
