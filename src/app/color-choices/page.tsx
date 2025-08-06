'use client';

import Container from "@/app/components/container";
import Header from "@/app/components/header";
import { useState } from "react";
import { useLightbox } from '../contexts/LightboxContext';

interface ColorChoice {
  id: string;
  title: string;
  description: string;
  deadline: string;
  status: 'approved' | 'pending' | 'favored';
  photos: string[];
  notes?: string;
}

// Cabinet choices
const cabinetChoices: ColorChoice[] = [
  {
    id: 'cabinets-white',
    title: 'Cabinets - Designer White',
    description: 'Crisp white cabinetry with soft-close hinges and modern hardware. Shaker Door Panel style.',
    deadline: 'August 8, 2025',
    status: 'pending',
    photos: [
      '/assets/blog/pr7/Scandinavian/pr7-CB-Scandanavian-11.jpg',
      '/assets/blog/pr7/Scandinavian/pr7-CB-Scandanavian-3.jpg',
      '/assets/blog/pr7/Scandinavian/pr7-CB-Scandanavian-4.jpg',
      '/assets/blog/pr7/Scandinavian/pr7-CB-Scandanavian-10-2.jpg',
      '/assets/blog/pr7/Scandinavian/pr7-CB-Scandanavian-12.jpg',
      '/assets/blog/pr7/Scandinavian/pr7-CB-Scandanavian-13.jpg',
      '/assets/blog/pr7/Scandinavian/pr7-CB-Scandanavian-14.jpg'
    ],
    notes: 'Shaker style cabinets are a popular choice for their clean, timeless design. Awaiting client decision.'
  },
  {
    id: 'cabinets-royal-maple',
    title: 'Accent Cabinets - Royal Maple',
    description: 'Royal Blue painted maple wood cabinet finish for kitchen island. The dark royal blue color matches beautifully with white and walnut finishes.',
    deadline: 'August 8, 2025',
    status: 'pending',
    photos: [
      '/assets/blog/pr7/color-board/pr7-CB-Cabinets-1.jpg',
      '/assets/blog/pr7/color-board/pr7-CB-Option-B-1.jpg',
      '/assets/blog/pr7/color-board/pr7-CB-Option-B-2.jpg',
      '/assets/blog/pr7/color-board/pr7-CB-Option-B.jpg',
      '/assets/blog/pr7/Scandinavian/pr7-CB-Scandanavian-1.jpg',
      '/assets/blog/pr7/Scandinavian/pr7-CB-Scandanavian-2.jpg',
      '/assets/blog/pr7/Scandinavian/pr7-CB-Scandanavian-3.jpg',
      '/assets/blog/pr7/Scandinavian/pr7-CB-Scandanavian-4.jpg',
      '/assets/blog/pr7/Scandinavian/pr7-CB-Scandanavian-5.jpg',
      '/assets/blog/pr7/Scandinavian/pr7-CB-Scandanavian-6.jpg',
      '/assets/blog/pr7/Scandinavian/pr7-CB-Scandanavian-10-2.jpg',
      '/assets/blog/pr7/Scandinavian/pr7-CB-Scandanavian-11.jpg',
      '/assets/blog/pr7/Scandinavian/pr7-CB-Scandanavian-14.jpg'
    ],
    notes: 'Rich blue finish would create beautiful contrast with white cabinets. Awaiting client decision.'
  },
  {
    id: 'cabinets-dutch-maple',
    title: 'Alternative - Dutch Maple',
    description: 'Lighter blue option for a softer contrast',
    deadline: 'August 8, 2025',
    status: 'pending',
    photos: [
      '/assets/blog/pr7/Scandinavian/pr7-CB-Scandanavian-12.jpg',
      '/assets/blog/pr7/Scandinavian/pr7-CB-Scandanavian-13.jpg',
      '/assets/blog/pr7/Scandinavian/pr7-CB-Scandanavian-4-2.jpg'
    ],
    notes: 'Lighter alternative to Royal Maple - same wood species, simply a lighter color. Awaiting client decision.'
  },
  {
    id: 'cabinets-honey-walnut',
    title: 'Cabinets - Honey-Walnut',
    description: 'Warm honey-walnut finish for lower wall cabinets in the kitchen and bathroom vanity cabinets. Rich wood tones that complement the overall design palette.',
    deadline: 'August 8, 2025',
    status: 'pending',
    photos: [
      '/assets/blog/pr7/Scandinavian/pr7-CB-Scandanavian-14.jpg',
      '/assets/blog/pr7/Scandinavian/pr7-CB-Scandanavian-13.jpg',
      '/assets/blog/pr7/Scandinavian/pr7-CB-Scandanavian-12.jpg',
      '/assets/blog/pr7/Scandinavian/pr7-CB-Scandanavian-11.jpg',
      '/assets/blog/pr7/Scandinavian/pr7-CB-Scandanavian-10-2.jpg',
      '/assets/blog/pr7/Scandinavian/pr7-CB-Scandanavian-6.jpg',
      '/assets/blog/pr7/Scandinavian/pr7-CB-Scandanavian-3.jpg'
    ],
    notes: 'Honey-walnut finish provides warmth and richness for kitchen and bathroom cabinetry. Awaiting client decision.'
  },
  {
    id: 'hardware-black-matte',
    title: 'Cabinet Hardware',
    description: 'Modern cabinet pulls and hinges in black matte finish',
    deadline: 'August 25, 2025',
    status: 'pending',
    photos: [],
    notes: 'Black matte finish provides a sleek, contemporary look that complements modern cabinetry. Awaiting client decision.'
  }
];

