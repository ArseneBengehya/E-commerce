import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const categories = [
  { name: "Téléphones", slug: "telephone" },
  { name: "Ordinateurs", slug: "ordinateur" },
  { name: "Montres", slug: "montre" },
  { name: "Accessoires", slug: "accessoire" },
  { name: "Kit Réseau", slug: "kit-reseau" },
];

const productsData = [
  // TÉLÉPHONES
  { name: "iPhone 15 Pro Max", price: 1199, desc: "Écran Super Retina XDR, puce A17 Pro, titane ultra-résistant.", img: "https://images.unsplash.com/photo-1696446701796-da61225697cc?w=400" },
  { name: "Samsung Galaxy S24 Ultra", price: 1299, desc: "200MP, zoom optique incroyable, stylet S-Pen intégré.", img: "https://images.unsplash.com/photo-1707343843437-caacff5cfa74?w=400" },
  { name: "Google Pixel 8 Pro", price: 899, desc: "L'IA de Google au service de vos photos et de votre quotidien.", img: "https://images.unsplash.com/photo-1697223011394-471a938634e7?w=400" },
  { name: "Xiaomi 14 Ultra", price: 950, desc: "Optique Leica, performance pure, design élégant en cuir.", img: "https://images.unsplash.com/photo-1709403814144-b040b25e795c?w=400" },
  { name: "OnePlus 12", price: 799, desc: "La fluidité absolue avec une charge ultra-rapide 80W.", img: "https://images.unsplash.com/photo-1706603099959-158a5c3789b5?w=400" },
  { name: "Sony Xperia 1 V", price: 1050, desc: "Expertise photo et vidéo professionnelle dans un smartphone.", img: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400" },
  { name: "Nothing Phone (2)", price: 650, desc: "Interface Glyph unique, design transparent et logiciel épuré.", img: "https://images.unsplash.com/photo-1691515277413-5a49806f3661?w=400" },
  { name: "Asus Zenfone 10", price: 699, desc: "Compact mais puissant, parfait pour une utilisation à une main.", img: "https://images.unsplash.com/photo-1691515277420-5a49806f3662?w=400" },
  { name: "Motorola Edge 40 Pro", price: 750, desc: "Écran incurvé 165Hz, protection IP68, charge rapide 125W.", img: "https://images.unsplash.com/photo-1681273397943-7f28ed534125?w=400" },
  { name: "iPhone 13", price: 599, desc: "Toujours un excellent choix pour la fiabilité et la qualité photo.", img: "https://images.unsplash.com/photo-1632733711675-3995a82d56d5?w=400" },

  // ORDINATEURS
  { name: "MacBook Air 15 M3", price: 1299, desc: "Fin, léger et une autonomie imbattable pour le travail.", img: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=400" },
  { name: "Dell XPS 15", price: 1800, desc: "Écran OLED infini, puissance brute pour la création.", img: "https://images.unsplash.com/photo-1593642634367-d91a135587b5?w=400" },
  { name: "Asus ROG Zephyrus G14", price: 1600, desc: "Gaming de haute volée dans un format ultra-portable.", img: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=400" },
  { name: "HP Spectre x360", price: 1450, desc: "Hybride convertible élégant, écran tactile 360°.", img: "https://images.unsplash.com/photo-1544731612-de7f96ffe55f?w=400" },
  { name: "Lenovo ThinkPad X1 Carbon", price: 1750, desc: "Le standard de la productivité en entreprise.", img: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400" },
  { name: "Microsoft Surface Laptop 5", price: 1100, desc: "Design épuré et clavier ultra-confortable pour rédiger.", img: "https://images.unsplash.com/photo-1593642532744-d377ab707dc8?w=400" },
  { name: "Razer Blade 16", price: 2800, desc: "Puissance de bureau dans un châssis gaming premium.", img: "https://images.unsplash.com/photo-1593642634443-44da10037a1e?w=400" },
  { name: "Acer Swift Go 14", price: 850, desc: "Excellent rapport qualité/prix pour les étudiants.", img: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400" },
  { name: "Samsung Galaxy Book4 Pro", price: 1350, desc: "Intégration écosystème Samsung parfaite, écran AMOLED.", img: "https://images.unsplash.com/photo-1603302576837-37561b2e2e94?w=400" },
  { name: "Mac mini M2 Pro", price: 1299, desc: "PC fixe compact, surpuissant pour les créatifs.", img: "https://images.unsplash.com/photo-1591405351990-4726e3d1d1d5?w=400" },

  // MONTRES
  { name: "Apple Watch Ultra 2", price: 799, desc: "Titanium, écran ultra-lumineux, autonomie étendue.", img: "https://images.unsplash.com/photo-1695653422715-9e1ec3a0e91f?w=400" },
  { name: "Garmin Fenix 7 Pro", price: 650, desc: "La montre de survie ultime avec charge solaire.", img: "https://images.unsplash.com/photo-1617637172776-92f754780512?w=400" },
  { name: "Samsung Galaxy Watch 6", price: 299, desc: "Suivi du sommeil avancé et coach sportif intégré.", img: "https://images.unsplash.com/photo-1694506558450-4841c6d32890?w=400" },
  { name: "Google Pixel Watch 2", price: 349, desc: "Le meilleur de Fitbit combiné avec Android.", img: "https://images.unsplash.com/photo-1695653422715-9e1ec3a0e91f?w=400" },
  { name: "Huawei Watch GT 4", price: 249, desc: "Design horloger classique avec fonctionnalités connectées.", img: "https://images.unsplash.com/photo-1697241253748-038c1a63c639?w=400" },
  { name: "Withings ScanWatch 2", price: 399, desc: "Santé médicale dans un look montre traditionnelle.", img: "https://images.unsplash.com/photo-1621644788320-1360980590a9?w=400" },
  { name: "Amazfit Balance", price: 229, desc: "Analyse complète de la composition corporelle et stress.", img: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400" },
  { name: "Suunto Race", price: 449, desc: "Écran AMOLED grande lisibilité pour les marathoniens.", img: "https://images.unsplash.com/photo-1617637172776-92f754780512?w=400" },
  { name: "Xiaomi Band 8 Pro", price: 69, desc: "Le bracelet connecté accessible et complet.", img: "https://images.unsplash.com/photo-1697241253748-038c1a63c639?w=400" },
  { name: "Apple Watch SE", price: 249, desc: "L'essentiel de l'expérience Apple à prix contenu.", img: "https://images.unsplash.com/photo-1613584846689-3ed47856a1bb?w=400" },

  // ACCESSOIRES (Détails spécifiques)
  { name: "Logitech MX Master 3S", price: 99, desc: "Souris haute précision, clic silencieux.", img: "https://images.unsplash.com/photo-1527814050087-37936a54f15d?w=400" },
  { name: "Clavier mécanique Keychron", price: 120, desc: "Frappe tactile, RGB, compatible Mac/PC.", img: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400" },
  { name: "Chargeur Anker 735 (65W)", price: 45, desc: "Chargez 3 appareils simultanément avec compacité.", img: "https://images.unsplash.com/photo-1583121274602-3e282d7664c3?w=400" },
  { name: "SSD Portable Samsung T7", price: 110, desc: "1 To de stockage rapide comme l'éclair.", img: "https://images.unsplash.com/photo-1597872200969-2b653e4337b5?w=400" },
  { name: "Support Ordinateur Ergonomique", price: 35, desc: "Aluminium, réglable pour posture parfaite.", img: "https://images.unsplash.com/photo-1527814050087-37936a54f15d?w=400" },
  { name: "Souris Gaming Razer DeathAdder", price: 65, desc: "Capteur optique 20K DPI, confort gaming.", img: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400" },
  { name: "Batterie externe 20000mAh", price: 55, desc: "Charge rapide pour smartphones et tablettes.", img: "https://images.unsplash.com/photo-1609599006439-4be9990b4d4e?w=400" },
  { name: "Webcam Logitech C920 HD", price: 75, desc: "Qualité 1080p pour vos visioconférences.", img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400" },
  { name: "Rallonge multiprise parafoudre", price: 25, desc: "6 prises avec protection contre les surtensions.", img: "https://images.unsplash.com/photo-1580915411954-282cb1b0d780?w=400" },
  { name: "Imprimante HP OfficeJet Pro", price: 180, desc: "Impression recto-verso automatique, WiFi.", img: "https://images.unsplash.com/photo-1612815154858-6087c56973e3?w=400" },

  // KIT RÉSEAU
  { name: "Routeur ASUS RT-AX86U", price: 249, desc: "WiFi 6 Gaming, processeur quad-core.", img: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400" },
  { name: "Système Mesh TP-Link Deco", price: 299, desc: "Couverture totale pour maison jusqu'à 500m².", img: "https://images.unsplash.com/photo-1621335829177-802287f311c4?w=400" },
  { name: "Répéteur WiFi Netgear AX1800", price: 55, desc: "Éliminez les zones mortes simplement.", img: "https://images.unsplash.com/photo-1594632349787-8df7d9c66914?w=400" },
  { name: "Switch Ethernet TP-Link 8 ports", price: 30, desc: "Connexion filaire stable pour vos appareils.", img: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=400" },
  { name: "Adaptateur USB-C vers Ethernet", price: 20, desc: "Idéal pour PC portables sans port RJ45.", img: "https://images.unsplash.com/photo-1594632349787-8df7d9c66914?w=400" },
  { name: "Câble Ethernet Cat 7 (10m)", price: 15, desc: "Vitesse 10Gbps sans aucune perte de signal.", img: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=400" },
  { name: "Routeur 4G TP-Link Mobile", price: 89, desc: "Internet partout grâce à une carte SIM.", img: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400" },
  { name: "Point d'accès Ubiquiti Unifi", price: 150, desc: "Performance professionnelle pour entreprise.", img: "https://images.unsplash.com/photo-1621335829177-802287f311c4?w=400" },
  { name: "Antenne WiFi longue portée", price: 40, desc: "Améliorez la réception de votre PC fixe.", img: "https://images.unsplash.com/photo-1594632349787-8df7d9c66914?w=400" },
  { name: "Hub USB-C 7-en-1", price: 50, desc: "Transformez votre laptop en poste complet.", img: "https://images.unsplash.com/photo-1583121274602-3e282d7664c3?w=400" },
];

async function main() {
  for (const catData of categories) {
    const category = await prisma.category.upsert({
      where: { slug: catData.slug },
      update: {},
      create: catData,
    });

    const products = productsData.slice(
      categories.indexOf(catData) * 10,
      (categories.indexOf(catData) + 1) * 10
    );

    for (const prod of products) {
      await prisma.product.create({
        data: {
          name: prod.name,
          description: prod.desc,
          price: prod.price,
          image: prod.img,
          stock: 20,
          categoryId: category.id,
        },
      });
    }
  }
}

main().catch((e) => console.error(e)).finally(async () => await prisma.$disconnect());