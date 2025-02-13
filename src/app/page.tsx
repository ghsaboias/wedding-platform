import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-rose-50">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center text-center px-4">
        <div className="absolute inset-0 z-0">
          <Image
            src="/wedding-hero.jpg"
            alt="Wedding celebration"
            fill
            className="object-cover brightness-75"
            priority
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-white">
          <h1 className="text-6xl md:text-7xl font-light mb-6 tracking-tight drop-shadow-lg">
            Your Perfect Wedding Journey
            <span className="block mt-2 text-rose-200">Starts Here</span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 font-light drop-shadow-md max-w-2xl mx-auto">
            Streamline your wedding planning with our all-in-one platform
          </p>
          <div className="flex gap-6 justify-center">
            <Link
              href="/signup"
              className="bg-rose-600 hover:bg-rose-700 text-white px-10 py-4 rounded-full transition-all transform hover:scale-105 shadow-lg text-lg font-medium"
            >
              Get Started
            </Link>
            <Link
              href="/login"
              className="bg-white text-gray-800 px-10 py-4 rounded-full transition-all hover:bg-opacity-90 shadow-lg text-lg font-medium"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl text-center mb-20 text-gray-800 font-light">
            Everything You Need for
            <span className="block mt-2 text-rose-600">Your Special Day</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            {/* For Couples */}
            <div className="bg-white p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1">
              <h3 className="text-2xl mb-8 text-gray-800 font-semibold flex items-center">
                <span className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </span>
                For Couples
              </h3>
              <ul className="space-y-6">
                <li className="flex items-start group">
                  <svg className="w-6 h-6 text-rose-600 mr-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600 group-hover:text-gray-900 transition-colors">Create and manage your guest list effortlessly</span>
                </li>
                <li className="flex items-start group">
                  <svg className="w-6 h-6 text-rose-600 mr-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600 group-hover:text-gray-900 transition-colors">Track RSVP status in real-time</span>
                </li>
                <li className="flex items-start group">
                  <svg className="w-6 h-6 text-rose-600 mr-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600 group-hover:text-gray-900 transition-colors">Create and manage your gift registry</span>
                </li>
                <li className="flex items-start group">
                  <svg className="w-6 h-6 text-rose-600 mr-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600 group-hover:text-gray-900 transition-colors">Personalized wedding website</span>
                </li>
              </ul>
            </div>

            {/* For Guests */}
            <div className="bg-white p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1">
              <h3 className="text-2xl mb-8 text-gray-800 font-semibold flex items-center">
                <span className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </span>
                For Guests
              </h3>
              <ul className="space-y-6">
                <li className="flex items-start group">
                  <svg className="w-6 h-6 text-rose-600 mr-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600 group-hover:text-gray-900 transition-colors">Easy RSVP process</span>
                </li>
                <li className="flex items-start group">
                  <svg className="w-6 h-6 text-rose-600 mr-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600 group-hover:text-gray-900 transition-colors">View and purchase gifts from registry</span>
                </li>
                <li className="flex items-start group">
                  <svg className="w-6 h-6 text-rose-600 mr-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600 group-hover:text-gray-900 transition-colors">Leave heartfelt messages for the couple</span>
                </li>
                <li className="flex items-start group">
                  <svg className="w-6 h-6 text-rose-600 mr-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-600 group-hover:text-gray-900 transition-colors">Specify dietary restrictions and +1 options</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 px-4 bg-gradient-to-br from-rose-50 via-rose-100 to-rose-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl mb-8 text-gray-800 font-light">Start Planning Your Dream Wedding</h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">Join thousands of couples who have made their wedding planning journey easier with our platform</p>
          <div className="space-y-4">
            <Link
              href="/signup"
              className="inline-block bg-rose-600 hover:bg-rose-700 text-white px-12 py-4 rounded-full transition-all transform hover:scale-105 shadow-lg text-lg font-medium"
            >
              Create Your Wedding Page
            </Link>
            <p className="text-sm text-gray-500 mt-4">Free to get started • No credit card required</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-8 px-4">
        <div className="max-w-6xl mx-auto text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} Wedding Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
