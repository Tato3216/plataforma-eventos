import prisma from "../src/config/prisma";

const services = [
  {
    name: "Desarrollo Web",
    description: "Diseño y desarrollo de soluciones web empresariales.",
    price: 1000,
  },
  {
    name: "Consultoría Tecnológica",
    description:
      "Asesoría especializada para optimización de procesos tecnológicos.",
    price: 700,
  },
  {
    name: "Soporte Empresarial",
    description:
      "Soporte técnico para infraestructura y sistemas empresariales.",
    price: 500,
  },
  {
    name: "Implementación Cloud",
    description:
      "Implementación y configuración de infraestructura en la nube.",
    price: 1200,
  },
];

const products = [
  {
    name: "Laptop Empresarial",
    description: "Equipo portátil para ambientes corporativos.",
    price: 6500,
  },
  {
    name: 'Monitor 24"',
    description: "Monitor de 24 pulgadas para estaciones de trabajo.",
    price: 1500,
  },
  {
    name: "Teclado Inalámbrico",
    description: "Teclado inalámbrico para oficina.",
    price: 350,
  },
  {
    name: "Mouse Inalámbrico",
    description: "Mouse inalámbrico ergonómico.",
    price: 250,
  },
  {
    name: "Headset Empresarial",
    description: "Audífonos con micrófono para reuniones y llamadas.",
    price: 450,
  },
  {
    name: "Docking Station",
    description: "Estación de conexión para equipos portátiles.",
    price: 850,
  },
];

async function main() {
  console.log("Starting database seed...");

  for (const service of services) {
    await prisma.service.upsert({
      where: {
        name: service.name,
      },
      update: service,
      create: service,
    });
  }

  for (const product of products) {
    await prisma.product.upsert({
      where: {
        name: product.name,
      },
      update: product,
      create: product,
    });
  }

  console.log("Database seed completed successfully.");
}

main()
  .catch((error) => {
    console.error("Error running database seed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });