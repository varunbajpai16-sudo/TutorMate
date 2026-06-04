import { useState } from "react";

const OWL_IMG = "data:image/jpeg;base64,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";

const subjects = [
  { name: "All Subjects", icon: "⊞", iconBg: "bg-indigo-500", iconColor: "text-white" },
  { name: "Maths", icon: "📐", iconBg: "bg-green-100", iconColor: "text-green-600" },
  { name: "Science", icon: "🔬", iconBg: "bg-blue-100", iconColor: "text-blue-600" },
  { name: "English", icon: "Aa", iconBg: "bg-yellow-100", iconColor: "text-yellow-600" },
  { name: "Coding", icon: "</>", iconBg: "bg-slate-100", iconColor: "text-slate-700" },
  { name: "Commerce", icon: "📊", iconBg: "bg-pink-100", iconColor: "text-pink-600" },
  { name: "Competitive", icon: "🏆", iconBg: "bg-amber-100", iconColor: "text-amber-600" },
  { name: "Languages", icon: "🌐", iconBg: "bg-teal-100", iconColor: "text-teal-600" },
  { name: "More", icon: "⋯", iconBg: "bg-gray-100", iconColor: "text-gray-500" },
];

const tutors = [
  { name: "Anjali Sharma", role: "Maths Expert", exp: "Exp. 6+ Years", rating: 4.9, reviews: 120, location: "Koramangala, Bengaluru", price: "₹600/hr", popular: true, color: "from-amber-100 to-orange-100", initials: "AS", avatarBg: "bg-amber-400" },
  { name: "Rohit Verma", role: "Physics Expert", exp: "Exp. 7+ Years", rating: 4.8, reviews: 89, location: "HSR Layout, Bengaluru", price: "₹650/hr", popular: false, color: "from-blue-100 to-indigo-100", initials: "RV", avatarBg: "bg-blue-400" },
  { name: "Meera Iyer", role: "English Expert", exp: "Exp. 5+ Years", rating: 4.9, reviews: 95, location: "Indiranagar, Bengaluru", price: "₹550/hr", popular: false, color: "from-pink-100 to-rose-100", initials: "MI", avatarBg: "bg-pink-400" },
  { name: "Karan Malhotra", role: "Coding Expert", exp: "Exp. 8+ Years", rating: 4.7, reviews: 70, location: "Whitefield, Bengaluru", price: "₹700/hr", popular: false, color: "from-emerald-100 to-teal-100", initials: "KM", avatarBg: "bg-emerald-400" },
];

const upcomingClasses = [
  { subject: "Maths – Algebra", tutor: "Anjali Sharma", day: "Today", time: "5:00 PM", avatarBg: "bg-amber-400", initials: "AS" },
  { subject: "Physics – Motion", tutor: "Rohit Verma", day: "Tomorrow", time: "6:30 PM", avatarBg: "bg-blue-400", initials: "RV" },
  { subject: "English – Grammar", tutor: "Meera Iyer", day: "Fri, 24 May", time: "4:00 PM", avatarBg: "bg-pink-400", initials: "MI" },
];

const popularSubjects = [
  { name: "Maths", count: "120+ Tutors", icon: "📐", bg: "bg-green-100", iconBg: "bg-green-500" },
  { name: "Science", count: "95+ Tutors", icon: "🔬", bg: "bg-blue-100", iconBg: "bg-blue-500" },
  { name: "Coding", count: "80+ Tutors", icon: "</>", bg: "bg-slate-100", iconBg: "bg-slate-700" },
  { name: "English", count: "110+ Tutors", icon: "Aa", bg: "bg-yellow-100", iconBg: "bg-yellow-500" },
  { name: "Commerce", count: "70+ Tutors", icon: "📊", bg: "bg-pink-100", iconBg: "bg-pink-500" },
];

function OwlImage({ size = 40, className = "" }) {
  return (
    <img
      src={OWL_IMG}
      alt="MentorOwl mascot"
      style={{ width: size, height: size, objectFit: "contain" }}
      className={className}
    />
  );
}

