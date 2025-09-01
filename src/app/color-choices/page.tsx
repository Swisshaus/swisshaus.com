'use client';

import Container from "@/app/components/container";
import Header from "@/app/components/header";
import { useState } from "react";
import { useLightbox } from '../contexts/LightboxContext';
import Link from "next/link";

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
      '/assets/blog/pr7/color-board/Cabinets/PR7-Cabinet-Elevations_Kitchen-Island.jpg',
      '/assets/blog/pr7/Scandinavian/pr7-CB-Scandanavian-11.jpg',
      '/assets/blog/pr7/Scandinavian/pr7-CB-Scandanavian-14.jpg',
      '/assets/blog/pr7/color-board/pr7-CB-Option-B-1.jpg',
      '/assets/blog/pr7/color-board/Cabinets/PR7-Cabinet-Elevations_Kitchen-Sink.jpg',
      '/assets/blog/pr7/color-board/Cabinets/PR7-Cabinet-Elevations_Kitchen-Range.jpg',
      '/assets/blog/pr7/color-board/Cabinets/PR7-Cabinet-Elevations_Butler-Pantry.jpg',
      '/assets/blog/pr7/color-board/Cabinets/PR7-Cabinet-Elevations_Master-Bath.jpg',
      '/assets/blog/pr7/color-board/Cabinets/PR7-Cabinet-Elevations_Bath-2.jpg',
      '/assets/blog/pr7/color-board/Cabinets/PR7-Cabinet-Elevations_Bath-3.jpg',
      '/assets/blog/pr7/color-board/Cabinets/PR7-Cabinet-Elevations_Powder.jpg',
      '/assets/blog/pr7/color-board/Cabinets/PR7-Cabinet-Elevations_Laundry.jpg'
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
      '/assets/blog/pr7/color-board/Cabinets/PR7-Cabinet-Elevations_Kitchen-Range.jpg'
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
    description: 'Exterior Paint for the main siding, as well as the Board and Batten Bump-outs',
    deadline: 'August 21, 2025',
    status: 'approved',
    photos: [
      '/assets/blog/pr7/color-board/Paint/Finals/PR7-Creme-InTheNavy.jpg',
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
    notes: 'Selected colors: Body - Creme SW 7556, Accent - In the Navy SW 9178. This elegant color combination features a warm, creamy base with sophisticated navy accents that complement the rusted Corten roofing. The contrast between the light body color and dark navy accents creates visual interest while maintaining a timeless, classic appearance.'
  },
  {
    id: 'exterior-paint-board-batten',
    title: 'Exterior Paint - Board & Batton - Bump Out',
    description: '',
    deadline: 'August 21, 2025',
    status: 'approved',
    photos: [
      '/assets/blog/pr7/color-board/Paint/Finals/PR7-Creme-InTheNavy.jpg',
      '/assets/blog/pr7/color-board/Paint/PR7-Paint-Rust.webp',
      '/assets/blog/pr7/color-board/Paint/PR7-Home-Example.webp',
      '/assets/blog/pr7/color-board/Paint/PR7-Home-Example-2.webp'
    ],
    notes: 'The board and batten bump-out sections will feature In The Navy SW 9178 as the accent color, creating a sophisticated contrast with the main Creme SW 7556 lap siding. This deep navy color provides elegant definition to the architectural features while maintaining harmony with the overall exterior color palette.'
  },
  {
    id: 'rough-sawn-post-beam-stain',
    title: 'Rough Sawn Post & Beam Stain',
    description: 'Semi-transparent stain for exposed rough sawn wood elements including posts and beams throughout the home.',
    deadline: 'August 21, 2025',
    status: 'approved',
    photos: [],
    notes: `<strong>APPROVED SELECTION:</strong> Baja Beige SW 3509 Semi-Transparent Stain - Woodscapes<br/><br/>

<strong>Product Details:</strong><br/>
• Color: Baja Beige SW 3509<br/>
• Type: Semi-Transparent Stain<br/>
• Product Line: Sherwin Williams Woodscapes<br/>
• Application: Rough sawn posts and beams<br/>
• Finish: Semi-transparent allows wood grain to show through<br/><br/>

<strong>Coverage Areas:</strong><br/>
• Exposed interior rough sawn posts<br/>
• Decorative ceiling beams<br/>
• Structural timber elements<br/>
• Accent wood features<br/><br/>

<strong>Benefits:</strong><br/>
• Enhances natural wood grain and texture<br/>
• Provides protection while maintaining rustic appearance<br/>
• Complements the overall Scandinavian design aesthetic<br/>
• Coordinates with exterior and interior color palette`
  }
];

// Flooring choices
const flooringChoices: ColorChoice[] = [
  {
    id: 'flooring-glacier',
    title: 'Flooring - Glacier',
    description: '• <strong>Construction:</strong> Engineered 6 Ply Core<br/>• <strong>Length:</strong> Random Length up to 72"<br/>• <strong>Width:</strong> 7.5"<br/>• <strong>Species:</strong> European Oak<br/>• <strong>Texture:</strong> Wirebrush<br/>• <strong>Finish:</strong> UV Cured Finish<br/>• <strong>Gloss:</strong> Matte<br/>• <strong>Warranty:</strong> 20 Year Limited Residential',
    deadline: 'August 22, 2025',
    status: 'approved',
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
    notes: 'APPROVED SELECTION: The Cordalera - Lake, Glacier. This flooring option provides excellent durability and matches the Scandinavian aesthetic perfectly with its clean, minimalist appearance.'
  }
];