// Paint choices
const paintChoices: ColorChoice[] = [
  {
    id: 'door-stain',
    title: 'Door/Sill Stain - #53',
    description: 'Rich medium-tone stain that complements both light and dark elements',
    deadline: 'August 1, 2025',
    status: 'approved',
    photos: [
      '/assets/blog/pr7/color-board/pr7-CB-Door-1.jpg',
      '/assets/blog/pr7/color-board/pr7-CB-Door-3.jpg',
      '/assets/blog/pr7/color-board/pr7-CB-Doorstains-1.jpg',
      '/assets/blog/pr7/color-board/pr7-CB-Option-A.png',
      '/assets/blog/pr7/color-board/pr7-CB-Option-B-1.jpg'
    ],
    notes: 'Client has approved this stain selection. Order confirmed with supplier.'
  },
  {
    id: 'interior-paint',
    title: 'Interior Paint',
    description: 'Interior paint colors for walls, ceilings, and trim throughout the home',
    deadline: 'August 20, 2025',
    status: 'pending',
    photos: [
      '/assets/blog/pr7/color-board/Paint/pr7-interior-paint-10.jpg',
      '/assets/blog/pr7/color-board/pr7-CB-Cabinets-1.jpg',
      '/assets/blog/pr7/color-board/pr7-CB-Dover-White.jpg',
      '/assets/blog/pr7/color-board/pr7-CB-Option-B-1.jpg',
      '/assets/blog/pr7/color-board/pr7-CB-Option-B-2.jpg',
      '/assets/blog/pr7/Scandinavian/pr7-CB-Scandanavian-1.jpg',
      '/assets/blog/pr7/color-board/Flooring-Glacier/pr7-CB-Nordic-1.jpg',
      '/assets/blog/Lidstrom/alpine-meadow-17.jpg',
      '/assets/blog/Lidstrom/alpine-meadow-18.jpg',
      '/assets/blog/Lidstrom/alpine-meadow-19.jpg'
    ],
    notes: 'One color interior paint, Dover White by Sherwin Williams. This is the color we have used in multiple homes, it has a nice warm undertone. There are plenty of options for this choice, we can put up samples if you want to explore other options.'
  },
  {
    id: 'exterior-paint',
    title: 'Exterior Paint',
    description: 'Exterior Paint for the main siding, as well as the Board and Batton Bump-outs',
    deadline: 'August 13, 2025',
    status: 'pending',
    photos: [
      '/assets/blog/pr7/color-board/Paint/PR7-Paint-Rust.webp',
      '/assets/blog/pr7/color-board/Paint/PR7-paint-1.webp',
      '/assets/blog/pr7/color-board/Paint/PR7-Paint-2.webp',
      '/assets/blog/pr7/color-board/Paint/PR7-Paint-3.webp',
      '/assets/blog/pr7/color-board/Paint/PR7-Paint-Green.webp',
      '/assets/blog/pr7/color-board/Paint/PR7-Paint-White.webp',
      '/assets/blog/pr7/color-board/Paint/PR7-Paint-gray.webp',
      '/assets/blog/Lidstrom/alpine-meadow-10.jpg',
      '/assets/blog/Lidstrom/alpine-meadow-11.jpg',
      '/assets/blog/Lidstrom/alpine-meadow-20.jpg'
    ],
    notes: 'The planned colors were Iron Ore on the main lap siding, and a darker brown rusty-color on the board and batton bump outs. Iron Ore is the color the other home in these photos was painted. You can see the compliments to the rusted Corten roofing that PR7 would share. Take note: These colorized simulations of paint do not reflect acurately the actual painted siding. Samples can be put up to ensure the color choice.'
  }
];