function StarRating({ rating }) {
  return (
    <span className="flex items-center gap-1 text-sm font-semibold text-gray-800">
      <span className="text-yellow-400">★</span> {rating}
    </span>
  );
}

function TutorCard({ tutor }) {
  const [liked, setLiked] = useState(false);
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200 flex flex-col">
      <div className={`relative h-40 bg-gradient-to-br ${tutor.color} flex items-center justify-center`}>
        {tutor.popular && (
          <span className="absolute top-3 left-3 bg-indigo-600 text-white text-xs font-semibold px-2 py-1 rounded-md">⊞ Popular</span>
        )}
        <button onClick={() => setLiked(!liked)} className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow text-gray-400 hover:text-rose-500 transition-colors">
          {liked ? "♥" : "♡"}
        </button>
        <div className={`w-20 h-20 ${tutor.avatarBg} rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg`}>{tutor.initials}</div>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-1 font-bold text-gray-900">{tutor.name}<span className="text-blue-500 text-sm">✔</span></div>
        <p className="text-sm text-gray-500">{tutor.role}</p>
        <p className="text-xs text-gray-400 mb-2">{tutor.exp}</p>
        <div className="flex items-center gap-2 mb-1"><StarRating rating={tutor.rating} /><span className="text-xs text-gray-400">({tutor.reviews})</span></div>
        <p className="text-xs text-gray-400 mb-4">📍 {tutor.location}</p>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-indigo-600 font-bold">{tutor.price}</span>
          <button className="border border-gray-200 text-gray-700 text-sm px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">View Profile</button>
        </div>
      </div>
    </div>
  );
}