// Plumbing fixtures choices
const plumbingFixtureChoices: ColorChoice[] = [
  {
    id: 'kitchen-sink',
    title: 'Kitchen Sink - White Farmhouse Sink',
    description: 'Classic white farmhouse apron-front sink for the kitchen with copper faucet',
    deadline: 'August 7, 2025',
    status: 'approved',
    photos: [
      '/assets/blog/pr7/color-board/plumbing-fixtures/white-farmhouse-sink.png'
    ],
    notes: 'White farmhouse sink will complement the overall kitchen design with its classic, timeless appeal. The apron-front design creates a beautiful focal point, and the copper faucet adds warmth that coordinates with the honey-walnut cabinet finishes.'
  },
  {
    id: 'bathroom-vanity-sink',
    title: 'Bathroom Vanity Sink - Kohler Ladena White',
    description: 'Kohler Ladena 22-7/8" Undermount Bathroom Sink with Overflow in White. Premium undermount design for a clean, seamless look.',
    deadline: 'August 15, 2025',
    status: 'approved',
    photos: [
      '/assets/blog/pr7/color-board/plumbing-fixtures/kohler-ladena-sink.png'
    ],
    notes: `<strong>Product Details:</strong><br/>
• Model: Kohler K-2215<br/>
• Size: 22-7/8" undermount design<br/>
• Color: White<br/>
• Features: Includes overflow<br/>
• Warranty: One-year limited warranty<br/><br/>

<strong>Product Link:</strong><br/>
<a href="https://www.build.com/kohler-k-2215/s560199?uid=220878" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline">View on Build.com</a><br/><br/>

<strong>Design Notes:</strong> The undermount design provides a clean, seamless look that complements modern bathroom vanities. The overflow feature prevents water damage from accidental overfilling. The white finish coordinates perfectly with the approved Designer White cabinetry.`
  },
  {
    id: 'master-bath-tub',
    title: 'Master Bath Tub - Altair Ryder Freestanding',
    description: 'Altair Ryder 69" Free Standing Solid Surface Soaking Tub in Matte White. Modern oval design with ergonomic slope.',
    deadline: 'August 20, 2025',
    status: 'approved',
    photos: [
      '/assets/blog/pr7/color-board/plumbing-fixtures/altair-ryder-tub.png'
    ],
    notes: `<strong>Product Details:</strong><br/>
• Model: Altair 53369-BAT-MW<br/>
• Dimensions: 68.9" L x 29.5" W x 21.6" H<br/>
• Material: Solid Surface<br/>
• Color: Matte White<br/>
• Weight: 293.2 lbs<br/>
• Water Capacity: 95 gallons<br/>
• Water Depth: 14.2 inches<br/>
• Configuration: Free standing with center drain<br/>
• Warranty: 1-year limited warranty<br/><br/>

<strong>Product Link:</strong><br/>
<a href="https://www.build.com/altair-53369-bat/s2047933?uid=4919913" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline">View on Build.com</a><br/><br/>

<strong>Design Notes:</strong> Same material soaking tub as the one you saw in PR5 - extra long 69" for taller users - symetrical for space. Still very heavy(good thing!) and will retain heat nicely.`
  },
  {
    id: 'bath-mirrors',
    title: 'Bath Mirrors',
    description: 'Mirror selections for bathroom vanities throughout the home',
    deadline: 'September 20, 2025',
    status: 'pending',
    photos: [],
    notes: 'Mirror selections will complement the modern design aesthetic and coordinate with the approved vanity and lighting choices.'
  }
];

// Tile choices
const tileChoices: ColorChoice[] = [
  {
    id: 'tile-selection',
    title: 'Tile Selection',
    description: 'Sample sourced from Flooring America. Sample pictured: The Masonry Center - Union in Platinum White',
    deadline: 'August 25, 2025',
    status: 'approved',
    photos: [
      '/assets/blog/pr7/color-board/pr7-CB-Nordic.jpg',
      '/assets/blog/pr7/color-board/pr7-CB-Door-3.jpg'
    ],
    notes: `<strong>APPROVED SELECTION:</strong> The Masonry Center - Union, Platinum White<br/><br/>

<strong>Supplier Information:</strong><br/>
<a href="https://maps.app.goo.gl/Ng74XeHxjQsKRyyi6" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline">Flooring America - 206 W Center St Ste A, Kalispell, MT 59901</a><br/>
Phone: <a href="tel:+1-877-240-0478" class="text-blue-600 hover:text-blue-800 underline">(877) 240-0478</a><br/><br/>

<strong>Product Details:</strong><br/>
• Collection: The Masonry Center<br/>
• Style: Union<br/>
• Color: Platinum White<br/><br/>

<strong>Product Link:</strong><br/>
<a href="https://masonrycenter.com/products/union-un01" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline">View Union Collection on Masonry Center</a>`
  }
];

