'use client'

import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'

export default function Home() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  const handleGetStarted = () => {
    if (isAuthenticated) {
      router.push('/dashboard')
    } else {
      router.push('/auth')
    }
  }

  const handleSignIn = () => {
    router.push('/auth')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-lg bg-gray-900/80 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <span className="text-xl font-bold text-white">TodoApp</span>
            </div>

            {/* Nav Actions */}
            <div className="flex items-center space-x-4">
              <button
                onClick={handleSignIn}
                className="px-4 py-2 text-gray-300 hover:text-white transition-colors font-medium"
              >
                Sign In
              </button>
              <button
                onClick={handleGetStarted}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center space-y-8">
          {/* Status Badge */}
          <div className="flex justify-center">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full backdrop-blur-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-blue-300">Phase II Complete</span>
            </div>
          </div>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Full-Stack Todo
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Application
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              A production-ready, spec-driven full-stack application built with FastAPI, Next.js, PostgreSQL, and JWT authentication.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={handleGetStarted}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-lg font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 transform"
            >
              Start Free
            </button>
            <button
              onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
              className="px-8 py-4 bg-gray-800/50 backdrop-blur-sm text-white text-lg font-semibold rounded-xl border border-gray-700 hover:bg-gray-800 hover:border-gray-600 transition-all"
            >
              Learn More
            </button>
          </div>

          {/* Tech Stack Section */}
          <div className="pt-16 space-y-6">
            <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
              Built With Modern Technologies
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {[
                { name: 'Next.js 14', color: 'from-gray-700 to-gray-800' },
                { name: 'FastAPI', color: 'from-teal-600 to-teal-700' },
                { name: 'TypeScript', color: 'from-blue-600 to-blue-700' },
                { name: 'PostgreSQL', color: 'from-blue-700 to-indigo-700' },
                { name: 'Tailwind CSS', color: 'from-cyan-600 to-blue-600' },
                { name: 'SQLModel', color: 'from-red-600 to-pink-600' },
              ].map((tech) => (
                <div
                  key={tech.name}
                  className={`px-5 py-2.5 bg-gradient-to-r ${tech.color} text-white text-sm font-medium rounded-full shadow-lg hover:scale-105 transition-transform cursor-default`}
                >
                  {tech.name}
                </div>
              ))}
            </div>
          </div>

          {/* Features Grid */}
          <div className="pt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: 'Lightning Fast',
                description: 'Built with performance in mind using Next.js and FastAPI for optimal speed.',
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                ),
                title: 'Secure by Default',
                description: 'JWT authentication, password hashing, and secure API endpoints out of the box.',
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                ),
                title: 'Production Ready',
                description: 'Fully tested, documented, and ready to deploy to Vercel or Railway.',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-8 bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl hover:bg-gray-800/50 hover:border-gray-600 transition-all group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-indigo-600/20 rounded-xl flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center space-y-2">
            <p className="text-gray-400 text-sm">
              Built with ❤️ by{' '}
              <span className="text-blue-400 font-semibold">Umema Sultan</span>
            </p>
            <p className="text-gray-500 text-xs">
              © 2026 TodoApp. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
