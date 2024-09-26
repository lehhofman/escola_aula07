const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.professor.createMany({
    data: [
      { nome: 'Jhonatas Silva', email: 'Jhonatas@example.com', senha: 'senha123' },
      { nome: 'Maria ramos', email: 'maria@example.com', senha: 'senha456' },
      { nome: 'Pedro cabral', email: 'pedro@example.com', senha: 'senha789' },
    ],
  });

  await prisma.turma.createMany({
    data: [
      { nome: 'Matemática 101', professorId: 1 },
      { nome: 'História 202', professorId: 2 },
      { nome: 'Física 303', professorId: 3 },
    ],
  });

  await prisma.atividade.createMany({
    data: [
      { descricao: 'Prova de frações', turmaId: 1 },
      { descricao: 'Leitura de documentos históricos', turmaId: 2 },
      { descricao: 'Experimento de queda livre', turmaId: 3 },
    ],
  });
}

main()
  .then(() => console.log('Seed completed'))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