// Door Hardware choices
const doorHardwareChoices: ColorChoice[] = [
  {
    id: 'door-hardware-schlage-latitude',
    title: 'Door Hardware - Schlage Latitude Privacy Lever Set',
    description: 'Schlage Latitude Privacy Door Lever Set, F40LAT622, Matte Black',
    deadline: 'September 15, 2025',
    status: 'approved',
    photos: [
      '/assets/blog/pr7/color-board/plumbing-fixtures/schlagehandle.png'
    ],
    notes: `Per our discussion about finding off-kilter door hardware a nuisance, these round faceplate door handles might be what you prefer. The square handle keeps in line with the design aesthetics of the more modern/minimalist home.<br/><br/>

<strong>Product Link:</strong><br/>
<a href="https://www.build.com/schlage-f40-lat/s506329?uid=2543055" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline">View on Build.com</a>`
  }
];

// Upgrade choices
const upgradeChoices: ColorChoice[] = [
  {
    id: 'backup-generator',
    title: '26KW Backup Generator by Generac',
    description: 'Whole house backup generator system providing reliable power during outages. Automatic transfer switch included for seamless operation.',
    deadline: 'July 15, 2025',
    status: 'approved',
    photos: [
      '/assets/blog/pr7/color-board/Upgrades/generac.avif'
    ],
    notes: `<strong>Generator Specifications:</strong><br/>
• Model: Generac 26KW Standby Generator<br/>
• Fuel Type: Natural Gas or Propane<br/>
• Coverage: Whole House<br/>
• Transfer Switch: Automatic<br/>
• Warranty: 10-year limited warranty<br/><br/>

<strong>Installation Includes:</strong><br/>
• Generator unit and concrete pad<br/>
• Automatic transfer switch<br/>
• Gas line connection <br/>
• Electrical connections<br/>
• Professional installation and setup<br/><br/>

<strong>Benefits:</strong><br/>
• Uninterrupted power during outages<br/>
• Automatic operation - starts within seconds<br/>
• Protects home systems and appliances<br/>
• Increases home value and peace of mind<br/><br/>

<strong>Installation Partner:</strong><br/>
<a href="https://heatonelectric.com" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline">Heaton Electric - Professional Generator Installation</a>`
  },
  {
    id: 'gutters',
    title: 'Gutters - Front Porch & Garage',
    description: 'Professional gutter installation for front porch roof line and above garage doors. One downspout at front porch, Two downspouts at garage. Seamless aluminum gutters with matching downspouts. Pending Estimate from South Mountain Seamless Gutters.',
    deadline: 'September 15, 2025',
    status: 'pending',
    photos: [
      '/assets/blog/pr7/pr7-siding.jpg'
    ],
    notes: `<strong>Bid 1 - Hangtime Gutters:</strong><br/>
• Price: $1,665.00<br/><br/>

<strong>Bid 2 - South Mountain Seamless Gutters:</strong><br/>
• Status: Pending Estimate`
  },
  {
    id: 'landscape-package',
    title: 'Landscape Package',
    description: 'Professional landscape design and installation package to complement the home\'s architecture and enhance curb appeal.',
    deadline: 'November 1, 2025',
    status: 'pending',
    photos: [],
    notes: `<strong>Landscape Package Includes:</strong><br/>
• Professional landscape design consultation<br/>
• Front yard foundation plantings<br/>
• Driveway and walkway borders<br/>
• Lawn preparation and seeding/sodding<br/>
• Irrigation system installation<br/><br/>

<strong>Plant Selection:</strong><br/>
• Native Montana plants for sustainability<br/>
• Low-maintenance perennials and shrubs<br/>
• Seasonal color with annual flower beds<br/>
• Evergreen trees for year-round structure<br/><br/>

<strong>Timeline:</strong><br/>
• Design consultation: After interior completion<br/>
• Installation: Spring following construction<br/>
• Includes one-year plant warranty and care instructions<br/>
• Complements the Scandinavian exterior aesthetic`
  },
  {
    id: 'back-porch-board-batten',
    title: 'Back Porch Board & Batten - Accent Color',
    description: 'Board and batten siding upgrade for the back porch area using the accent color to create visual continuity with the front bump-outs. - No Charge',
    deadline: 'October 15, 2025',
    status: 'approved',
    photos: [
      '/assets/blog/pr7/color-board/Paint/Finals/PR7-Creme-InTheNavy.jpg'
    ],
    notes: `<strong>Upgrade Details:</strong><br/>
• Siding Type: Board and Batten<br/>
• Color: In The Navy SW 9178 (accent color)<br/>
• Location: Back porch Board and Batten Material<br/>
• Material: Matching existing siding material<br/><br/>

<strong>Design Benefits:</strong><br/>
• Creates visual continuity with front board and batten bump-outs<br/>
• Adds architectural interest to the rear elevation<br/>
• Maintains consistent accent color throughout the home<br/>
• Enhances the overall design cohesion<br/><br/>


`
  },
  {
    id: 'heated-towel-bars',
    title: 'Heated Towel Bars',
    description: 'Amba Jeeves heated towel warmers for master and guest bathrooms. Premium stainless steel construction with self-regulating heating technology.',
    deadline: 'October 1, 2025',
    status: 'approved',
    photos: [
      'https://s3.img-b.com/image/private/t_base,c_lpad,f_auto,dpr_auto,w_450,h_450/product/amba/amba-dsb-3267633.jpg'
    ],
    notes: `<strong>Master Bathroom - Amba Jeeves D Straight:</strong><br/>
• Model: DS-20 with 20 horizontal bars<br/>
• Dimensions: 21-1/4" W x 53-3/4" H x 4-1/2" D<br/>
• Power: 240 Watts, 115V, hardwired<br/>
• Capacity: Accommodates 4 towels<br/>
• Price: $1,428.80 (was $1,504.00)<br/>
<a href="https://www.build.com/amba-ds-20/s893223?uid=2259527" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline">View Master Bathroom Option</a><br/><br/>

<strong>2 Guest Bedrooms - Amba Jeeves J Straight:</strong><br/>
• Model: JS-20 with 6 horizontal bars<br/>
• Dimensions: 21-1/4" W x 31-3/4" H x 4-1/2" D<br/>
• Power: 60 Watts, 115V, hardwired<br/>
• Compact design perfect for guest bathrooms<br/>
• Price: $714.40 each (was $752.00)<br/>
<a href="https://www.build.com/amba-js-20/s893238?uid=2259577" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline">View Guest Bathroom Option</a><br/><br/>

<strong>Shared Features:</strong><br/>
• 100% recyclable 304 stainless steel construction<br/>
• Self-regulating heating technology with safety cutoff<br/>
• Helps prevent bathroom mold and mildew<br/>
• 10-year limited manufacturer warranty<br/>
• Available finishes: Brushed, Matte Black, Oil Rubbed Bronze, Polished, White<br/><br/>

<strong>Benefits:</strong><br/>
• Luxury spa-like experience with warm towels<br/>
• Reduces bathroom humidity and prevents mold<br/>
• Energy efficient heating technology<br/>
• Adds modern elegance to bathroom design`
  },
  {
    id: 'water-filtration-install',
    title: 'Install Home Owner Supplied Whole House Water Filtration',
    description: 'Coming soon',
    deadline: 'September 15, 2025',
    status: 'pending',
    photos: [],
    notes: 'Installation details coming soon'
  },
  {
    id: 'phyn-smart-water-assistant',
    title: 'Phyn Plus Smart Water Assistant + Shutoff',
    description: 'Advanced smart water monitoring system with automatic leak detection and shutoff capabilities.',
    deadline: 'September 15, 2025',
    status: 'pending',
    photos: [
      'https://phyn.com/cdn/shop/files/phyn-shut-off-valves-phypf007-c3_1000px.jpg?v=1703179928&width=1000'
    ],
    notes: `<strong>Phyn Plus Smart Water Assistant + Shutoff (2nd Gen)</strong><br/><br/>

<strong>Key Features:</strong><br/>
• Auto Shutoff - Automatically stops water flow when leaks detected<br/>
• Plumbing Checks - Continuous monitoring of plumbing health<br/>
• Remote Shutoff - Control water from anywhere via smartphone<br/>
• Leak Alerts - Instant notifications the second a leak is detected<br/>
• Multi-Property Monitoring - Manage multiple properties from one app<br/>
• Pre-Freeze Warnings - Alerts before pipes freeze<br/>
• Water Use Tracking - Monitor consumption and identify waste<br/><br/>

<strong>Technology:</strong><br/>
Uses patented high-definition pressure wave analysis to detect leaks instantly and prevent costly water damage through automatic shutoff.<br/><br/>

<strong>Product Link:</strong><br/>
<a href="https://phyn.com/products/phyn-plus-smart-water-assistant-shutoff-v2" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline">View on Phyn.com</a>`
  },
  {
    id: 'garage-floor-coating',
    title: 'Garage Floor Coating - Polyurea',
    description: 'Coming soon',
    deadline: 'September 30, 2025',
    status: 'pending',
    photos: [],
    notes: 'Details coming soon'
  }
];

