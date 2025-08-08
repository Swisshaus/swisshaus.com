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
    status: 'approved',
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
    status: 'approved',
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
    id: 'cabinets-honey-walnut',
    title: 'Cabinets - Honey-Walnut',
    description: 'Warm honey-walnut finish for lower wall cabinets in the kitchen and bathroom vanity cabinets. Rich wood tones that complement the overall design palette.',
    deadline: 'August 8, 2025',
    status: 'approved',
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
    deadline: 'September 1, 2025',
    status: 'pending',
    photos: [],
    notes: 'Black matte finish provides a sleek, contemporary look that complements modern cabinetry. Awaiting client decision.'
  },
  {
    id: 'cabinet-locations-breakdown',
    title: 'Cabinet Color Groups',
    description: 'Detailed breakdown of cabinet locations throughout the home with preferred color selections',
    deadline: 'August 8, 2025',
    status: 'approved',
    photos: [
      '/assets/blog/pr7/Scandinavian/pr7-CB-Scandanavian-11.jpg',
      '/assets/blog/pr7/Scandinavian/pr7-CB-Scandanavian-14.jpg',
      '/assets/blog/pr7/color-board/pr7-CB-Option-B-1.jpg'
    ],
    notes: `<strong>Kitchen:</strong><br/>
• Island: Royal Blue Maple<br/>
• Wall Lowers: Honey Walnut<br/>
• Wall Uppers: Designer White<br/>
• Oven: TBD<br/><br/>

<strong>Butler Pantry:</strong><br/>
• Lowers: Honey Walnut<br/>
• Uppers: Designer White<br/><br/>

<strong>Bathrooms:</strong><br/>
• Master Bath: Royal Blue Maple<br/>
• Master Closet Linen: Honey Walnut<br/>
• Bath 2 (Office): Honey Walnut<br/>
• Bath 3 (Jack & Jill): Honey Walnut<br/>
• Powder Room: Honey Walnut<br/><br/>

<strong>Laundry:</strong><br/>
• Lowers: Honey Walnut<br/>
• Uppers: Designer White`
  },
  {
    id: 'kitchen-oven-cabinet',
    title: 'Kitchen Oven Cabinet - Honey-Walnut',
    description: 'Decision made to use the color of the Kitchen wall lowers: Honey-Walnut finish',
    deadline: 'August 8, 2025',
    status: 'approved',
    photos: [
      '/assets/blog/pr7/color-board/PR7-Range-Cabinets.webp'
    ],
    notes: `<strong>Decision Confirmed:</strong> Kitchen oven cabinet will match the wall lower cabinets using Honey-Walnut finish for visual continuity and warmth.<br/><br/>

<strong>Reference Examples (Selected Option):</strong><br/><br/>
<a href="https://www.houzz.com/photos/hoegger-lake-house-kitchen-traditional-kitchen-dallas-phvw-vp~2679566" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline">Hoegger Lake House Kitchen - Traditional Kitchen</a><br/><br/>
<a href="https://www.houzz.com/photos/lago-bungalow-kitchen-contemporary-kitchen-sacramento-phvw-vp~158903200" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline">Lago Bungalow Kitchen - Contemporary Kitchen</a><br/><br/>
<a href="https://www.houzz.com/photos/transitional-kitchen-transitional-kitchen-denver-phvw-vp~135912895" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline">Transitional Kitchen - Transitional Kitchen</a>`
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
    status: 'approved',
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
      '/assets/blog/pr7/color-board/Paint/Light/PR7-Paint-8.webp',
      '/assets/blog/pr7/color-board/Paint/Light/PR7-Paint-5.webp',
      '/assets/blog/pr7/color-board/Paint/Light/PR7-Paint-6.webp',
      '/assets/blog/pr7/color-board/Paint/Light/PR7-Paint-7.webp',
      '/assets/blog/pr7/color-board/Paint/PR7-Home-Example-2.webp',
      '/assets/blog/pr7/color-board/Paint/PR7-Home-Example.webp',
      '/assets/blog/pr7/color-board/Paint/Color-Idea.jpeg',
      '/assets/blog/pr7/color-board/Paint/Light/PR7-Paint-1.webp',
      '/assets/blog/pr7/color-board/Paint/Light/PR7-Paint-2.webp',
      '/assets/blog/pr7/color-board/Paint/Light/PR7-Paint-3.webp',
      '/assets/blog/pr7/color-board/Paint/Light/PR7-Paint-4.webp',
      '/assets/blog/pr7/color-board/Paint/PR7-Paint-Rust.webp',
      '/assets/blog/pr7/color-board/Paint/PR7-paint-1.webp',
      '/assets/blog/pr7/color-board/Paint/PR7-Paint-2.webp',
      '/assets/blog/pr7/color-board/Paint/PR7-Paint-3.webp',
      '/assets/blog/pr7/color-board/Paint/PR7-Paint-Green.webp',
      '/assets/blog/pr7/color-board/Paint/PR7-Paint-Green-Darker.webp',
      '/assets/blog/pr7/color-board/Paint/PR7-Paint-Green-Main.webp',
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

// Plumbing fixtures choices
const plumbingFixtureChoices: ColorChoice[] = [
  {
    id: 'kitchen-sink',
    title: 'Kitchen Sink - White Farmhouse Sink',
    description: 'Classic white farmhouse apron-front sink for the kitchen',
    deadline: 'August 7, 2025',
    status: 'approved',
    photos: [],
    notes: 'White farmhouse sink will complement the overall kitchen design with its classic, timeless appeal. Awaiting client decision.'
  }
];

// Categories to organize choices
const categories = [
  { name: "Cabinets", choices: cabinetChoices },
  { name: "Paint", choices: paintChoices },
  { name: "Flooring", choices: flooringChoices },
  { name: "Tile", choices: [] },
  { name: "Countertops", choices: [] },
  { name: "Plumbing Fixtures", choices: plumbingFixtureChoices },
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

          {/* Supplier Contact Information */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Supplier Contact Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Countertop Supplier */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                  <span>🪨</span>
                  <span>Countertops</span>
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="font-medium text-gray-900 dark:text-gray-100">Montana Stone Fabricators</div>
                  <div className="text-gray-600 dark:text-gray-400">
                    <a href="tel:+1-406-730-1567" className="text-blue-600 hover:text-blue-800 underline">
                      (406) 730-1567
                    </a>
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    <a href="https://maps.app.goo.gl/X2kYfmtvCqzHaM178" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">
                      View on Map
                    </a>
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    304 Antelope Trail, Whitefish, MT 59937
                  </div>
                </div>
              </div>


              {/* Paint Supplier 1 */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                  <span>🎨</span>
                  <span>Paint (Location 1)</span>
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="font-medium text-gray-900 dark:text-gray-100">Sherwin-Williams Paint Store</div>
                  <div className="text-gray-600 dark:text-gray-400">
                    <a href="tel:+1-406-752-5588" className="text-blue-600 hover:text-blue-800 underline">
                      (406) 752-5588
                    </a>
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    <a href="https://maps.app.goo.gl/a2ub8WwAQr6RWzU5A" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">
                      View on Map
                    </a>
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    53 1st Avenue East N, Kalispell, MT
                  </div>
                </div>
              </div>

              {/* Paint Supplier 2 */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                  <span>🎨</span>
                  <span>Paint (Location 2)</span>
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="font-medium text-gray-900 dark:text-gray-100">Sherwin-Williams Paint Store</div>
                  <div className="text-gray-600 dark:text-gray-400">Phone: TBD</div>
                  <div className="text-gray-600 dark:text-gray-400">
                    <a href="https://maps.app.goo.gl/gynMjJvYezjA4XxD7" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">
                      View on Map
                    </a>
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    430 Cascade Loop, Kalispell, MT 59901
                  </div>
                </div>
              </div>

              {/* Flooring Supplier 1 */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                  <span>🏗️</span>
                  <span>Flooring (Location 1)</span>
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="font-medium text-gray-900 dark:text-gray-100">Flooring America</div>
                  <div className="text-gray-600 dark:text-gray-400">
                    <a href="tel:+1-877-240-0478" className="text-blue-600 hover:text-blue-800 underline">
                      (877) 240-0478
                    </a>
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    <a href="https://maps.app.goo.gl/Ng74XeHxjQsKRyyi6" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">
                      View on Map
                    </a>
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    206 W Center St Ste A, Kalispell, MT 59901
                  </div>
                </div>
              </div>

              {/* Flooring Supplier 2 */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                  <span>🏗️</span>
                  <span>Flooring (Location 2)</span>
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="font-medium text-gray-900 dark:text-gray-100">Glacier Hardwoods LLC</div>
                  <div className="text-gray-600 dark:text-gray-400">
                    <a href="tel:+1-406-756-9515" className="text-blue-600 hover:text-blue-800 underline">
                      (406) 756-9515
                    </a>
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    <a href="https://maps.app.goo.gl/mDr3UvVXc6C4Bc5A9" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">
                      View on Map
                    </a>
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    216 Frontage Park, Kalispell, MT 59901
                  </div>
                  <div className="text-xs text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/30 rounded p-2 mt-2">
                    <strong>Note:</strong> Large size sample of Glacier - Cordalera available here
                  </div>
                </div>
              </div>

              {/* Tile Supplier 1 */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                  <span>🔲</span>
                  <span>Tile (Location 1)</span>
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="font-medium text-gray-900 dark:text-gray-100">Flooring America</div>
                  <div className="text-gray-600 dark:text-gray-400">
                    <a href="tel:+1-877-240-0478" className="text-blue-600 hover:text-blue-800 underline">
                      (877) 240-0478
                    </a>
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    <a href="https://maps.app.goo.gl/Ng74XeHxjQsKRyyi6" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">
                      View on Map
                    </a>
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    206 W Center St Ste A, Kalispell, MT 59901
                  </div>
                </div>
              </div>

              {/* Tile Supplier 2 */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                  <span>🔲</span>
                  <span>Tile (Location 2)</span>
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="font-medium text-gray-900 dark:text-gray-100">The Carpet Store</div>
                  <div className="text-gray-600 dark:text-gray-400">
                    <a href="tel:+1-406-755-0030" className="text-blue-600 hover:text-blue-800 underline">
                      (406) 755-0030
                    </a>
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    <a href="https://maps.app.goo.gl/LW3L9kuGfd6UzzgC8" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">
                      View on Map
                    </a>
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    525 W Idaho St, Kalispell, MT 59901
                  </div>
                  <div className="text-xs text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/30 rounded p-2 mt-2">
                    <strong>Note:</strong> Small wood floor sample is located here
                  </div>
                </div>
              </div>

              {/* Plumbing Fixtures Supplier */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                  <span>🚿</span>
                  <span>Plumbing Fixtures</span>
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="font-medium text-gray-600 dark:text-gray-400 italic">*COMING SOON*</div>
                  <div className="text-gray-600 dark:text-gray-400">Phone: TBD</div>
                  <div className="text-gray-600 dark:text-gray-400">Map: TBD</div>
                  <div className="text-gray-600 dark:text-gray-400">Address: TBD</div>
                </div>
              </div>

              {/* Light Fixtures Supplier */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                  <span>💡</span>
                  <span>Light Fixtures</span>
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="font-medium text-gray-600 dark:text-gray-400 italic">*COMING SOON*</div>
                  <div className="text-gray-600 dark:text-gray-400">Phone: TBD</div>
                  <div className="text-gray-600 dark:text-gray-400">Map: TBD</div>
                  <div className="text-gray-600 dark:text-gray-400">Address: TBD</div>
                </div>
              </div>
            </div>
          </div>

          {/* Project Calendar */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Project Timeline & Deadlines</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Upcoming Deadlines */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                  <span>📅</span>
                  <span>Upcoming Selection Deadlines</span>
                </h3>
                
                <div className="space-y-3">
                  {(() => {
                    // Extract all deadlines from choices
                    const allChoices = [...cabinetChoices, ...paintChoices, ...flooringChoices, ...plumbingFixtureChoices];
                    const deadlines = allChoices
                      .filter(choice => choice.status !== 'approved')
                      .map(choice => ({
                        title: choice.title,
                        date: choice.deadline,
                        status: choice.status,
                        id: choice.id
                      }))
                      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
                    
                    return deadlines.slice(0, 5).map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900 dark:text-gray-100">{item.title}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Due: {item.date}</div>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          item.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                          item.status === 'favored' ? 'bg-blue-100 text-blue-800' : 
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {item.status === 'pending' ? 'Pending' :
                           item.status === 'favored' ? 'Favored' : 'TBD'}
                        </div>
                      </div>
                    ));
                  })()}
                </div>
              </div>

              {/* Project Milestones */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                  <span>🏗️</span>
                  <span>Project Milestones</span>
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-gray-100">Interior Paint Application</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Estimated: September 1, 2025</div>
                    </div>
                    <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold">
                      Upcoming
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-gray-100">Cabinet Installation Start</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Estimated: September 15, 2025</div>
                    </div>
                    <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold">
                      Upcoming
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-gray-100">Flooring Installation</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Estimated: September 25, 2025</div>
                    </div>
                    <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold">
                      Upcoming
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-gray-100">Final Walkthrough</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Estimated: November 15, 2025</div>
                    </div>
                    <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                      Goal
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Calendar View */}
            <div className="mt-8 p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-lg">
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">August 2025</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">Selection deadline month</div>
                
                <div className="grid grid-cols-7 gap-1 text-center mb-2">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="p-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
                      {day}
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-7 gap-1">
                  {/* Calendar days - August 2025 */}
                  {(() => {
                    // Extract deadline days for August 2025 from all non-approved choices
                    const allChoices = [...cabinetChoices, ...paintChoices, ...flooringChoices, ...plumbingFixtureChoices];
                    const augustDeadlineDays = allChoices
                      .filter(choice => choice.status !== 'approved')
                      .map(choice => new Date(choice.deadline))
                      .filter(date => date.getMonth() === 7 && date.getFullYear() === 2025) // August 2025
                      .map(date => date.getDate());
                    
                    return Array.from({length: 31}, (_, i) => i + 1).map(day => {
                      const isDeadline = augustDeadlineDays.includes(day);
                    const today = new Date();
                    const isToday = today.getMonth() === 7 && today.getFullYear() === 2025 && day === today.getDate(); // August is month 7 (0-indexed)
                    
                    return (
                      <div key={day} className={`p-2 text-sm rounded ${
                        isToday ? 'bg-purple-600 text-white font-bold' :
                        isDeadline ? 'bg-red-100 text-red-800 font-semibold' :
                        'text-gray-700 dark:text-gray-300'
                      }`}>
                        {day}
                      </div>
                    );
                    });
                  })()}
                </div>
                
                <div className="flex justify-center gap-4 mt-4 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-purple-600 rounded"></div>
                    <span className="text-gray-600 dark:text-gray-400">Today</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-red-100 rounded"></div>
                    <span className="text-gray-600 dark:text-gray-400">Deadline</span>
                  </div>
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
                        <div 
                          className="text-gray-600 dark:text-gray-300 leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: selectedChoice.notes }}
                        />
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