// Flooring choices
const flooringChoices: ColorChoice[] = [
  {
    id: 'flooring-glacier',
    title: 'Flooring - Glacier',
    description: '• <strong>Construction:</strong> Engineered 6 Ply Core<br/>• <strong>Length:</strong> Random Length up to 72"<br/>• <strong>Width:</strong> 7.5"<br/>• <strong>Species:</strong> European Oak<br/>• <strong>Texture:</strong> Wirebrush<br/>• <strong>Finish:</strong> UV Cured Finish<br/>• <strong>Gloss:</strong> Matte<br/>• <strong>Warranty:</strong> 20 Year Limited Residential',
    deadline: 'August 22, 2025',
    status: 'favored',
    photos: [
      '/assets/blog/pr7/Scandinavian/pr7-CB-Scandanavian-14.jpg',
      '/assets/blog/pr7/Scandinavian/pr7-CB-Scandanavian-1-2.jpg',
      '/assets/blog/pr7/Scandinavian/pr7-CB-Scandanavian-1.jpg',
      '/assets/blog/pr7/Scandinavian/pr7-CB-Scandanavian-10-2.jpg',
      '/assets/blog/pr7/Scandinavian/pr7-CB-Scandanavian-10.jpg',
      '/assets/blog/pr7/Scandinavian/pr7-CB-Scandanavian-11.jpg',
      '/assets/blog/pr7/Scandinavian/pr7-CB-Scandanavian-12.jpg',
      '/assets/blog/pr7/Scandinavian/pr7-CB-Scandanavian-13.jpg',
      '/assets/blog/pr7/Scandinavian/pr7-CB-Scandanavian-2-2.jpg',
      '/assets/blog/pr7/Scandinavian/pr7-CB-Scandanavian-2.jpg',
      '/assets/blog/pr7/Scandinavian/pr7-CB-Scandanavian-3-2.jpg',
      '/assets/blog/pr7/Scandinavian/pr7-CB-Scandanavian-3.jpg',
      '/assets/blog/pr7/Scandinavian/pr7-CB-Scandanavian-4-2.jpg',
      '/assets/blog/pr7/Scandinavian/pr7-CB-Scandanavian-4.jpg',
      '/assets/blog/pr7/Scandinavian/pr7-CB-Scandanavian-5.jpg',
      '/assets/blog/pr7/Scandinavian/pr7-CB-Scandanavian-6.jpg',
      '/assets/blog/pr7/Scandinavian/pr7-CB-Scandanavian-7.jpg',
      '/assets/blog/pr7/Scandinavian/pr7-CB-Scandanavian-8.jpg',
      '/assets/blog/pr7/Scandinavian/pr7-CB-Scandanavian-9.jpg',
      '/assets/blog/pr7/color-board/Flooring-Glacier/pr7-CB-Nordic-1.jpg',
      '/assets/blog/pr7/color-board/Flooring-Glacier/pr7-CB-Nordic.jpg'
    ],
    notes: 'This flooring option provides excellent durability and matches the Scandinavian aesthetic perfectly.'
  }
];

// Categories to organize choices
const categories = [
  { name: "Cabinets", choices: cabinetChoices },
  { name: "Paint", choices: paintChoices },
  { name: "Flooring", choices: flooringChoices },
  { name: "Tile", choices: [] },
  { name: "Countertops", choices: [] },
  { name: "Plumbing Fixtures", choices: [] },
  { name: "Light Fixtures", choices: [] }
];

export default function ColorChoices() {
  const [selectedChoice, setSelectedChoice] = useState<ColorChoice | null>(null);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const { openLightbox } = useLightbox();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'favored':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return '✅';
      case 'pending':
        return '⏳';
      case 'favored':
        return '🔄';
      default:
        return '❓';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Approved';
      case 'pending':
        return 'Pending';
      case 'favored':
        return 'Favored';
      default:
        return 'Unknown';
    }
  };

  const openModal = (choice: ColorChoice) => {
    setSelectedChoice(choice);
    setSelectedPhotoIndex(0);
  };

  const closeModal = () => {
    setSelectedChoice(null);
    setSelectedPhotoIndex(0);
  };

  const nextPhoto = () => {
    if (selectedChoice) {
      setSelectedPhotoIndex((prev) => 
        prev === selectedChoice.photos.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevPhoto = () => {
    if (selectedChoice) {
      setSelectedPhotoIndex((prev) => 
        prev === 0 ? selectedChoice.photos.length - 1 : prev - 1
      );
    }
  };

  const renderComingSoonCard = (categoryName: string) => (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-xl shadow-md border-2 border-dashed border-gray-300 dark:border-gray-500 overflow-hidden">
      <div className="h-48 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-600 dark:to-gray-500">
        <div className="text-center">
          <div className="text-4xl mb-2">🚧</div>
          <div className="text-lg font-semibold text-gray-600 dark:text-gray-300">Coming Soon</div>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-2">{categoryName} Options</h3>
        <p className="text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
          {categoryName} selections will be added here soon
        </p>
        <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg p-3">
          <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">
            📧 Check back soon for updates! You'll receive an email when new selections are available.
          </p>
        </div>
      </div>
    </div>
  );

  const renderChoiceCard = (choice: ColorChoice) => (
    <div 
      key={choice.id}
      onClick={choice.photos.length > 0 ? () => openModal(choice) : undefined}
      className={`rounded-xl shadow-md hover:shadow-lg dark:hover:shadow-gray-900/25 transition-all duration-200 hover:-translate-y-1 overflow-hidden ${
        choice.photos.length > 0 
          ? 'bg-white dark:bg-gray-800 cursor-pointer group' 
          : 'bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 border-2 border-dashed border-gray-300 dark:border-gray-500'
      }`}
    >
      <div className="h-48 overflow-hidden relative">
        {choice.photos.length > 0 ? (
          <img 
            src={choice.photos[0]} 
            alt={choice.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            data-no-lightbox="true"
          />
        ) : (
          <div className="h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-600 dark:to-gray-500">
            <div className="text-center">
              <div className="text-4xl mb-2">🔧</div>
              <div className="text-lg font-semibold text-gray-600 dark:text-gray-300">Coming Soon</div>
            </div>
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className={`text-xl font-bold mb-2 ${choice.photos.length > 0 ? 'text-gray-900 dark:text-gray-100' : 'text-gray-700 dark:text-gray-300'}`}>
          {choice.title}
        </h3>
        <div 
          className={`mb-4 leading-relaxed ${choice.photos.length > 0 ? 'text-gray-600 dark:text-gray-300' : 'text-gray-500 dark:text-gray-400'}`}
          dangerouslySetInnerHTML={{ __html: choice.description }}
        />
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div>
            <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
              Deadline
            </div>
            <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              {choice.deadline}
            </div>
          </div>
          <div className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-semibold ${getStatusColor(choice.status)}`}>
            <span>{getStatusIcon(choice.status)}</span>
            <span>{getStatusText(choice.status)}</span>
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <main>
      <Container>
        <Header />
        <div className="mb-32">
          {/* Hero Header */}
          <div className="text-center py-8 px-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl mb-12">
            <div className="inline-block bg-purple-900 dark:bg-purple-800 text-white px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider mb-4">
              Color Selections
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100 mb-4 leading-tight">
              Porter Ranch 7 Color Board
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Track your selections, deadlines, and approvals in one place
            </p>
          </div>

          {/* Color Choice Dashboard */}
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">Color Choice Dashboard</h2>

          {/* Categorized Sections */}
          {categories.map((category) => (
            <div key={category.name} className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 border-b-2 border-gray-200 dark:border-gray-700 pb-2">
                {category.name}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {category.choices.length > 0 ? (
                  category.choices.map((choice) => renderChoiceCard(choice))
                ) : (
                  renderComingSoonCard(category.name)
                )}
              </div>
            </div>
          ))}

          {/* Selection Notes */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Selection Notes</h2>
            
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                <strong>Designer Preference:</strong> The combination of Glacier flooring with Royal Maple accents creates a beautiful contrast that embodies the Scandinavian aesthetic while adding warmth to the space.
              </p>
              
              <p>
                <strong>Timeline:</strong> All selections must be finalized by August 25, 2025 to maintain the project schedule.
              </p>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Status Legend:</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-green-100 text-green-800 px-3 py-2 rounded-full text-sm font-semibold">
                    <span>✅</span>
                    <span>Approved</span>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Selection confirmed and ordered</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-yellow-100 text-yellow-800 px-3 py-2 rounded-full text-sm font-semibold">
                    <span>⏳</span>
                    <span>Pending</span>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Awaiting client decision</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-2 rounded-full text-sm font-semibold">
                    <span>🔄</span>
                    <span>Favored</span>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Client is likely choosing this option, awaiting approval</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal */}
        {selectedChoice && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={closeModal}
          >
            <div 
              className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{selectedChoice.title}</h2>
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold mt-2 ${getStatusColor(selectedChoice.status)}`}>
                    <span>{getStatusIcon(selectedChoice.status)}</span>
                    <span>{getStatusText(selectedChoice.status)}</span>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                {/* Photo Gallery */}
                <div className="relative mb-6">
                  <div className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                    <img
                      src={selectedChoice.photos[selectedPhotoIndex]}
                      alt={`${selectedChoice.title} - Photo ${selectedPhotoIndex + 1}`}
                      className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        openLightbox(selectedChoice.photos[selectedPhotoIndex], selectedChoice.photos);
                      }}
                    />
                  </div>

                  {/* Photo Navigation */}
                  {selectedChoice.photos.length > 1 && (
                    <>
                      <button
                        onClick={prevPhoto}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={nextPhoto}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>

                      {/* Photo Counter */}
                      <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                        {selectedPhotoIndex + 1} / {selectedChoice.photos.length}
                      </div>
                    </>
                  )}
                </div>

                {/* Photo Thumbnails */}
                {selectedChoice.photos.length > 1 && (
                  <div className="grid grid-cols-4 md:grid-cols-6 gap-2 mb-6">
                    {selectedChoice.photos.map((photo, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedPhotoIndex(index)}
                        className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                          index === selectedPhotoIndex 
                            ? 'border-blue-500 ring-2 ring-blue-200' 
                            : 'border-transparent hover:border-gray-300'
                        }`}
                      >
                        <img
                          src={photo}
                          alt={`${selectedChoice.title} thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                          data-no-lightbox="true"
                        />
                      </button>
                    ))}
                  </div>
                )}

                {/* Details */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Description</h3>
                    <div 
                      className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4"
                      dangerouslySetInnerHTML={{ __html: selectedChoice.description }}
                    />
                    
                    {selectedChoice.notes && (
                      <>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Notes</h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                          {selectedChoice.notes}
                        </p>
                      </>
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Timeline</h3>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">Decision Deadline</div>
                          <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">{selectedChoice.deadline}</div>
                        </div>
                        <div className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(selectedChoice.status)}`}>
                          {getStatusText(selectedChoice.status)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
    </main>
  );
}