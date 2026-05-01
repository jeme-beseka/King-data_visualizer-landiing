import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../seo/SEOHead';

const NotFound = () => {
  return (
    <>
      <SEOHead
        title="Page Not Found — King Data Visualizer"
        description="The page you are looking for does not exist. Return to King Data Visualizer to download the free data visualization app."
        robots="noindex, follow"
      />
      <div className="min-h-screen bg-dark text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-4 text-gold-light">404</h1>
          <h2 className="text-2xl mb-4">Page Not Found</h2>
          <p className="text-gray-300 mb-8">
            The page you are looking for does not exist.
          </p>
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-gold text-dark font-semibold rounded-lg hover:bg-gold-light transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
