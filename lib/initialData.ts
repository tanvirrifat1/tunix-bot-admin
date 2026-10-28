import { Product, Category, FeatureItem, Order } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'vector-x1',
    slug: 'vector-x1-cyber-scout',
    name: 'Vector X1 Cyber Scout',
    tagline: 'Autonomous AI desk rover with tracked mobility and spatial awareness',
    price: 189,
    originalPrice: 229,
    inStock: true,
    stockCount: 14,
    badge: 'Bestseller',
    rating: 4.9,
    reviewCount: 128,
    image: '/images/products/vector-x1.jpg',
    additionalImages: [
      '/images/products/vector-x1.jpg',
      '/images/hero/hero-banner.jpg',
    ],
    category: 'AI Companion',
    features: [
      "Autonomous navigation with drop-sensor edge detection (won't fall off your desk)",
      'High-contrast OLED emerald eye animations with 100+ emotion presets',
      'Dual tank-treads for smooth multi-surface desk movement',
      'Voice recognition with ambient room acoustic sensing',
      'Built-in HD camera for facial recognition & greeting owner upon arrival',
      'Self-docking charging station with auto-return when battery is below 15%'
    ],
    description:
      'Vector X1 Cyber Scout is an intelligent, autonomous desk companion engineered with tactile mechanical personality. Sitting on heavy-duty silicone tracks with an animated OLED face display, Vector patrols your workstation, recognises your face, perks up when you talk, and keeps your desk alive with curious movements and cute robotic purrs.',
    technicalSpecs: {
      display: 'High-contrast 1.8" Emerald Curved OLED',
      battery: 'Rechargeable Li-Ion (approx. 2.5 hrs active roam per charge)',
      sensors: ['4x IR Cliff Sensors', 'HD Optical Face Camera', 'Capacitive Touch Head Sensor', 'Dual Noise-Canceling Mics'],
      connectivity: 'Wi-Fi 802.11 b/g/n (2.4 GHz) & Bluetooth 5.0 Low Energy',
      dimensions: '99 mm x 71 mm x 69 mm',
      weight: '175 grams',
      materials: 'Anodized Matte Polymer, Silicone Tread Tracks, Scratch-resistant Acrylic Screen'
    },
    inTheBox: [
      'Vector X1 Cyber Scout Robot',
      'Magnetic Self-Docking Charging Cradle',
      'Braided USB-C Power Cable (1.5m)',
      'Quick Start Calibration Mat',
      '1-Year Hardware Warranty Card'
    ]
  },
  {
    id: 'eilik-bot',
    slug: 'eilik-emotion-bot',
    name: 'Eilik Emotion Companion',
    tagline: 'Cute robotic buddy with expressive touch response and lively dance animations',
    price: 149,
    originalPrice: 179,
    inStock: true,
    stockCount: 22,
    badge: 'Customer Favorite',
    rating: 4.8,
    reviewCount: 94,
    image: '/images/products/eilik-bot.jpg',
    additionalImages: [
      '/images/products/eilik-bot.jpg',
      '/images/hero/hero-banner.jpg',
    ],
    category: 'Emotion & Desk Pet',
    features: [
      'Interactive touch points: reacts enthusiastically when head, belly, or back is stroked',
      'Multi-axis flexible robotic arm and torso for energetic body language and dancing',
      'Dynamic cyan LED animations expressing joy, mischief, anger, love, and sleepiness',
      'Playful mini-games: countdown timer, puppet mode, rhythm tap, and desk games',
      'Multi-robot pairing: place two Eilik bots side by side to watch them chat, play, and bicker',
      'Quiet vibration damping base with silicone suction ring'
    ],
    description:
      'Eilik is a lovable desktop companion robot that turns ordinary working days into joyful experiences. Powered by emotional resonance firmware, Eilik features responsive capacitive touch sensors that trigger spontaneous dance moves, playful giggles, and endearing facial expressions whenever you interact with him.',
    technicalSpecs: {
      display: '1.54" Vibrant Blue OLED Screen',
      battery: '1200 mAh Lithium Polymer (approx. 3.5 hrs active play)',
      sensors: ['3x Capacitive Touch Panels', 'Vibration/Shock Sensor', 'Infrared Peer-to-Peer Sensor'],
      connectivity: 'USB Type-C Fast Charging & 2.4GHz Peer Sync',
      dimensions: '108 mm x 105 mm x 133 mm',
      weight: '230 grams',
      materials: 'High-grade ABS + Food-grade Soft Touch Silicone'
    },
    inTheBox: [
      'Eilik Emotion Robot',
      '5x Mini Food & Toy Magnetic Accessories',
      'Braided USB-C Cable',
      'Instruction Guidebook',
      'Certificate of Authenticity'
    ]
  },
  {
    id: 'deskimon-duo',
    slug: 'deskimon-duo-bundle',
    name: 'Deskimon Duo: Orbit & Sprout',
    tagline: 'Two symbiotic desk companions that react to each other and brighten your setup',
    price: 199,
    originalPrice: 249,
    inStock: true,
    stockCount: 9,
    badge: 'Limited Edition Bundle',
    rating: 5.0,
    reviewCount: 47,
    image: '/images/products/deskimon-duo.jpg',
    additionalImages: [
      '/images/products/deskimon-duo.jpg',
      '/images/gallery/orbit-companion.jpg',
      '/images/gallery/deskimon-sprout.jpg',
      '/images/hero/hero-banner.jpg'
    ],
    category: 'Duo Set',
    features: [
      'Dual-unit synchronized interaction: Orbit (White) and Sprout (Beige) communicate wirelessly',
      'Organic eco-polymer finish on Sprout with silicone flexible sprouting leaf',
      'Twin glow LED screens displaying synchronized mood reactions and smiling eyes',
      'Pomodoro productivity mode: one tracks work sprints while the other signals break times',
      'Chirping harmonic acoustic sounds synthesized for low-stress background delight',
      'Compact desk footprint: comfortably sits next to mechanical keyboards or monitors'
    ],
    description:
      'The Deskimon Duo consists of Orbit, the futuristic white explorer bot, and Sprout, the cozy eco-friendly botanical companion with a gentle leafy crown. Engineered as a paired set, they notice each other, share mood shifts, and celebrate your finished coding tasks and daily productivity milestones together.',
    technicalSpecs: {
      display: 'Twin 1.3" Micro-OLED Screens with Cyan & Emerald Backlight',
      battery: 'Dual 900 mAh internal batteries (4 hrs continuous desk presence)',
      sensors: ['RF P2P Sync Mesh', 'Ambient Light Sensor', 'Top-Capacitive Tap Sensor'],
      connectivity: 'Dual USB-C Recharging Ports & Local RF Sync',
      dimensions: '75 mm x 72 mm x 88 mm (Each)',
      weight: '140 grams (Each)',
      materials: 'Matte Biodegradable PLA Blend, Soft Silicone Leaf, Tempered Acrylic Face'
    },
    inTheBox: [
      'Deskimon Orbit (White)',
      'Deskimon Sprout (Beige with Leaf)',
      'Dual-Head USB-C Recharging Cable',
      'Productivity Goal Trackers',
      'Collector Edition Display Box'
    ]
  },
  {
    id: 'deskimon-sprout',
    slug: 'deskimon-sprout-single',
    name: 'Deskimon Sprout Solo Edition',
    tagline: 'Mindfulness and desk plant companion with calming reactive personality',
    price: 119,
    originalPrice: 139,
    inStock: true,
    stockCount: 18,
    badge: 'Peace & Focus',
    rating: 4.8,
    reviewCount: 63,
    image: '/images/gallery/deskimon-sprout.jpg',
    additionalImages: [
      '/images/gallery/deskimon-sprout.jpg',
      '/images/gallery/orbit-companion.jpg',
    ],
    category: 'Productivity & Focus',
    features: [
      'Soothing ambient breath animations designed to reduce desk fatigue',
      'Flexible silicone sprout that gently wiggles when happy',
      'Hydration and break reminder alarms with friendly acoustic chime',
      'Tap to awaken: dual soft taps switch between Focus Mode and Play Mode',
      'Matte clay-textured tactile shell that feels natural to touch',
      'USB-C always-on powered desk stand support'
    ],
    description:
      'Deskimon Sprout is your personal desk mindfulness buddy. Looking like an adorable clay creature with a fresh green leaf, Sprout gently blinks, breathes in sync with calming rhythm guides, and subtly prompts you to hydrate and take micro-breaks during deep work sessions.',
    technicalSpecs: {
      display: '1.3" Emerald Glow OLED Matrix',
      battery: '900 mAh Lithium Polymer (rechargeable)',
      sensors: ['Capacitive Tap Sensor', 'Built-in Micro Gyroscope', 'Break Timer Clock'],
      connectivity: 'USB Type-C',
      dimensions: '75 mm x 72 mm x 95 mm (including sprout)',
      weight: '145 grams',
      materials: 'Matte Earth-Tone Composite, Eco Silicone Leaf'
    },
    inTheBox: [
      'Deskimon Sprout Solo Robot',
      'USB-C Braided Cable (1.2m)',
      'Mindfulness Guide Card',
      'Silicon Non-slip Desk Pad'
    ]
  },
  {
    id: 'emo-living',
    slug: 'emo-ai-desktop-companion',
    name: 'EMO Living AI Desk Mate',
    tagline: 'Sensory-rich desk robot with character personality, games, and voice AI',
    price: 239,
    originalPrice: 289,
    inStock: false,
    stockCount: 0,
    badge: 'Smartest AI',
    rating: 4.9,
    reviewCount: 215,
    image: '/images/products/emo-living.jpg',
    additionalImages: [
      '/images/products/emo-living.jpg',
      '/images/hero/hero-banner.jpg'
    ],
    category: 'AI Companion',
    features: [
      'Neural processor capable of facial memory, pet recognition, and voice identification',
      'Comes with authentic mini skateboard wireless charging pad & cute beanie cap',
      'Full RGB eye matrix capable of thousands of hilarious emoji expressions',
      'Plays solo games on desk and challenges you to rock-paper-scissors and dice',
      'Integrated smart assistant: check weather, set timers, and play tunes through built-in speaker',
      'Dual articulated legs for walking, side-stepping, and dancing to music'
    ],
    description:
      'EMO is a desktop pet with real character. Powered by advanced AI algorithms, EMO is curious about the world around him. He explores your desk independently, tracks moving objects, avoids falling off edges, and builds a distinct personality over time depending on how you interact with him.',
    technicalSpecs: {
      display: 'Custom 2.0" High-Density Color LED Matrix',
      battery: 'Dual Li-Ion Cells with Skateboard Induction Qi Fast Charger',
      sensors: ['Wide-angle AI Camera', '4-Mic Far-field Beamforming Array', 'Optical Desk Edge Sensors', 'Touch-sensitive Top'],
      connectivity: 'Wi-Fi Dual Band & Bluetooth 5.1',
      dimensions: '94 mm x 92 mm x 115 mm',
      weight: '255 grams',
      materials: 'Impact-resistant Polycarbonate, Matte Soft Finish, Custom Fabric Beanie'
    },
    inTheBox: [
      'EMO AI Robot',
      'Skateboard Induction Wireless Charger Pad',
      'Custom Knitted Beanie Hat',
      'USB-C Power Adapter & Cable',
      'Quick Start Interactive Booklet'
    ]
  },
  {
    id: 'loona-pet',
    slug: 'loona-smart-quadruped-pet',
    name: 'Loona Smart Quadruped Pet',
    tagline: 'Futuristic robotic pup with 3D ToF LiDAR vision and boundless desk energy',
    price: 349,
    originalPrice: 399,
    inStock: true,
    stockCount: 5,
    badge: 'Flagship Tech',
    rating: 4.9,
    reviewCount: 78,
    image: '/images/products/loona-pet.jpg',
    additionalImages: [
      '/images/products/loona-pet.jpg',
      '/images/hero/hero-banner.jpg'
    ],
    category: 'Emotion & Desk Pet',
    features: [
      '3D ToF LiDAR vision sensor for real-time 3D depth obstacle avoidance',
      'Quadruped rolling wheel-legs capable of speeds up to 90 cm/s and agile turns',
      'Expressive ear-like actuators and huge emotive blue anime screen eyes',
      'Gesture control: waves, follows your hand, sneaks, and performs playful back-and-forth pounces',
      'Integrated voice synthesis with joyful bark and purr frequencies',
      'Supports visual programming and customizable emotional choreographies'
    ],
    description:
      'Loona is the next evolution of desktop pet robotics. Combining sophisticated 3D ToF LiDAR vision with quadruped roller mechanics, Loona darts across your room and office desk like an eager robotic puppy. She recognizes family members, fetches small props, and greets you warmly whenever you return.',
    technicalSpecs: {
      display: '2.4" HD Full-Color Curved Display',
      battery: 'High-Capacity 2800 mAh Li-Ion (4+ hrs active exploration)',
      sensors: ['3D ToF LiDAR Sensor', 'RGB HD Wide Camera', 'Quadruped Wheel-leg Encoders', 'Gesture Array'],
      connectivity: 'Wi-Fi 5 & Bluetooth 5.2 BLE',
      dimensions: '172 mm x 135 mm x 168 mm',
      weight: '620 grams',
      materials: 'Aviation-Grade ABS-PC alloy, Wear-resistant Rubberized Tires'
    },
    inTheBox: [
      'Loona Quadruped Companion Robot',
      'Intelligent Magnetic Charging Dock',
      'Interactive Play Ball and Laser Target Prop',
      'Heavy-duty Braided USB-C Cable',
      'Comprehensive Owner Manual & Warranty'
    ]
  }
];

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'ai-companion',
    name: 'AI Companion',
    slug: 'ai-companion',
    description: 'Autonomous edge-AI robotic companions with facial awareness and voice interaction.',
    icon: 'Bot',
    productCount: 2,
    isFeatured: true,
  },
  {
    id: 'emotion-desk-pet',
    name: 'Emotion & Desk Pet',
    slug: 'emotion-desk-pet',
    description: 'Living robotic pets with sensory touch, energetic body language, and dynamic emotive animations.',
    icon: 'Heart',
    productCount: 2,
    isFeatured: true,
  },
  {
    id: 'productivity-focus',
    name: 'Productivity & Focus',
    slug: 'productivity-focus',
    description: 'Mindfulness buddies, Pomodoro work sprint partners, and posture reminder desktop widgets.',
    icon: 'Clock',
    productCount: 1,
    isFeatured: true,
  },
  {
    id: 'duo-set',
    name: 'Duo Set',
    slug: 'duo-set',
    description: 'Paired symbiotic robotic systems that communicate wirelessly and interact with each other.',
    icon: 'Users',
    productCount: 1,
    isFeatured: false,
  },
  {
    id: 'accessories-parts',
    name: 'Accessories & Upgrades',
    slug: 'accessories-parts',
    description: 'Magnetic hats, charging skateboards, replacement tracks, and cosmetic face shells.',
    icon: 'Wrench',
    productCount: 4,
    isFeatured: false,
  }
];

