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
    { name: 'Black Mustard Seeds', image: '/black-mustard-seeds.png' },
    { name: 'Black Pepper Whole', image: '/blackpepper.b37f17754c33f58a7f2f.png' },
    { name: 'Cardamom Black', image: '/cardamom-black.png' },
    { name: 'Cardamom Green', image: '/cardamom.92d9c887ceb3152b7308.png' },
    { name: 'Cinnamon Bark', image: '/cinnamon.1e44a32e3ff238534d5c.png' },
    { name: 'Cinnamon Cigar', image: '/cinnamon-cigar.png' },
    { name: 'Cloves Lal Pari', image: '/cloves.4e3655e8037736de28db.png' },
    { name: 'Coriander Seeds', image: '/coriander.0e028835a6288ddbd12c.png' },
    { name: 'Cumin Seeds', image: '/cumin.47521f94b40b2a01b035.png' },
    { name: 'Dagad Phool', image: '/dagad-phool.png' },
    { name: 'Fennel Seeds', image: '/fennel.b40e068c41645f88c56a.png' },
    { name: 'Fenugreek', image: '/fenugreek.7c1dd01f610d47fbb118.png' },
    { name: 'Kalounji', image: '/kalonji.85ac71d33e4d1ef52a6e.png' },
    { name: 'Mace (Javantri)', image: '/mace.png' },
    { name: 'Nutmeg', image: '/nutmeg.png' },
    { name: 'Sesame Black', image: '/sesame-black.png' },
    { name: 'Sesame Hulled', image: '/sesame-hulled.png' },
    { name: 'Sesame Natural', image: '/sesame.a3d3b492bb724e3b5c64.png' },
    { name: 'Star Anise', image: '/staranise.72a0f1df0fc0c8e1d240.png' },
    { name: 'Sweet Fennel', image: '/sweet-fennel.png' },
    { name: 'Yellow Mustard Seeds', image: '/yellow-mustard-seeds.png' },
  ],

  'Spice Powders': [
    { name: 'Amchur Powder', image: '/amchur-powder.png' },
    { name: 'Black Pepper Powder', image: '/black-pepper-powder.png' },
    { name: 'Black Salt', image: '/black-salt.png' },
    { name: 'Chilli Flakes', image: '/chilli-flakes.png' },
    { name: 'Chilli Powder', image: '/chilli.4cb97887f4a5e68d5306.png' },
    { name: 'Chilli Steam', image: '/chilli-steam-dundi.png' },
    { name: 'Cinnamon Powder', image: '/cinnamon-powder.png' },
    { name: 'Cloves Powder', image: '/cloves-powder.png' },
    { name: 'Coriander Cumin Powder', image: '/coriander-cumin-powder.png' },
    { name: 'Coriander Powder', image: '/coriander-powder.png' },
    { name: 'Cumin Powder', image: '/cumin-powder.png' },
    { name: 'Curry Powder', image: '/curry-powder.png' },
    { name: 'Garlic Powder', image: '/garlic-powder.png' },
    { name: 'Ginger Powder', image: '/ginger-powder.png' },
    { name: 'Kashmiri Chilli Powder', image: '/kashmiri-chilli-powder.png' },
    { name: 'LG Hing', image: '/lg-hing.png' },
    { name: 'Sugar', image: '/sugar.png' },
    { name: 'Turmeric Powder', image: '/turmeric.1ba634171390982c0658.png' },
  ],

  'Lentils & Pulses': [
    { name: 'Chana Dal', image: '/chana-dal.png' },
    { name: 'Chana Whole', image: '/chana-whole.png' },
    { name: 'Dhana Dal', image: '/dhana-dal.png' },
    { name: 'Moong Dal', image: '/moong-dal.png' },
    { name: 'Moong Whole', image: '/moong-whole.png' },
    { name: 'Moth Beans', image: '/moth-beans.png' },
    { name: 'Red Lentil', image: '/red-lentil.png' },
    { name: 'Toor Dal', image: '/toor-dal.png' },
    { name: 'Toor Whole', image: '/toor-whole.png' },
    { name: 'Urad Dal', image: '/urad-dal.png' },
    { name: 'Urad Whole', image: '/urad-whole.png' },
    { name: 'Yellow Dal', image: '/yellow-dal.png' },
  ],

  'Grains & Cereals': [
    { name: 'Rice', image: '/rice.png' },
    { name: 'Poha', image: '/poha.png' },
    { name: 'Sabudana', image: '/sabudana.png' },
  ],

  'Nuts & Seeds': [
    { name: 'Almond', image: '/almond.png' },
    { name: 'Cashew Whole', image: '/cashew-whole.png' },
    { name: 'Chia Seeds', image: '/chia-seeds.png' },
    { name: 'Phool Makhana', image: '/phoolmakhana.8f92da39726acfc72517.png' },
    { name: 'Watermelon Seeds', image: '/watermelon-seeds.png' },
  ],

  'Flours & Cooking Ingredients': [
    { name: 'Chick Peas Flour (Besan)', image: '/besan.png' },
    { name: 'Cow Ghee', image: '/cow-ghee.png' },
    { name: 'Psyllium Husk', image: '/psyllium-husk.png' },
  ],

  'Beverages': [
    { name: 'Fanta', image: '/fanta.png' },
    { name: 'Jivraj 9 Tea', image: '/jivraj-tea.png' },
    { name: 'Kashmiri Soda', image: '/kashmiri-soda.png' },
    { name: 'Limca', image: '/limca.png' },
    { name: 'Sosyo', image: '/sosyo.png' },
    { name: 'Thumbs Up', image: '/thumbs-up.png' },
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
