import React from 'react';

export const Loader = () => {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-50 rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-50 rounded-full"></div>
      </div>

      <div className="relative text-center">
        {/* Main logo container */}
        <div className="mb-12">
          <div className="relative inline-block">
            {/* Logo image */}
            <div className="relative">
              {/* Main logo */}
              <div className="relative bg-[#0B1B3A] rounded-3xl p-8 shadow-lg">
                <img src="/assets/logo.png" alt="CredChain Logo" className="w-20 h-20" />
                
                {/* Verification checkmark overlay */}
                <div className="absolute -bottom-2 -right-2 bg-[#1A9B50] rounded-full p-2 shadow-md">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Brand name with gradient */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold mb-3 tracking-tight">
            <span className="text-[#0B1B3A]">Cred</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A00] to-[#FF9933]">Chain</span>
          </h1>
          <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            <span className="tracking-wider uppercase text-xs font-semibold">Verified Education Records</span>
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          </div>
        </div>

        {/* Loading progress bar */}
        <div className="mb-10">
          <div className="w-64 h-1 bg-gray-200 rounded-full overflow-hidden mx-auto">
            <div className="h-full bg-gradient-to-r from-[#FF7A00] via-[#1A9B50] to-[#FF7A00] rounded-full animate-[shimmer_1.5s_ease-in-out_infinite]"></div>
          </div>
        </div>

        {/* Loading text with sequential fade */}
        <div className="mb-10 h-6">
          <p className="text-sm text-gray-600 animate-pulse">
            Initializing secure platform...
          </p>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-col items-center gap-4">
          {/* Government seal */}
          <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-blue-50 border border-blue-100">
            <div className="w-2 h-2 bg-[#1A9B50] rounded-full"></div>
            <span className="text-xs text-gray-700 tracking-wide">Secured by Government of India</span>
          </div>

          {/* Security badges */}
          <div className="flex items-center gap-6 text-xs text-gray-600">
            <div className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-[#1A9B50]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span>256-bit Encrypted</span>
            </div>
            <div className="w-px h-3 bg-gray-300"></div>
            <div className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-[#FF7A00]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>UIDAI Verified</span>
            </div>
          </div>
        </div>
      </div>

      {/* Custom keyframe animation for shimmer effect */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};