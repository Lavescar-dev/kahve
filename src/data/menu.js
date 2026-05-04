export const fallbackSvg =
  "data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 500%22%3E%3Crect width=%22400%22 height=%22500%22 fill=%22%233c2a20%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 fill=%22%23c68642%22 font-family=%22serif%22 font-size=%2228%22 font-weight=%22600%22%3EKahve%3C/text%3E%3C/svg%3E";

export const validImages = [
  '10147631','12809754','12811610','2668498','4065395','4829075','6112433',
  '7333831','7362647','8109628','9013517','9824593','9824594'
];

export const heroImage = `https://images.pexels.com/photos/4829075/pexels-photo-4829075.jpeg?auto=compress&cs=tinysrgb&w=2000`;

export const categories = ['Espresso', 'Süt Bazlı', 'Soğuk', 'Spesiyal', 'Demleme', 'Çekirdek', 'Atıştırmalık'];

const recipes = {
  Espresso: ['Espresso', 'Doppio', 'Macchiato', 'Cortado', 'Americano', 'Lungo', 'Espresso Romano', 'Ristretto'],
  'Süt Bazlı': ['Latte', 'Cappuccino', 'Flat White', 'Mocha', 'Bombon', 'Vanilya Latte', 'Karamel Latte', 'Hindistan Cevizi Latte'],
  Soğuk: ['Iced Latte', 'Cold Brew', 'Frappe', 'Iced Mocha', 'Affogato', 'Iced Americano', 'Cold Foam Latte', 'Şıralı Cold Brew'],
  Spesiyal: ['Türk Kahvesi', 'Sade Kahve', 'Menengiç Kahvesi', 'Mırra', 'Dibek Kahvesi', 'Sahlepli Mocha'],
  Demleme: ['V60 Pour Over', 'Aeropress', 'Chemex', 'French Press', 'Syphon', 'Kalita Wave'],
  Çekirdek: ['Etiyopya Yirgacheffe 250g', 'Brezilya Mogiana 500g', 'Kolombiya Supremo 250g', 'Kenya AA 250g', 'Sumatra Mandheling 250g', 'Guatemala Antigua 500g', 'Yemen Mokha 250g'],
  Atıştırmalık: ['Tereyağlı Kruvasan', 'Çikolatalı Kruvasan', 'Cheesecake', 'Karamelli Brownie', 'Antep Fıstıklı Kek', 'Vegan Tatlı']
};

const espressoOriginAdj = ['Tek Origin', 'Sezonluk', 'Mahalle Demleme', 'Roast Master Seçimi', 'Light Roast', 'Medium Roast', 'Dark Roast', 'Bekle ve Demle'];

function pseudoRand(seed) {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

function pickName(category, index) {
  const list = recipes[category];
  return list[Math.floor(pseudoRand(index + 41) * list.length)];
}

const categoryWeights = ['Espresso','Espresso','Süt Bazlı','Süt Bazlı','Süt Bazlı','Soğuk','Soğuk','Spesiyal','Demleme','Çekirdek','Atıştırmalık'];

function basePrice(category, name) {
  if (category === 'Çekirdek') return 220;
  if (category === 'Demleme') return 95;
  if (category === 'Atıştırmalık') return 65;
  if (category === 'Spesiyal') return 70;
  if (category === 'Soğuk') return 80;
  if (category === 'Süt Bazlı') return 75;
  return 55;
}

export const products = Array.from({ length: 50 }, (_, idx) => {
  const i = idx + 1;
  const category = categoryWeights[Math.floor(pseudoRand(i) * categoryWeights.length)];
  const name = pickName(category, idx);
  const adj = espressoOriginAdj[Math.floor(pseudoRand(i + 13) * espressoOriginAdj.length)];

  const baseP = basePrice(category, name);
  const price = baseP + Math.floor(pseudoRand(i + 19) * (category === 'Çekirdek' ? 280 : 60));

  const ratingSeed = pseudoRand(i + 7);
  const rating = Math.round((4.2 + ratingSeed * 0.7) * 10) / 10;
  const reviewCount = 28 + Math.floor(pseudoRand(i + 11) * 412);

  const onSale = pseudoRand(i + 23) > 0.65;
  const discountPct = onSale ? 10 + Math.floor(pseudoRand(i + 29) * 25) : 0;
  const originalPrice = onSale ? Math.round(price / (1 - discountPct / 100)) : null;

  const stockSeed = pseudoRand(i + 31);
  const stock = stockSeed < 0.06 ? 0 : stockSeed < 0.18 ? 1 + Math.floor(stockSeed * 8) : 35 + Math.floor(stockSeed * 70);

  const imageId = validImages[idx % validImages.length];

  return {
    id: i,
    name: category === 'Çekirdek' ? name : `${adj} ${name}`,
    price,
    originalPrice,
    discountPct,
    image: `https://images.pexels.com/photos/${imageId}/pexels-photo-${imageId}.jpeg?auto=compress&cs=tinysrgb&w=800`,
    category,
    desc:
      category === 'Çekirdek'
        ? `${name.split(' ')[0]} bölgesinden taze kavurma, hafif asit ve uzun bitiş. Pour over ve espresso için ideal.`
        : category === 'Demleme'
          ? `${name} yöntemiyle hazırlanan tek kupa filtre kahve. Demleme süresi ortalama 4 dakika.`
          : category === 'Atıştırmalık'
            ? `Günlük taze, fırından henüz çıkmış. Yanında bir double espresso ile mükemmel.`
            : `Roast master tarafından dengelenen ${category.toLowerCase()} formülü. Tek origin çekirdeklerle.`,
    rating,
    reviewCount,
    stock,
    isNew: idx >= 44,
  };
}).map((product, index) => {
  if (index === 0) return { ...product, name: 'Mola Espresso', category: 'Espresso' };
  if (index === 1) return { ...product, name: 'Klasik Cappuccino', category: 'Süt Bazlı' };
  if (index === 2) return { ...product, name: 'Etiyopya Cold Brew', category: 'Soğuk' };
  if (index === 3) return { ...product, name: 'V60 Sezonluk Demleme', category: 'Demleme' };
  return product;
});
