import React from 'react';
import { useParams } from 'react-router-dom';
import SEOHead from '../seo/SEOHead';

const SharedChartPage = () => {
  const { shareId } = useParams();

  return (
    <>
      <SEOHead
        title="Shared Chart — King Data Visualizer"
        description="View an interactive data visualization chart created with King Data Visualizer by Jeme Beseka. Create your own free charts at king-datavisualizer.netlify.app."
        url={`https://king-datavisualizer.netlify.app/share/${shareId}`}
        image="https://king-datavisualizer.netlify.app/og-image.png"
      />
      <div className="min-h-screen bg-dark text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Shared Chart</h1>
          <p className="text-xl text-gray-300">Chart ID: {shareId}</p>
          <p className="text-gray-400 mt-4">This feature is coming soon.</p>
        </div>
      </div>
    </>
  );
};

export default SharedChartPage;
