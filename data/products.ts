// data/products.ts
// Centralized product data - Single source of truth for all products

export interface Product {
  name: string;
  image: string;
}

export interface SpiceProduct {
  name: string;
  selected: boolean;
  quantity: string;
  category?: string;
}

export const productCategories: Record<string, Product[]> = {
  'Whole Spices': [
    { name: 'Ajwain', image: '/ajwain.2fa5a82d5b6f2b69bfaa.png' },
    { name: 'Bayleaf (Tajpatta)', image: '/bayleaf_1.eea0d2d95404eba0b008.png' },
    { name: 'Black Pepper Whole', image: '/blackpepper.b37f17754c33f58a7f2f.png' },
    { name: 'Cardamom Black', image: '/cardamom-black.webp' },
    { name: 'Cardamom Green', image: '/cardamom.92d9c887ceb3152b7308.png' },
    { name: 'Cinnamon Bark', image: '/cinnamon-bark.jpg' },
    { name: 'Cinnamon Cigar', image: '/cinnamon-cigar.avif' },
    { name: 'Cloves Lal Pari', image: '/cloves.4e3655e8037736de28db.png' },
    { name: 'Coriander Seeds', image: '/coriander.0e028835a6288ddbd12c.png' },
    { name: 'Cumin Seeds', image: '/cumin.47521f94b40b2a01b035.png' },
    { name: 'Fennel Seeds', image: '/fennel.b40e068c41645f88c56a.png' },
    { name: 'Fenugreek', image: '/fenugreek.7c1dd01f610d47fbb118.png' },
    { name: 'Kalounji', image: '/kalonji.85ac71d33e4d1ef52a6e.png' },
    { name: 'Mace (Javantri)', image: '/mace.webp' },
    { name: 'Mustard Seeds Black', image: '/black-mustard.jpg' },
    { name: 'Mustard Seeds Yellow', image: '/mustard-yellow.webp' },
    { name: 'Nutmeg', image: '/nutmeg.webp' },
    { name: 'Sesame Black', image: '/sesame-black.png' },
    { name: 'Sesame Hulled', image: '/sesame-hulled.webp' },
    { name: 'Sesame Natural', image: '/sesame-natural.jpeg' },
    { name: 'Star Anise', image: '/staranise.72a0f1df0fc0c8e1d240.png' },
  ],

  'Spice Powders': [
    { name: 'Amchur Powder', image: '/amchur.webp' },
    { name: 'Black Pepper Powder', image: '/black-pepper-powder.webp' },
    { name: 'Black Salt', image: '/black-salt.jpg' },
    { name: 'Chilli Flakes', image: '/chilli-flakes.png' },
    { name: 'Chilli Powder', image: '/chilli.4cb97887f4a5e68d5306.png' },
    { name: 'Chilli Steam', image: '/chilli-steam.png' },
    { name: 'Cinnamon Powder', image: '/cinnamon-powder.webp' },
    { name: 'Cloves Powder', image: '/cloves-powder.webp' },
    { name: 'Coriander Cumin Powder', image: '/coriander-cumin-powder.webp' },
    { name: 'Coriander Powder', image: '/coriander-powder.webp' },
    { name: 'Cumin Powder', image: '/cumin-powder.webp' },
    { name: 'Curry Powder', image: '/curry-powder.jpeg' },
    { name: 'Garlic Powder', image: '/garlic-powder.webp' },
    { name: 'Ginger Powder', image: '/ginger-powder.jpg' },
    { name: 'Kashmiri Chilli Powder', image: '/kashmiri.webp' },
    { name: 'Hing', image: '/hing.webp' },
    { name: 'Turmeric Powder', image: '/turmeric.1ba634171390982c0658.png' },
  ],

  'Lentils & Pulses': [
    { name: 'Chana Dal', image: '/chana-dal.jpeg' },
    { name: 'Chana Whole', image: '/chana-whole.webp' },
    { name: 'Moong Dal', image: '/moong-dal.webp' },
    { name: 'Moong Whole', image: '/moong-whole.webp' },
    { name: 'Moth Beans', image: '/moth-beans.jpg' },
    { name: 'Red Lentil', image: '/red-lentiles.webp' },
    { name: 'Toor Dal', image: '/toor-dal.png' },
    { name: 'Toor Whole', image: '/toor-whole.jpg' },
    { name: 'Urad Dal', image: '/urad-dal.jpg' },
    { name: 'Urad Whole', image: '/urad-whole.jpg' },
    { name: 'Yellow Dal', image: '/yellow-dal.jpg' },
  ],

  'Grains & Cereals': [
    { name: 'Poha', image: '/poha.jpg' },
    { name: 'Sabudana', image: '/sabudana.jpg' },
  ],

  'Nuts & Seeds': [
    { name: 'Almond', image: '/almond.jpg' },
    { name: 'Cashew', image: '/cashew.webp' },
    { name: 'Chia Seeds', image: '/chia-seeds.png' },
    { name: 'Phool Makhana', image: '/phoolmakhana.8f92da39726acfc72517.png' },
    { name: 'Watermelon Seeds', image: '/watermelon-seeds.jpg' },
  ],

  'Other Products': [
    { name: 'Chick Peas Flour (Besan)', image: '/besan.jpg' },
    { name: 'Telephone Psyllium Husk', image: '/husk.jpg' },
  ],
};

// Helper functions
export const getAllProducts = (): Product[] => {
  return Object.values(productCategories).flat();
};

export const getCategoryNames = (): string[] => {
  return Object.keys(productCategories);
};

export const getProductsByCategory = (category: string): Product[] => {
  return productCategories[category] || [];
};

export const getAllProductNames = (): string[] => {
  return getAllProducts().map(product => product.name);
};

// Helper function to get product category
export const getProductCategory = (productName: string): string => {
  for (const [category, products] of Object.entries(productCategories)) {
    if (products.some(product => product.name === productName)) {
      return category;
    }
  }
  return 'Other';
};

// Helper function to get product minimum requirements
export const getProductMinimumRequirements = (productName: string): { min: number; unit: string } => {
  if (productName === 'Jivraj 9 Tea' || productName === 'Cow Ghee') {
    return { min: 40, unit: 'cases' };
  }
  
  const category = getProductCategory(productName);
  if (category === 'Beverages') {
    return { min: 156, unit: 'cases' };
  }
  
  return { min: 1000, unit: 'kg' };
};

// Convert products to SpiceProduct format for quote forms with category information
export const createInitialSpices = (): SpiceProduct[] => {
  return getAllProducts().map(product => ({
    name: product.name,
    selected: false,
    quantity: '',
    category: getProductCategory(product.name)
  }));
};

// Get filtered products for display
export const getFilteredProducts = (selectedCategory: string): Product[] => {
  if (!selectedCategory || selectedCategory === 'All') {
    return getAllProducts();
  }
  
  if (selectedCategory in productCategories) {
    return productCategories[selectedCategory as keyof typeof productCategories];
  }
  
  return [];
};

// Categories for filter buttons
export const getCategories = (): string[] => {
  return ['All', ...getCategoryNames()];
};