// Light Fixtures choices
const lightFixtureChoices: ColorChoice[] = [
  {
    id: 'exterior-lights-gooseneck',
    title: 'Garage Sconces',
    description: 'Gardena Indoor & Outdoor Barn Light, 16" Gooseneck Arm, Navy Blue (White Interior)',
    deadline: 'September 8, 2025',
    status: 'approved',
    photos: [
      'https://steellightingco.com/wp-content/uploads/2024/07/S16-25-30E-25-GB04-25-BP12-25.28.png'
    ],
    notes: `Very nice American made 16" gooseneck sconce. The blue color would add to the bump-out paint color accent bringing the whole color scheme together even more.<br/><br/>

<strong>Product Link:</strong><br/>
<a href="https://steellightingco.com/product/gardena-indoor-outdoor-barn-light-handcrafted-light-fixture/" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline">View on Steel Lighting Co.</a>`
  },
  {
    id: 'back-front-porch-sconces',
    title: 'Back and Front Porch Sconces',
    description: 'Hawthorne Modern Wall Sconce, 11" Straight Arm, Navy Blue (White Interior)',
    deadline: 'September 8, 2025',
    status: 'approved',
    photos: [
      'https://steellightingco.com/wp-content/uploads/2024/07/S08-26-30E-25-ST11-25-BP12-25.60.png'
    ],
    notes: `<strong>Product Link:</strong><br/>
<a href="https://steellightingco.com/product/hawthorne-modern-wall-sconce-gooseneck-or-straight-arm-light/" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline">View on Steel Lighting Co.</a>`
  },
  {
    id: 'ceiling-fan',
    title: 'Ceiling Fan',
    description: 'Ceiling fan selections for bedrooms and living areas',
    deadline: 'September 8, 2025',
    status: 'pending',
    photos: [
      'https://s3.img-b.com/image/private/t_base,c_lpad,f_auto,dpr_auto,w_450,h_450/product/minkaaire/f524-cl.jpg'
    ],
    notes: `<strong>Option 1 - Westinghouse:</strong><br/>
<a href="https://www.build.com/westinghouse-7800300/s988500?uid=2437325&searchId=wtqamCToho" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline">View on Build.com</a><br/><br/>

<strong>Option 2 - Minka Aire Roto:</strong><br/>
<a href="https://www.build.com/minkaaire-roto/s959054?uid=3540266" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline">View on Build.com</a>`
  },
  {
    id: 'ceiling-fan-living-room',
    title: 'Ceiling Fan - Living Room',
    description: 'Ceiling fan selection for the living room area',
    deadline: 'September 8, 2025',
    status: 'pending',
    photos: [
      'https://s3.img-b.com/image/private/t_base,c_lpad,f_auto,dpr_auto,w_450,h_450/product/minkaaire/f524-cl.jpg'
    ],
    notes: `<strong>Product Link:</strong><br/>
<a href="https://www.build.com/minkaaire-roto-xl/s1225735?uid=4000246" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline">View on Build.com</a>`
  },
  {
    id: 'bathroom-vanity-lights',
    title: 'Bathroom Vanity Lights',
    description: 'Vanity lighting fixtures for all bathroom mirrors',
    deadline: 'September 8, 2025',
    status: 'pending',
    photos: [
      'https://steellightingco.com/wp-content/uploads/2024/07/S88-1M-30E-1M-VT18-1M-PRO8-1M-BP12-1M.png'
    ],
    notes: `<strong>Option 1 - Minka Lavery Auresa:</strong><br/>
<a href="https://www.build.com/minka-lavery-2792/s1852794?uid=4544069&searchId=4WB8g1sMsm" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline">View on Build.com</a><br/><br/>

<strong>Option 2 - Steel Lighting Co. Modern Vanity Light:</strong><br/>
<a href="https://steellightingco.com/product/small-modern-kitchen-sink-light-contemporary-vanity/?attribute_pa_color=matte-black&attribute_pa_interior-color=white&attribute_pa_mounting-style=20-5-width&attribute_pa_mpn=400000001421" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline">View on Steel Lighting Co.</a>`
  },
  {
    id: 'master-tub-chandelier',
    title: 'Master Tub Chandelier',
    description: 'Steel Lighting Co. Brentwood chandelier in Navy Blue exterior with white interior for the master bathroom tub area',
    deadline: 'September 8, 2025',
    status: 'pending',
    photos: [
      'https://steellightingco.com/wp-content/uploads/2023/10/B14-1M-30A-1M-PC48-01-CN01-1M-resized.png'
    ],
    notes: `Navy Blue exterior with white interior configuration.<br/><br/>

<strong>Product Link:</strong><br/>
<a href="https://steellightingco.com/product/brentwood-steel-ceiling-light-modern-farmhouse-kitchen-island-light/?attribute_pa_color=hunter-green&attribute_pa_interior-color=hunter-green&attribute_pa_mounting-style=4-ft-black-cord" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline">View on Steel Lighting Co.</a>`
  },
  {
    id: 'dining-room-chandelier',
    title: 'Dining Room Chandelier',
    description: 'Statement chandelier for the dining room',
    deadline: 'September 8, 2025',
    status: 'pending',
    photos: [
      'https://steellightingco.com/wp-content/uploads/2024/08/B24-1M-30A-1M-PC48-01-CN01-1M-resized.png',
      'https://s3.img-b.com/image/private/t_base,c_lpad,f_auto,dpr_auto,w_450,h_450/product/millenniumlighting/millennium-lighting-99005-mb-8134424.jpg'
    ],
    notes: `<strong>Option 1 - Millennium Lighting Warhol:</strong><br/>
<a href="https://www.build.com/millennium-lighting-99005/s1978052?uid=4692373&searchId=RgQ2Q4u6xJ" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline">View on Build.com</a><br/><br/>

<strong>Option 2 - Steel Lighting Co. Large Bowl Pendant (Navy Blue with White Interior):</strong><br/>
<a href="https://steellightingco.com/product/modern-farmhouse-kitchen-island-light-large-bowl-pendant/?attribute_pa_color=matte-black&attribute_pa_interior-color=white&attribute_pa_mounting-style=4-ft-black-cord&attribute_pa_mpn=400000001500" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline">View on Steel Lighting Co.</a>`
  },
  {
    id: 'kitchen-pendants',
    title: 'Kitchen Pendants',
    description: 'Steel Lighting Co. pendant lights in Navy Blue finish. American-made farmhouse pendant lights perfect for kitchen islands.',
    deadline: 'September 8, 2025',
    status: 'pending',
    photos: [
      'https://steellightingco.com/wp-content/uploads/2024/07/S08-14-30A-14-PC48-01-CN01-1M.png',
      'https://steellightingco.com/wp-content/uploads/2024/07/L08-1M-30A-1M-PC48-01-CN01-1M-1.png'
    ],
    notes: `Both options in Navy Blue finish.<br/><br/>

<strong>Option 1 - Inglewood:</strong><br/>
<a href="https://steellightingco.com/product/inglewood-small-industrial-steel-light-island-or-entryway-pendant/?attribute_pa_color=cream&attribute_pa_interior-color=cream&attribute_pa_mounting-style=4-ft-black-cord&attribute_pa_mpn=400000001401" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline">View Inglewood on Steel Lighting Co.</a><br/><br/>

<strong>Option 2 - Laurel:</strong><br/>
<a href="https://steellightingco.com/product/laurel-kitchen-island-or-sink-pendant-small-modern-ceiling-light/?attribute_pa_color=matte-black&attribute_pa_interior-color=white&attribute_pa_mounting-style=4-ft-black-cord&attribute_pa_mpn=400000001419" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline">View Laurel on Steel Lighting Co.</a>`
  }
];

