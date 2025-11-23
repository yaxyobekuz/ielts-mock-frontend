// Router
import { Link } from "react-router-dom";

// React
import { useEffect, useState } from "react";

// Notification
import { toast } from "@/notification/toast";

// API
import { resultsApi } from "@/api/results.api";

// Components
import ProfilePhoto from "@/components/ProfilePhoto";

// Icons
import ieltsLogo from "@/assets/icons/ielts-logo.svg";
import { Book, Crown, ArrowUpRight } from "lucide-react";
import telegramLogo from "@/assets/icons/telegram-logo.svg";

const Home = () => {
  const isAuthenticated = localStorage.getItem("auth");

  return (
    <>
      {/* Header + hero */}
      <div className="bg-gradient-to-b from-gray-100 to-transparent">
        {/* Header */}
        <header className="py-5">
          <div className="flex items-center gap-8 !max-w-7xl container">
            {/* Logo */}
            <Link to="/">
              <img
                height={32}
                width={95.3}
                src={ieltsLogo}
                alt="CD IELTS logo svg"
                className="w-28 h-[30.5px]"
              />
            </Link>

            {/* Nav */}
            <nav className="flex items-center justify-between grow">
              {/* Main */}
              <ul className="flex items-center gap-8">
                {/* Home */}
                <li>
                  <Link
                    to="/"
                    className="py-2 transition-colors duration-200 hover:text-blue-500"
                  >
                    Bosh sahifa
                  </Link>
                </li>

                {/* About */}
                <li>
                  <Link
                    to="/about"
                    className="py-2 transition-colors duration-200 hover:text-blue-500"
                  >
                    Haqida
                  </Link>
                </li>

                {/* Contact */}
                <li>
                  <Link
                    to="/contact"
                    className="py-2 transition-colors duration-200 hover:text-blue-500"
                  >
                    Bog'lanish
                  </Link>
                </li>
              </ul>

              {/* Auth */}
              {isAuthenticated ? null : (
                <ul className="flex items-center gap-3.5">
                  {/* Login */}
                  <li>
                    <Link
                      to="/auth/login"
                      className="px-4 py-2 rounded-full transition-colors duration-200 hover:text-blue-500"
                    >
                      Kirish
                    </Link>
                  </li>

                  {/* Register */}
                  <li>
                    <Link
                      to="/auth/register"
                      className="bg-gray-700 px-4 py-2 text-white rounded-full transition-colors duration-200 hover:bg-gray-900"
                    >
                      Ro'yxatdan o'tish
                    </Link>
                  </li>
                </ul>
              )}

              {!isAuthenticated ? null : (
                <Link
                  to="/profile/me"
                  className="p-1.5 rounded-md transition-colors duration-200 hover:text-blue-500"
                >
                  Profil
                </Link>
              )}
            </nav>
          </div>
        </header>

        {/* Hero */}
        <div className="flex flex-col items-center justify-center py-12">
          {/*  */}
          <div className="flex items-center gap-1.5 bg-white px-4 py-2 text-gray-900 text-sm rounded-full mb-5">
            <Book size={18} strokeWidth={1.5} /> CD IELTS tayyorlovining #1
            raqamli platformasi
          </div>

          {/* Title */}
          <h1 className=" text-5xl leading-normal font-semibold text-center mb-5">
            <strong className="text-red-500 font-bold">IELTS</strong>'ga Onlayn
            Tayyorlaning. <br /> Natijangizni O'zgartiring
          </h1>

          {/* Subtitle */}
          <p className="text-center text-gray-500 text-lg mb-8">
            Raqamli imtihon muhiti bilan tanishing <br /> va bilimingizni
            oshiring.
          </p>

          {/* CTA */}
          <div className="flex items-center gap-4">
            <a
              target="_blank"
              href="https://t.me/cdieltspro"
              className="flex justify-center w-44 bg-gray-100 py-2 rounded-full text-lg transition-colors duration-200 hover:bg-gray-200"
            >
              Ma'lumot olish
            </a>
            <a
              target="_blank"
              href="https://t.me/cdieltspro"
              className="flex justify-center w-44 bg-red-500 py-2 text-white rounded-full text-lg transition-colors duration-200 hover:bg-red-600"
            >
              Imtihonlar
            </a>
          </div>
        </div>
      </div>

      <main className="grow">
        {/* Leaderboard */}
        <Leaderboard />
      </main>

      {/* Footer */}
      <footer className="py-5">
        {/* Main conntent */}
        <div className="flex items-center gap-8 !max-w-7xl container">
          {/* Logo */}
          <Link to="/">
            <img
              height={32}
              width={95.3}
              src={ieltsLogo}
              alt="CD IELTS logo svg"
              className="w-28 h-[30.5px]"
            />
          </Link>

          {/* Nav */}
          <div className="flex items-center justify-between grow">
            {/* Main */}
            <nav>
              <ul className="flex items-center gap-8">
                {/* Home */}
                <li>
                  <Link
                    to="/"
                    className="py-2 transition-colors duration-200 hover:text-blue-500"
                  >
                    Bosh sahifa
                  </Link>
                </li>

                {/* About */}
                <li>
                  <Link
                    to="/about"
                    className="py-2 transition-colors duration-200 hover:text-blue-500"
                  >
                    Haqida
                  </Link>
                </li>

                {/* Contact */}
                <li>
                  <Link
                    to="/contact"
                    className="py-2 transition-colors duration-200 hover:text-blue-500"
                  >
                    Bog'lanish
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Social */}
            <ul className="flex items-center gap-3.5">
              {/* Telegram */}
              <li>
                <a
                  target="_blank"
                  href="https://t.me/cdieltspro"
                  aria-label="CD IELTS rasmiy telegram kanali"
                  className="px-4 py-2 rounded-full transition-colors duration-200 hover:text-blue-500"
                >
                  <img
                    width={32}
                    height={32}
                    className="size-8"
                    src={telegramLogo}
                    alt="Telegram logo svg"
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr />

        {/* Sub content */}
        <div className="flex items-center justify-between gap-5 !max-w-7xl container pt-5">
          {/* Logo */}
          <strong className="text-sm font-normal text-gray-500">
            © 2025. "CD IELTS"
          </strong>

          {/* Main */}
          <nav>
            <ul className="flex items-center gap-8">
              {/* Home */}
              <li>
                <Link
                  to="/terms"
                  className="text-sm text-gray-500 py-2 transition-colors duration-200 hover:text-blue-500"
                >
                  Ommaviy oferta
                </Link>
              </li>

              {/* About */}
              <li>
                <Link
                  to="/privacy"
                  className="text-sm text-gray-500 py-2 transition-colors duration-200 hover:text-blue-500"
                >
                  Maxfiylik siyosati
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </footer>
    </>
  );
};

