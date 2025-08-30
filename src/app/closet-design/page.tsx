'use client';

import Container from "@/app/components/container";
import Header from "@/app/components/header";
import Link from "next/link";

interface ClosetDesign {
  id: string;
  title: string;
  description: string;
  notes?: string;
  link?: string;
  photos: string[];
}

// Closet designs by room
const masterBedroomCloset: ClosetDesign = {
  id: 'master-bedroom-closet',
  title: 'Master Bedroom Closet',
  description: 'IKEA PAX closet system design for the master bedroom with customized storage solutions.',
  photos: [
    '/assets/blog/pr7/color-board/Closets/Master.png',
    '/assets/blog/pr7/color-board/Closets/Master-1.png'
  ],
  link: 'https://www.ikea.com/addon-app/storageone/pax/web/latest/us/en/?storeId=488&vpcSource=clipboard#/vpc/WFVSCT',
  notes: 'Customized IKEA PAX system designed to maximize storage efficiency while maintaining the clean, minimalist aesthetic of the master bedroom.'
};

const guestOfficeCloset: ClosetDesign = {
  id: 'guest-office-closet',
  title: 'Guest (Office) Closet',
  description: 'Dual-purpose closet design for the guest bedroom that doubles as an office space.',
  photos: [
    '/assets/blog/pr7/color-board/Closets/Guest-Office.png'
  ],
  link: 'https://www.ikea.com/addon-app/storageone/pax/web/latest/us/en/?storeId=488&vpcSource=clipboard#/vpc/WFVYBF',
  notes: 'Designed to accommodate both guest clothing storage and office supplies/equipment storage.'
};

const guest2Closet: ClosetDesign = {
  id: 'guest-2-closet',
  title: 'Guest 2 Closet',
  description: 'Closet design for the second guest bedroom with efficient storage solutions.',
  photos: [
    '/assets/blog/pr7/color-board/Closets/Guest-2.png'
  ],
  link: 'https://www.ikea.com/addon-app/storageone/pax/web/latest/us/en/?storeId=488&vpcSource=clipboard#/vpc/WFW65S',
  notes: 'Optimized for guest bedroom storage needs with hanging space and shelving.'
};

const guest3Closet: ClosetDesign = {
  id: 'guest-3-closet',
  title: 'Guest 3 Closet',
  description: 'Closet design for the third guest bedroom with practical storage layout.',
  photos: [
    '/assets/blog/pr7/color-board/Closets/Guest-3.png'
  ],
  link: 'https://www.ikea.com/addon-app/storageone/pax/web/latest/us/en/?storeId=488&vpcSource=clipboard#/vpc/WFW3ST',
  notes: 'Functional storage design suitable for guest bedroom requirements.'
};

const closetSections = [
  { design: masterBedroomCloset, icon: '👑' },
  { design: guestOfficeCloset, icon: '🏢' },
  { design: guest2Closet, icon: '🛏️' },
  { design: guest3Closet, icon: '🛏️' }
];

export default function ClosetDesign() {
  const renderClosetSection = (design: ClosetDesign, icon: string) => (
    <div key={design.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
      <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-600 dark:to-gray-500 flex items-center justify-center">
        {design.photos.length > 0 ? (
          <img 
            src={design.photos[0]} 
            alt={design.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-center">
            <div className="text-4xl mb-2">{icon}</div>
            <div className="text-lg font-semibold text-gray-600 dark:text-gray-300">Design Coming Soon</div>
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          {design.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
          {design.description}
        </p>
        
        {design.notes && (
          <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg p-3 mb-4">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              {design.notes}
            </p>
          </div>
        )}
        
        {design.link && (
          <div>
            <a 
              href={design.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors"
            >
              View Design
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <main>
      <Container>
        <Header />
        <div className="mb-32">
          {/* Header */}
          <div className="text-center py-8 px-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl mb-12">
            <div className="inline-block bg-indigo-900 dark:bg-indigo-800 text-white px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider mb-4">
              Closet Design
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100 mb-4 leading-tight">
              Porter Ranch 7 Closet Designs
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Custom closet storage solutions for every bedroom
            </p>
          </div>

          {/* Back to Color Choices */}
          <div className="mb-8">
            <Link 
              href="/color-choices" 
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
            >
              ← Back to Color Choices
            </Link>
          </div>

          {/* Closet Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {closetSections.map(({ design, icon }) => renderClosetSection(design, icon))}
          </div>

          {/* Design Notes */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 mt-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Design Philosophy</h2>
            
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                <strong>Scandinavian Minimalism:</strong> All closet designs follow the home's modern Scandinavian aesthetic with clean lines, functional storage, and uncluttered organization systems.
              </p>
              
              <p>
                <strong>Customization:</strong> Each closet is tailored to the specific needs of its room while maintaining design consistency throughout the home.
              </p>
              
              <p>
                <strong>IKEA PAX Modularity:</strong> The PAX system offers incredible flexibility - you can easily order additional shelves, drawers, or accessories to customize your closets as your storage needs change over time. The modular design makes it simple to reconfigure and expand your storage solutions.
              </p>
              
              <p>
                <strong>Easy Ordering:</strong> Need more storage? Visit the <a href="https://www.ikea.com/us/en/cat/pax-system-19086/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">IKEA PAX System page</a> to browse and order additional components, shelves, drawers, and accessories to expand or modify your closet designs.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}