// Countertop choices
const countertopChoices: ColorChoice[] = [
  {
    id: 'countertop-selection',
    title: 'Countertops',
    description: 'Countertop selections for kitchen and bathroom areas',
    deadline: 'September 7, 2025',
    status: 'pending',
    photos: [
      '/assets/blog/pr7/color-board/pr7-CB-Option-A.png'
    ],
    notes: 'Countertop selections to complement the approved cabinet finishes and overall design aesthetic.'
  }
];

// Closet Design choices
const closetDesignChoices: ColorChoice[] = [
  {
    id: 'closet-design',
    title: 'Closet Design',
    description: 'Custom closet storage solutions for all bedrooms including master, guest office, and guest bedrooms.',
    deadline: 'September 5, 2025',
    status: 'pending',
    photos: [
      '/assets/blog/pr7/color-board/Closets/Master.png'
    ],
    notes: `Custom closet designs for all bedrooms:<br/>
• Master Bedroom Closet<br/>
• Guest (Office) Closet<br/>
• Guest 2 Closet<br/>
• Guest 3 Closet<br/><br/>

<strong>View Detailed Designs:</strong><br/>
<a href="/closet-design" class="text-blue-600 hover:text-blue-800 underline">View Closet Design Page</a>`
  }
];

// Categories to organize choices
const categories = [
  { name: "Cabinets", choices: cabinetChoices },
  { name: "Paint", choices: paintChoices },
  { name: "Flooring", choices: flooringChoices },
  { name: "Tile", choices: tileChoices },
  { name: "Countertops", choices: countertopChoices },
  { name: "Door Hardware", choices: doorHardwareChoices },
  { name: "Plumbing Fixtures", choices: plumbingFixtureChoices },
  { name: "Light Fixtures", choices: lightFixtureChoices },
  { name: "Closet Design", choices: closetDesignChoices },
  { name: "Upgrades", choices: upgradeChoices }
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
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
              Track your selections, deadlines, and approvals in one place
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/project-timeline"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
              >
                📊 View GANTT Chart
              </Link>
              <Link 
                href="/closet-design"
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
              >
                🗂️ Closet Design
              </Link>
              <Link 
                href="/posts/pr7"
                className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
              >
                📝 PR7 Main Page
              </Link>
            </div>
          </div>

          {/* Upcoming Deadlines - Urgent Section */}
          {/* 
          <div className="mb-12 p-8 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border-2 border-red-200 dark:border-red-700 rounded-xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">⚠️</span>
              <h2 className="text-3xl font-bold text-red-800 dark:text-red-200">Upcoming Deadlines</h2>
            </div>
            <p className="text-red-700 dark:text-red-300 mb-6 text-lg">
              These selections need immediate attention to stay on schedule:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

            </div>
          </div>
          */}

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
          {/* <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Project Timeline & Deadlines</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Upcoming Deadlines */}
              {/* <div>
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
              {/* <div>
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
            {/* <div className="mt-8 p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-lg">
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
                  {/* {(() => {
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
          </div> */}
        </div>

        {/* Vertical GANTT Chart */}
        {/* <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2">
            <span>📊</span>
            <span>Project Timeline - GANTT Chart</span>
          </h2>
          
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              {/* Timeline Header */}
              {/* <div className="flex mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
                <div className="w-48 md:w-64 flex-shrink-0">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-xs md:text-sm">Tasks & Milestones</h3>
                </div>
                <div className="flex-1 min-w-0">
                  {/* Month Headers */}
                  {/* <div className="flex mb-2 text-center">
                    <div className="flex-1 text-xs font-semibold text-gray-600 dark:text-gray-400 border-r border-gray-300 dark:border-gray-600">August 2025</div>
                    <div className="flex-1 text-xs font-semibold text-gray-600 dark:text-gray-400 border-r border-gray-300 dark:border-gray-600">September</div>
                    <div className="flex-1 text-xs font-semibold text-gray-600 dark:text-gray-400 border-r border-gray-300 dark:border-gray-600">October</div>
                    <div className="flex-1 text-xs font-semibold text-gray-600 dark:text-gray-400 border-r border-gray-300 dark:border-gray-600">November</div>
                    <div className="flex-1 text-xs font-semibold text-gray-600 dark:text-gray-400">December</div>
                  </div>
                  {/* Week Headers */}
                  {/* <div className="flex text-center">
                    {/* August weeks */}
                    {/* <div className="flex-1 grid grid-cols-4 gap-px">
                      <div className="text-xs text-gray-500 dark:text-gray-400">W1</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">W2</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">W3</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">W4</div>
                    </div>
                    {/* September weeks */}
                    {/* <div className="flex-1 grid grid-cols-4 gap-px">
                      <div className="text-xs text-gray-500 dark:text-gray-400">W1</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">W2</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">W3</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">W4</div>
                    </div>
                    {/* October weeks */}
                    {/* <div className="flex-1 grid grid-cols-4 gap-px">
                      <div className="text-xs text-gray-500 dark:text-gray-400">W1</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">W2</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">W3</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">W4</div>
                    </div>
                    {/* November weeks */}
                    {/* <div className="flex-1 grid grid-cols-4 gap-px">
                      <div className="text-xs text-gray-500 dark:text-gray-400">W1</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">W2</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">W3</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">W4</div>
                    </div>
                    {/* December weeks */}
                    {/* <div className="flex-1 grid grid-cols-4 gap-px">
                      <div className="text-xs text-gray-500 dark:text-gray-400">W1</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">W2</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">W3</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">W4</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* GANTT Rows */}
              {/* <div className="space-y-3">
                {/* Interior Paint Application */}
                {/* <div className="flex items-center">
                  <div className="w-48 md:w-64 flex-shrink-0 pr-2 md:pr-4">
                    <div className="text-xs md:text-sm font-medium text-gray-900 dark:text-gray-100">Interior Paint Application</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Sep 1 - Sep 15</div>
                  </div>
                  <div className="flex-1 grid grid-cols-20 gap-px h-6">
                    <div className="col-span-4"></div>
                    {/* Sep W1-W2 */}
                    {/* <div className="bg-blue-200 dark:bg-blue-800 rounded-sm relative">
                      <div className="absolute inset-0 bg-blue-400 dark:bg-blue-600 rounded-sm" style={{width: '100%'}}></div>
                    </div>
                    <div className="bg-blue-200 dark:bg-blue-800 rounded-sm relative">
                      <div className="absolute inset-0 bg-blue-400 dark:bg-blue-600 rounded-sm" style={{width: '70%'}}></div>
                    </div>
                    <div className="col-span-14"></div>
                  </div>
                </div>

                {/* Cabinet Installation */}
                {/* <div className="flex items-center">
                  <div className="w-48 md:w-64 flex-shrink-0 pr-2 md:pr-4">
                    <div className="text-xs md:text-sm font-medium text-gray-900 dark:text-gray-100">Cabinet Installation</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Sep 15 - Oct 15</div>
                  </div>
                  <div className="flex-1 grid grid-cols-20 gap-px h-6">
                    <div className="col-span-5"></div>
                    {/* Sep W3-W4 */}
                    {/* <div className="bg-green-200 dark:bg-green-800 rounded-sm relative">
                      <div className="absolute inset-0 bg-green-400 dark:bg-green-600 rounded-sm" style={{width: '50%'}}></div>
                    </div>
                    <div className="bg-green-200 dark:bg-green-800 rounded-sm relative">
                      <div className="absolute inset-0 bg-green-400 dark:bg-green-600 rounded-sm" style={{width: '100%'}}></div>
                    </div>
                    {/* Oct W1-W2 */}
                    {/* <div className="bg-green-200 dark:bg-green-800 rounded-sm relative">
                      <div className="absolute inset-0 bg-green-400 dark:bg-green-600 rounded-sm" style={{width: '100%'}}></div>
                    </div>
                    <div className="bg-green-200 dark:bg-green-800 rounded-sm relative">
                      <div className="absolute inset-0 bg-green-400 dark:bg-green-600 rounded-sm" style={{width: '70%'}}></div>
                    </div>
                    <div className="col-span-10"></div>
                  </div>
                </div>

                {/* Flooring Installation */}
                {/* <div className="flex items-center">
                  <div className="w-48 md:w-64 flex-shrink-0 pr-2 md:pr-4">
                    <div className="text-xs md:text-sm font-medium text-gray-900 dark:text-gray-100">Flooring Installation</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Sep 25 - Oct 25</div>
                  </div>
                  <div className="flex-1 grid grid-cols-20 gap-px h-6">
                    <div className="col-span-7"></div>
                    {/* Sep W4 partial */}
                    {/* <div className="bg-yellow-200 dark:bg-yellow-800 rounded-sm relative">
                      <div className="absolute inset-0 bg-yellow-400 dark:bg-yellow-600 rounded-sm" style={{width: '30%'}}></div>
                    </div>
                    {/* Oct W1-W3 */}
                    {/* <div className="bg-yellow-200 dark:bg-yellow-800 rounded-sm relative">
                      <div className="absolute inset-0 bg-yellow-400 dark:bg-yellow-600 rounded-sm" style={{width: '100%'}}></div>
                    </div>
                    <div className="bg-yellow-200 dark:bg-yellow-800 rounded-sm relative">
                      <div className="absolute inset-0 bg-yellow-400 dark:bg-yellow-600 rounded-sm" style={{width: '100%'}}></div>
                    </div>
                    <div className="bg-yellow-200 dark:bg-yellow-800 rounded-sm relative">
                      <div className="absolute inset-0 bg-yellow-400 dark:bg-yellow-600 rounded-sm" style={{width: '80%'}}></div>
                    </div>
                    <div className="col-span-9"></div>
                  </div>
                </div>

                {/* Plumbing Fixtures */}
                {/* <div className="flex items-center">
                  <div className="w-48 md:w-64 flex-shrink-0 pr-2 md:pr-4">
                    <div className="text-xs md:text-sm font-medium text-gray-900 dark:text-gray-100">Plumbing Fixtures</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Oct 1 - Oct 15</div>
                  </div>
                  <div className="flex-1 grid grid-cols-20 gap-px h-6">
                    <div className="col-span-8"></div>
                    {/* Oct W1-W2 */}
                    {/* <div className="bg-purple-200 dark:bg-purple-800 rounded-sm relative">
                      <div className="absolute inset-0 bg-purple-400 dark:bg-purple-600 rounded-sm" style={{width: '100%'}}></div>
                    </div>
                    <div className="bg-purple-200 dark:bg-purple-800 rounded-sm relative">
                      <div className="absolute inset-0 bg-purple-400 dark:bg-purple-600 rounded-sm" style={{width: '70%'}}></div>
                    </div>
                    <div className="col-span-10"></div>
                  </div>
                </div>

                {/* Light Fixtures */}
                {/* <div className="flex items-center">
                  <div className="w-48 md:w-64 flex-shrink-0 pr-2 md:pr-4">
                    <div className="text-xs md:text-sm font-medium text-gray-900 dark:text-gray-100">Light Fixtures</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Oct 15 - Nov 1</div>
                  </div>
                  <div className="flex-1 grid grid-cols-20 gap-px h-6">
                    <div className="col-span-9"></div>
                    {/* Oct W3 partial */}
                    {/* <div className="bg-indigo-200 dark:bg-indigo-800 rounded-sm relative">
                      <div className="absolute inset-0 bg-indigo-400 dark:bg-indigo-600 rounded-sm" style={{width: '50%'}}></div>
                    </div>
                    <div className="bg-indigo-200 dark:bg-indigo-800 rounded-sm relative">
                      <div className="absolute inset-0 bg-indigo-400 dark:bg-indigo-600 rounded-sm" style={{width: '100%'}}></div>
                    </div>
                    {/* Nov W1 partial */}
                    {/* <div className="bg-indigo-200 dark:bg-indigo-800 rounded-sm relative">
                      <div className="absolute inset-0 bg-indigo-400 dark:bg-indigo-600 rounded-sm" style={{width: '10%'}}></div>
                    </div>
                    <div className="col-span-8"></div>
                  </div>
                </div>

                {/* Exterior Paint Application */}
                {/* <div className="flex items-center">
                  <div className="w-48 md:w-64 flex-shrink-0 pr-2 md:pr-4">
                    <div className="text-xs md:text-sm font-medium text-gray-900 dark:text-gray-100">Exterior Paint Application</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Nov 1 - Nov 15</div>
                  </div>
                  <div className="flex-1 grid grid-cols-20 gap-px h-6">
                    <div className="col-span-12"></div>
                    {/* Nov W1-W2 */}
                    {/* <div className="bg-orange-200 dark:bg-orange-800 rounded-sm relative">
                      <div className="absolute inset-0 bg-orange-400 dark:bg-orange-600 rounded-sm" style={{width: '100%'}}></div>
                    </div>
                    <div className="bg-orange-200 dark:bg-orange-800 rounded-sm relative">
                      <div className="absolute inset-0 bg-orange-400 dark:bg-orange-600 rounded-sm" style={{width: '70%'}}></div>
                    </div>
                    <div className="col-span-6"></div>
                  </div>
                </div>

                {/* Final Walkthrough */}
                {/* <div className="flex items-center">
                  <div className="w-48 md:w-64 flex-shrink-0 pr-2 md:pr-4">
                    <div className="text-xs md:text-sm font-medium text-gray-900 dark:text-gray-100">Final Walkthrough</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Nov 15</div>
                  </div>
                  <div className="flex-1 grid grid-cols-20 gap-px h-6">
                    <div className="col-span-13"></div>
                    <div className="bg-emerald-400 dark:bg-emerald-600 rounded-full w-4 h-4 mx-auto flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <div className="col-span-6"></div>
                  </div>
                </div>

                {/* Project Completion */}
                {/* <div className="flex items-center">
                  <div className="w-48 md:w-64 flex-shrink-0 pr-2 md:pr-4">
                    <div className="text-xs md:text-sm font-medium text-gray-900 dark:text-gray-100">Project Completion</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Dec 15</div>
                  </div>
                  <div className="flex-1 grid grid-cols-20 gap-px h-6">
                    <div className="col-span-17"></div>
                    <div className="bg-emerald-500 dark:bg-emerald-700 rounded-full w-6 h-6 mx-auto flex items-center justify-center">
                      <span className="text-white text-sm font-bold">🎉</span>
                    </div>
                    <div className="col-span-2"></div>
                  </div>
                </div>
              </div>

              {/* Legend */}
              {/* <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">Legend:</h4>
                <div className="flex flex-wrap gap-4 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-3 bg-gray-200 dark:bg-gray-600 rounded-sm relative">
                      <div className="absolute inset-0 bg-gray-400 dark:bg-gray-500 rounded-sm" style={{width: '60%'}}></div>
                    </div>
                    <span className="text-gray-600 dark:text-gray-400">Progress (Light = Planned, Dark = Complete)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-emerald-400 dark:bg-emerald-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-gray-600 dark:text-gray-400">Milestone</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}

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