export const INITIAL_FEATURES: FeatureItem[] = [
  {
    id: 'feat-1',
    icon: '😊',
    title: 'Emotional Expressions',
    description: 'Tunix-Bot displays 100+ animated facial emotions and reactions to help you feel understood and connected during your work sessions.',
    badge: 'Signature',
    glowColor: 'from-amber-500/20 to-orange-500/20',
    isActive: true,
  },
  {
    id: 'feat-2',
    icon: '⏱️',
    title: 'Pomodoro Timer',
    description: 'Built-in focus timer that guides you through work sprints and restful break sessions with gentle, non-intrusive visual cues.',
    badge: 'Focus',
    glowColor: 'from-rose-500/20 to-pink-500/20',
    isActive: true,
  },
  {
    id: 'feat-3',
    icon: '💬',
    title: 'Silent Communication',
    description: 'Displays short, encouraging messages and smiling OLED animations without using loud audio, keeping your workspace calm and distraction-free.',
    badge: 'Desk Friendly',
    glowColor: 'from-purple-500/20 to-indigo-500/20',
    isActive: true,
  },
  {
    id: 'feat-4',
    icon: '🔋',
    title: 'Low Power Design',
    description: 'Engineered for continuous desk presence with minimal energy consumption and automated magnetic cradle docking when battery runs low.',
    badge: 'Eco Smart',
    glowColor: 'from-emerald-500/20 to-teal-500/20',
    isActive: true,
  },
  {
    id: 'feat-5',
    icon: '🎨',
    title: 'Customizable Look',
    description: 'Choose from multiple magnetic accessories, cosmetic hats, and eye-preset customization options to perfectly match your setup style.',
    badge: 'Creative',
    glowColor: 'from-pink-500/20 to-rose-500/20',
    isActive: true,
  },
  {
    id: 'feat-6',
    icon: '🛡️',
    title: 'Privacy Protected',
    description: 'Your privacy is 100% sacred. Tunix-Bot operates on local edge firmware and never listens, records, or collects your personal data.',
    badge: 'Zero Telemetry',
    glowColor: 'from-cyan-500/20 to-blue-500/20',
    isActive: true,
  },
  {
    id: 'feat-7',
    icon: '🎯',
    title: 'Focus Assist',
    description: 'Smart situational alerts and desk posture reminders designed to keep you in the zone throughout intensive working sprints.',
    badge: 'Ergonomic',
    glowColor: 'from-blue-500/20 to-indigo-500/20',
    isActive: true,
  },
  {
    id: 'feat-8',
    icon: '⚡',
    title: 'Rapid Wakeup',
    description: 'Instantly wakes up upon sensing nearby desk vibrations or hand waves, greeting you with bright animated eyes.',
    badge: 'Sensor Tech',
    glowColor: 'from-teal-500/20 to-emerald-500/20',
    isActive: true,
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    orderNumber: 'RBT-2026-FF6W4154',
    createdAt: '2026-10-28T09:45:00.000Z',
    status: 'Pending Confirmation',
    paymentStatus: 'Unpaid',
    customer: {
      fullName: 'MD Miah Miah',
      phone: '+8801633912193',
      deliveryAddress: 'House 14, Road 2, Banasree, Dhaka',
      email: 'rifatmiah373@gmail.com',
      orderNotes: 'Please call before delivery'
    },
    items: [
      {
        productId: 'vector-x1',
        productName: 'Vector X1 Cyber Scout',
        productImage: '/images/products/vector-x1.jpg',
        unitPrice: 189,
        quantity: 1,
        subtotal: 189
      }
    ],
    subtotal: 189,
    shippingFee: 0,
    totalAmount: 189,
    paymentMethod: 'Cash on Delivery',
    whatsappQueryUrl: 'https://wa.me/8801633912193?text=Hello%20Tunix-Bot%20Admin!%20Regarding%20order%20RBT-2026-FF6W4154'
  },
  {
    orderNumber: 'RBT-2026-7Y7K1504',
    createdAt: '2026-10-28T08:12:00.000Z',
    status: 'Processing',
    paymentStatus: 'Paid',
    customer: {
      fullName: 'Farhan Kabir',
      phone: '+8801711223344',
      deliveryAddress: 'Flat 5B, Green Garden, Dhanmondi 27, Dhaka',
      email: 'farhan.k@gmail.com',
      orderNotes: 'Deliver between 2 PM to 6 PM'
    },
    items: [
      {
        productId: 'eilik-bot',
        productName: 'Eilik Emotion Companion',
        productImage: '/images/products/eilik-bot.jpg',
        unitPrice: 149,
        quantity: 2,
        subtotal: 298
      }
    ],
    subtotal: 298,
    shippingFee: 15,
    totalAmount: 313,
    paymentMethod: 'Cash on Delivery',
    whatsappQueryUrl: 'https://wa.me/8801711223344?text=Hello%20Farhan'
  },
  {
    orderNumber: 'RBT-2026-8QRD1832',
    createdAt: '2026-10-27T16:20:00.000Z',
    status: 'Shipped',
    paymentStatus: 'Paid',
    customer: {
      fullName: 'Tanvir Ahmed',
      phone: '01712345678',
      deliveryAddress: 'House 12, Road 4, Sector 7, Uttara, Dhaka',
      email: 'tanvir@example.com',
      orderNotes: 'Leave with concierge if not available'
    },
    items: [
      {
        productId: 'vector-x1',
        productName: 'Vector X1 Cyber Scout',
        productImage: '/images/products/vector-x1.jpg',
        unitPrice: 189,
        quantity: 1,
        subtotal: 189
      },
      {
        productId: 'deskimon-duo',
        productName: 'Deskimon Duo: Orbit & Sprout',
        productImage: '/images/products/deskimon-duo.jpg',
        unitPrice: 199,
        quantity: 1,
        subtotal: 199
      }
    ],
    subtotal: 388,
    shippingFee: 0,
    totalAmount: 388,
    paymentMethod: 'Cash on Delivery',
    whatsappQueryUrl: 'https://wa.me/8801712345678'
  },
  {
    orderNumber: 'RBT-2026-9P2L5512',
    createdAt: '2026-10-26T11:15:00.000Z',
    status: 'Delivered',
    paymentStatus: 'Paid',
    customer: {
      fullName: 'Nusrat Jahan',
      phone: '01899887766',
      deliveryAddress: 'Agrabad C/A, Chittagong',
      email: 'nusrat.j@hotmail.com'
    },
    items: [
      {
        productId: 'loona-pet',
        productName: 'Loona Smart Quadruped Pet',
        productImage: '/images/products/loona-pet.jpg',
        unitPrice: 349,
        quantity: 1,
        subtotal: 349
      }
    ],
    subtotal: 349,
    shippingFee: 20,
    totalAmount: 369,
    paymentMethod: 'Cash on Delivery',
    whatsappQueryUrl: 'https://wa.me/8801899887766'
  },
  {
    orderNumber: 'RBT-2026-3X8K9901',
    createdAt: '2026-10-25T14:30:00.000Z',
    status: 'Delivered',
    paymentStatus: 'Paid',
    customer: {
      fullName: 'Abrar Shahriar',
      phone: '01521443322',
      deliveryAddress: 'Mirpur DOHS, Road 9, Avenue 3, Dhaka',
      email: 'abrar.dev@gmail.com'
    },
    items: [
      {
        productId: 'deskimon-sprout',
        productName: 'Deskimon Sprout Solo Edition',
        productImage: '/images/gallery/deskimon-sprout.jpg',
        unitPrice: 119,
        quantity: 2,
        subtotal: 238
      }
    ],
    subtotal: 238,
    shippingFee: 0,
    totalAmount: 238,
    paymentMethod: 'Cash on Delivery',
    whatsappQueryUrl: 'https://wa.me/8801521443322'
  },
  {
    orderNumber: 'RBT-2026-2M7V4409',
    createdAt: '2026-10-24T18:05:00.000Z',
    status: 'Cancelled',
    paymentStatus: 'Refunded',
    customer: {
      fullName: 'Rakib Hasan',
      phone: '01933221100',
      deliveryAddress: 'Zindabazar, Sylhet',
      email: 'rakib.h@gmail.com',
      orderNotes: 'Customer requested cancellation due to wrong address'
    },
    items: [
      {
        productId: 'eilik-bot',
        productName: 'Eilik Emotion Companion',
        productImage: '/images/products/eilik-bot.jpg',
        unitPrice: 149,
        quantity: 1,
        subtotal: 149
      }
    ],
    subtotal: 149,
    shippingFee: 20,
    totalAmount: 169,
    paymentMethod: 'Cash on Delivery',
    whatsappQueryUrl: 'https://wa.me/8801933221100'
  }
];