export default function MentorOwlHome() {
  const [activeSubject, setActiveSubject] = useState("All Subjects");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center gap-6">
          <div className="flex items-center gap-2 mr-4">
            <OwlImage size={42} />
            <span className="font-extrabold text-xl text-gray-900">Mentor<span className="text-indigo-600">Owl</span></span>
          </div>
          <div className="flex-1 max-w-md relative">
            <input type="text" placeholder="Search tutors, subjects or topics..." className="w-full border border-gray-200 rounded-xl pl-4 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-gray-50" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          </div>
          <div className="hidden md:flex items-center gap-6 ml-auto text-sm font-medium text-gray-600">
            <a href="#" className="hover:text-indigo-600 transition-colors">Find Tutors</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">How it Works</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Become a Tutor</a>
          </div>
          <div className="flex items-center gap-3 ml-4">
            <button className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-indigo-50">💬</button>
            <button className="relative w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-indigo-50">
              🔔<span className="absolute -top-1 -right-1 w-4 h-4 bg-indigo-600 text-white text-[10px] rounded-full flex items-center justify-center font-bold">3</span>
            </button>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-400 to-indigo-400 flex items-center justify-center text-white font-bold text-sm">A</div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-6">
          <div className="flex-1 min-w-0">
            {/* Hero */}
            <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-white rounded-3xl p-8 mb-6 relative overflow-hidden flex items-center justify-between gap-4">
              {/* Left: text + search */}
              <div className="relative z-10 flex-1 min-w-0">
                <p className="text-2xl font-semibold text-gray-800 mb-1">Hi, <span className="text-indigo-600 font-extrabold">Ananya!</span> 👋</p>
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-6">Find the right mentor and<br />achieve your goals faster.</h1>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 max-w-lg flex flex-wrap gap-2">
                  <div className="flex items-center gap-2 flex-1 min-w-[140px] px-3 py-1 border border-gray-100 rounded-xl bg-gray-50">
                    <span className="text-gray-400 text-sm">🎓</span>
                    <select className="flex-1 text-sm text-gray-500 bg-transparent outline-none appearance-none min-w-0">
                      <option>What do you want to learn?</option>
                      <option>Maths</option><option>Science</option><option>English</option><option>Coding</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2 flex-1 min-w-[120px] px-3 py-1 border border-gray-100 rounded-xl bg-gray-50">
                    <span className="text-gray-400 text-sm">📍</span>
                    <input type="text" placeholder="Enter location" className="flex-1 text-sm text-gray-500 bg-transparent outline-none min-w-0" />
                  </div>
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl font-semibold text-sm transition-colors whitespace-nowrap flex-shrink-0">Search</button>
                </div>
              </div>
              {/* Right: owl + verified badge stacked */}
              <div className="hidden md:flex flex-col items-center gap-3 flex-shrink-0 relative z-10">
                {/* Verified badge */}
                <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-3 flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 text-lg">🛡️</div>
                  <div>
                    <p className="font-bold text-sm text-gray-900">Verified Tutors</p>
                    <p className="text-xs text-gray-400">All tutors are background<br />verified for your safety.</p>
                  </div>
                </div>
                {/* Owl image */}
                <OwlImage size={200} className="drop-shadow-xl" />
              </div>
            </div>

            {/* Subject Tabs */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-2 mb-6 flex items-center gap-1 overflow-x-auto">
              {subjects.map((s) => (
                <button key={s.name} onClick={() => setActiveSubject(s.name)}
                  className={`flex flex-col items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all min-w-[68px] ${activeSubject === s.name ? "bg-indigo-50 text-indigo-600 font-bold" : "text-gray-500 hover:bg-gray-50"}`}>
                  <span className={`w-9 h-9 rounded-xl flex items-center justify-center text-base font-bold ${activeSubject === s.name ? "bg-indigo-500 text-white" : `${s.iconBg} ${s.iconColor}`}`}>
                    {s.icon}
                  </span>
                  {s.name}
                </button>
              ))}
            </div>

            {/* Featured Tutors */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-extrabold text-gray-900">Featured Tutors</h2>
                <a href="#" className="text-indigo-600 text-sm font-semibold hover:underline">View all tutors →</a>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {tutors.map((t) => <TutorCard key={t.name} tutor={t} />)}
              </div>
            </div>

            {/* Popular Subjects */}
            <div>
              <h2 className="text-xl font-extrabold text-gray-900 mb-4">Popular Subjects</h2>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {popularSubjects.map((s) => (
                  <div key={s.name} className={`flex items-center gap-3 ${s.bg} rounded-2xl px-4 py-3 min-w-[160px] cursor-pointer hover:shadow-sm transition-all border border-white`}>
                    <div className={`w-10 h-10 ${s.iconBg} rounded-xl flex items-center justify-center text-white font-bold text-sm`}>{s.icon}</div>
                    <div><p className="font-bold text-gray-900 text-sm">{s.name}</p><p className="text-xs text-gray-500">{s.count}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-72 flex-shrink-0 hidden lg:flex flex-col gap-4">
            <div className="bg-gradient-to-br from-indigo-600 to-violet-600 rounded-3xl p-6 text-white relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-xl font-extrabold mb-2">Book a Free<br />Demo Class</h3>
                <p className="text-indigo-100 text-sm mb-4">Connect with tutors and experience the best learning.</p>
                <button className="bg-white text-indigo-700 font-bold text-sm px-5 py-2 rounded-xl hover:bg-indigo-50 transition-colors">Book Now</button>
              </div>
              <div className="absolute right-4 top-4 text-5xl opacity-80 select-none">📅</div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full" />
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 flex-1">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-extrabold text-gray-900">Upcoming Classes</h3>
                <a href="#" className="text-indigo-600 text-xs font-semibold hover:underline">View all</a>
              </div>
              <div className="flex flex-col gap-3">
                {upcomingClasses.map((c) => (
                  <div key={c.subject} className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className={`w-9 h-9 ${c.avatarBg} rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>{c.initials}</div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-sm truncate">{c.subject}</p>
                      <p className="text-xs text-gray-400 truncate">{c.tutor}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-xs text-gray-500 font-medium whitespace-nowrap">{c.day}</span>
                      <span className="text-xs text-gray-400">{c.time}</span>
                    </div>
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors ml-1">Join</button>
                  </div>
                ))}
              </div>
              <a href="#" className="block mt-4 text-center text-indigo-600 text-xs font-semibold hover:underline">View all bookings →</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}