const Leaderboard = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLeaderboard = async () => {
      resultsApi
        .getLeaderboard(11)
        .then(({ results }) => {
          setResults(results);
        })
        .catch(() => toast.error("Natijalarni yuklashda xatolik"))
        .finally(() => setLoading(false));
    };

    loadLeaderboard();
  }, []);

  if (loading) {
    return (
      <section className="py-16">
        <div className="!max-w-7xl container">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
          </div>
        </div>
      </section>
    );
  }

  if (!results.length) return null;

  return (
    <section className="bg-gradient-to-t from-gray-5 py-16">
      <div className="!max-w-7xl container space-y-12">
        {/* Section header */}
        <div className="flex items-center justify-between text-center">
          <h2 className="text-3xl font-semibold">Eng yaxshi natijalar</h2>
          <a
            target="_blank"
            href="https://t.me/cdieltspro"
            className="flex items-center justify-center gap-1.5 text-gray-500 transition-colors duration-200 hover:text-blue-500"
          >
            Eng yaxshi natijani egallash
            <ArrowUpRight size={22} />
          </a>
        </div>

        {/* Top 3 */}
        <div className="flex items-end justify-center">
          {/* 2nd place */}
          <div className="flex flex-col items-center justify-center w-40">
            {/* Avatar */}
            <div className="relative max-w-max border-4 border-gray-300 rounded-full mb-3.5">
              <ProfilePhoto
                user={results[1].student}
                className="size-20 rounded-full text-2xl"
              />

              <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-gray-300 px-3.5 py-1 rounded-full text-sm font-medium">
                2
              </span>
            </div>

            {/* User name */}
            <h3 className="max-w-full line-clamp-1 text-center font-medium text-lg">
              {results[1].student.firstName}
            </h3>

            {/* Score */}
            <strong className="text-xl text-red-500">
              {results[1].overall.toString().padEnd(3, ".0")}
            </strong>
          </div>

          {/* 1st place */}
          <div className="flex flex-col items-center justify-center w-40">
            {/* Avatar */}
            <div className="relative max-w-max border-4 border-yellow-400 rounded-full mb-3.5">
              <ProfilePhoto
                user={results[0].student}
                className="size-28 rounded-full text-2xl"
              />

              <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-yellow-400 px-3.5 py-1 rounded-full text-sm font-medium">
                1
              </span>

              {/* Crown */}
              <Crown
                fill="#facc15"
                stroke="#facc15"
                className="absolute -top-8 left-1/2 -translate-x-1/2 size-6"
              />
            </div>

            {/* User name */}
            <h3 className="max-w-full line-clamp-1 text-center font-medium text-lg">
              {results[0].student.firstName}
            </h3>

            {/* Score */}
            <strong className="text-xl text-red-500">
              {results[0].overall.toString().padEnd(3, ".0")}
            </strong>
          </div>

          {/* 3rd place */}
          <div className="flex flex-col items-center justify-center w-40">
            {/* Avatar */}
            <div className="relative max-w-max border-4 border-orange-300 rounded-full mb-3.5">
              <ProfilePhoto
                user={results[2].student}
                className="size-16 rounded-full text-lg"
              />

              <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-orange-300 px-3.5 py-1 rounded-full text-sm font-medium">
                3
              </span>
            </div>

            {/* User name */}
            <h3 className="max-w-full line-clamp-1 text-center font-medium text-lg">
              {results[2].student.firstName}
            </h3>

            {/* Score */}
            <strong className="text-xl text-red-500">
              {results[2].overall.toString().padEnd(3, ".0")}
            </strong>
          </div>
        </div>

        {/* Leaderboard grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
          {results.slice(3).map((result, index) => (
            <div
              key={result._id}
              className="flex items-center justify-between p-4 rounded-3xl bg-gray-50"
            >
              {/* Profile */}
              <div className="flex items-center gap-3">
                {/* Rank */}
                <span className="font-medium">{index + 4}.</span>

                {/* Rank */}
                <ProfilePhoto user={result.student} />

                {/* Student info */}
                <div>
                  <h3 className="font-semibold">
                    {result.student.firstName} {result.student.lastName}
                  </h3>
                </div>
              </div>

              {/* Result */}
              <strong className="text-xl text-gray-600">
                {result.overall.toString().padEnd(3, ".0")}
              </strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;
