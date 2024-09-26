const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createAtividade = async (req, res) => {
    try {
        const { descricao, turmaId } = req.body;

        if (!descricao || !turmaId) {
            return res.status(400).json({ message: "Descrição e turmaId são obrigatórios." });
        }

        const atividade = await prisma.atividade.create({
            data: {
                descricao,
                turmaId: parseInt(turmaId, 10)
            }
        });
        return res.status(201).json(atividade);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

const readAtividade = async (req, res) => {
    try {
        if (req.params.id) {
            const atividade = await prisma.atividade.findUnique({
                where: { id: parseInt(req.params.id, 10) },
                include: { turma: true } 
            });
            if (atividade) {
                return res.json(atividade);
            } else {
                return res.status(404).json({ message: "Atividade não encontrada." });
            }
        } else {
            const atividades = await prisma.atividade.findMany({
                include: { turma: true } 
            });
            return res.json(atividades);
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
const updateAtividade = async (req, res) => {
    const { id } = req.params;
    try {
        const { descricao, turmaId } = req.body;
        const atividade = await prisma.atividade.update({
            where: { id: parseInt(id, 10) },
            data: { descricao, turmaId: parseInt(turmaId, 10) }
        });
        return res.status(202).json(atividade);
    } catch (error) {
        return res.status(404).json({ message: "Atividade não encontrada." });
    }
};

const deleteAtividade = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.atividade.delete({
            where: { id: parseInt(id, 10) }
        });
        return res.status(204).send();
    } catch (error) {
        return res.status(404).json({ message: "Atividade não encontrada." });
    }
};

module.exports = {
    createAtividade,
    readAtividade,
    updateAtividade,
    deleteAtividade
};
