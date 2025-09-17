// Icons
import {
  Users,
  Target,
  BookOpen,
  Settings,
  CheckCircle,
  MessageCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  const features = [
    {
      icon: <BookOpen className="w-8 h-8 text-blue-600" />,
      title: "Practice Tests",
      description:
        "Access comprehensive IELTS practice tests for all four skills: Reading, Writing, Listening, and Speaking.",
    },
    {
      icon: <Target className="w-8 h-8 text-blue-600" />,
      title: "Real Test Simulation",
      description:
        "Experience authentic test conditions with our advanced simulation environment and timing system.",
    },
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: "Expert Feedback",
      description:
        "Get detailed feedback and scoring from certified IELTS instructors to improve your performance.",
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-blue-600" />,
      title: "Progress Tracking",
      description:
        "Monitor your improvement with detailed analytics and personalized study recommendations.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br font-Inter from-slate-50 to-blue-50">
      {/* Custom Container Styles */}
      <style jsx>{`
        .container {
          max-width: 1920px;
          width: 100%;
          padding-left: 1.25rem;
          padding-right: 1.25rem;
          margin-left: auto;
          margin-right: auto;
        }
      `}</style>

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container">
          <nav className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">IELTS Pro</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#about"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                About
              </a>
              <a
                href="#features"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Features
              </a>
              <a
                href="#contact"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Contact
              </a>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Master Your
              <span className="text-blue-600 block">IELTS Journey</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed max-w-3xl mx-auto">
              Comprehensive IELTS preparation platform with real test
              simulations, expert feedback, and personalized study plans to
              achieve your target score.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to={"/link/68c67a5ddec8dace8f16a84c"}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Learn More
              </Link>
              <button className="bg-white hover:bg-gray-50 text-gray-900 px-8 py-4 rounded-xl text-lg font-semibold border-2 border-gray-200 transition-all duration-300 shadow-lg hover:shadow-xl">
                View Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Your Complete IELTS Preparation Platform
                </h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  IELTS Pro is designed to provide comprehensive preparation for
                  all aspects of the IELTS examination. Our platform combines
                  cutting-edge technology with proven teaching methodologies to
                  deliver an exceptional learning experience.
                </p>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Whether you're aiming for academic or general training IELTS,
                  our platform adapts to your specific needs and helps you
                  achieve your target band score efficiently.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">
                      Expert-crafted content
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">AI-powered analytics</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white shadow-2xl">
                  <div className="grid grid-cols-2 gap-6 text-center">
                    <div>
                      <div className="text-3xl font-bold mb-2">50k+</div>
                      <div className="text-blue-100">Students</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold mb-2">95%</div>
                      <div className="text-blue-100">Success Rate</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold mb-2">1000+</div>
                      <div className="text-blue-100">Practice Tests</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold mb-2">24/7</div>
                      <div className="text-blue-100">Support</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Everything You Need to Succeed
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Our comprehensive platform provides all the tools and resources
                necessary for effective IELTS preparation and success.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Telegram Section */}
      <section className="py-20 bg-blue-600">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <MessageCircle className="w-16 h-16 text-white mx-auto mb-6" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Stay Updated with Our News Channel
            </h2>
            <p className="text-xl text-blue-100 mb-10 leading-relaxed">
              Join our Telegram channel for the latest updates, tips, study
              materials, and important announcements about IELTS preparation.
            </p>
            <a
              href="https://t.me/ielts_pro_news"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-white hover:bg-gray-100 text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Join Telegram Channel
            </a>
          </div>
        </div>
      </section>

      {/* Admin Section */}
      <section className="py-20 bg-gray-900">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <Settings className="w-16 h-16 text-gray-400 mx-auto mb-6" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Administrator Access
            </h2>
            <p className="text-xl text-gray-400 mb-10 leading-relaxed">
              Platform administrators can access the admin panel to manage
              content, monitor user progress, and maintain the system.
            </p>
            <a
              href="/admin"
              className="inline-flex items-center bg-gray-800 hover:bg-gray-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 border border-gray-700 hover:border-gray-600"
            >
              <Settings className="w-5 h-5 mr-2" />
              Admin Panel
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-white py-16">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-12">
              <div className="md:col-span-2">
                <div className="flex items-center space-x-2 mb-6">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xl font-bold text-gray-900">
                    IELTS Pro
                  </span>
                </div>
                <p className="text-gray-600 leading-relaxed mb-6 max-w-md">
                  Your trusted partner for IELTS success. Comprehensive
                  preparation, expert guidance, and proven results.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  Quick Links
                </h4>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#about"
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      About
                    </a>
                  </li>
                  <li>
                    <a
                      href="#features"
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      Features
                    </a>
                  </li>
                  <li>
                    <a
                      href="#contact"
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  Resources
                </h4>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="https://t.me/ielts_pro_news"
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      Telegram
                    </a>
                  </li>
                  <li>
                    <a
                      href="/admin"
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      Admin
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      Help Center
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-gray-600 mb-4 md:mb-0">
                  © 2025 IELTS Pro. All rights reserved.
                </p>
                <div className="flex space-x-6">
                  <a
                    href="#"
                    className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                  >
                    Privacy Policy
                  </a>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                  >
                    Terms of Service
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