export const SALES_PROGRESS_DATA = {
  daily: [
    { label: '00:00', revenue: 149, orders: 1, units: 1 },
    { label: '04:00', revenue: 0, orders: 0, units: 0 },
    { label: '08:00', revenue: 313, orders: 1, units: 2 },
    { label: '12:00', revenue: 538, orders: 2, units: 3 },
    { label: '16:00', revenue: 737, orders: 3, units: 4 },
    { label: '20:00', revenue: 693, orders: 2, units: 3 },
    { label: '23:59', revenue: 189, orders: 1, units: 1 },
  ],
  weekly: [
    { label: 'Mon', revenue: 1850, orders: 8, units: 11 },
    { label: 'Tue', revenue: 2240, orders: 10, units: 14 },
    { label: 'Wed', revenue: 2890, orders: 13, units: 18 },
    { label: 'Thu', revenue: 3120, orders: 15, units: 21 },
    { label: 'Fri', revenue: 3800, orders: 19, units: 26 },
    { label: 'Sat', revenue: 4450, orders: 22, units: 30 },
    { label: 'Sun', revenue: 3920, orders: 18, units: 24 },
  ],
  monthly: [
    { label: 'Jan', revenue: 28400, orders: 140, units: 195 },
    { label: 'Feb', revenue: 31200, orders: 158, units: 220 },
    { label: 'Mar', revenue: 36800, orders: 182, units: 254 },
    { label: 'Apr', revenue: 34500, orders: 170, units: 236 },
    { label: 'May', revenue: 39800, orders: 195, units: 272 },
    { label: 'Jun', revenue: 42100, orders: 210, units: 290 },
    { label: 'Jul', revenue: 45600, orders: 225, units: 312 },
    { label: 'Aug', revenue: 48900, orders: 240, units: 335 },
    { label: 'Sep', revenue: 51200, orders: 255, units: 356 },
    { label: 'Oct', revenue: 58400, orders: 285, units: 398 },
    { label: 'Nov (Proj)', revenue: 62000, orders: 300, units: 420 },
    { label: 'Dec (Proj)', revenue: 75000, orders: 360, units: 510 },
  ],
  yearly: [
    { label: '2023', revenue: 184000, orders: 920, units: 1280 },
    { label: '2024', revenue: 342000, orders: 1710, units: 2390 },
    { label: '2025', revenue: 615000, orders: 3075, units: 4300 },
    { label: '2026 (YTD)', revenue: 890000, orders: 4450, units: 6200 },
  ]
};

