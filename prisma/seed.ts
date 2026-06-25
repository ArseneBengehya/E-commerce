import { PrismaClient } from "@prisma/client";
import "dotenv/config";

const prisma = new PrismaClient();

const categoriesData = [
  { name: "Électronique & Tech", slug: "electronique-tech" },
  { name: "Mode & Vêtements", slug: "mode-vetements" },
  { name: "Maison & Électroménager", slug: "maison-electromenager" },
  { name: "Cosmétique & Beauté", slug: "cosmetique-beaute" },
  { name: "Alimentation & Produits Locaux", slug: "alimentation-produits-locaux" },
];

async function main() {
  console.log("⏳ Nettoyage de la base...");

  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  console.log("✅ Base nettoyée");

  for (const cat of categoriesData) {
    console.log(`📁 Création catégorie : ${cat.name}`);

    const category = await prisma.category.create({
      data: {
        name: cat.name,
        slug: cat.slug,
      },
    });

    const products = [];

    let prefixes: string[] = [];
    let adjectives: string[] = [];

    switch (cat.slug) {
      case "electronique-tech":
        prefixes = [
          "Smartphone",
          "Ordinateur",
          "Casque",
          "Montre Connectée",
          "Tablette",
          "Écouteurs",
        ];
        adjectives = [
          "Pro",
          "Ultra",
          "Max",
          "Premium",
          "Lite",
          "Advanced",
        ];
        break;

      case "mode-vetements":
        prefixes = [
          "Sneakers",
          "Chaussures",
          "Sac",
          "Veste",
          "Montre",
          "T-Shirt",
        ];
        adjectives = [
          "Élégant",
          "Sport",
          "Premium",
          "Urban",
          "Classic",
          "Trend",
        ];
        break;

      case "maison-electromenager":
        prefixes = [
          "Blender",
          "Cafetière",
          "Lampe",
          "Enceinte",
          "Mixeur",
          "Ventilateur",
        ];
        adjectives = [
          "Pro",
          "Connecté",
          "Intelligent",
          "Compact",
          "Silencieux",
          "Premium",
        ];
        break;

      case "cosmetique-beaute":
        prefixes = [
          "Sérum",
          "Crème",
          "Parfum",
          "Lotion",
          "Gel",
          "Shampoing",
        ];
        adjectives = [
          "Hydratant",
          "Naturel",
          "Premium",
          "Éclat",
          "Anti-âge",
          "Pur",
        ];
        break;

      default:
        prefixes = [
          "Café",
          "Miel",
          "Thé",
          "Épice",
          "Chocolat",
          "Huile",
        ];
        adjectives = [
          "Bio",
          "Naturel",
          "Artisanal",
          "Premium",
          "Pur",
          "Local",
        ];
    }

    for (let i = 1; i <= 60; i++) {
      const index = i % prefixes.length;

      products.push({
        name: `${prefixes[index]} ${adjectives[index]} N°${i}`,
        description: `Produit de qualité appartenant à la catégorie ${cat.name}. Conçu pour offrir performance, fiabilité et satisfaction au quotidien.`,
        price: Number((Math.random() * 800 + 20).toFixed(2)),
        image: `https://picsum.photos/600/600?random=${cat.slug}-${i}`,
        stock: Math.floor(Math.random() * 100) + 1,
        categoryId: category.id,
      });
    }

    await prisma.product.createMany({
      data: products,
    });

    console.log(`✅ 60 produits créés pour ${cat.name}`);
  }

  const categoriesCount = await prisma.category.count();
  const productsCount = await prisma.product.count();

  console.log("🎉 Seed terminé !");
  console.log(`📁 Catégories : ${categoriesCount}`);
  console.log(`📦 Produits : ${productsCount}`);
}

main()
  .catch((error) => {
    console.error("❌ Erreur :", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });