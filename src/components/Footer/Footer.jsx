import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-100 mt-10 py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        
        {/* Company Section */}
        <div className="sm:text-center md:text-left">
          <h2 className="text-lg font-semibold">Company</h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li><a href="#" className="hover:text-blue-400 transition">Features</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Pricing</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Affiliate Program</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Press Kit</a></li>
          </ul>
        </div>

        {/* Support Section */}
        <div className="sm:text-center md:text-left">
          <h2 className="text-lg font-semibold">Support</h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li><a href="#" className="hover:text-blue-400 transition">Account</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Help</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Contact Us</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Customer Support</a></li>
          </ul>
        </div>

        {/* Legals Section */}
        <div className="sm:text-center md:text-left">
          <h2 className="text-lg font-semibold">Legals</h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li><a href="#" className="hover:text-blue-400 transition">Terms & Conditions</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Licensing</a></li>
          </ul>
        </div>

        {/* Newsletter Section */}
        <div className="sm:text-center md:text-left">
          <h2 className="text-lg font-semibold">Stay Updated</h2>
          <p className="mt-4 text-sm">Subscribe to get the latest updates and offers.</p>
          <button className="mt-4 w-full sm:w-auto bg-emerald-500 text-white px-4 py-2 rounded-lg transition hover:bg-emerald-600 hover:scale-105">
            Subscribe
          </button>
        </div>

      </div>

      {/* Copyright Section */}
      <div className="mt-10 text-center text-xs text-gray-400 px-4">
        <p>© 2025 My Blog. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
