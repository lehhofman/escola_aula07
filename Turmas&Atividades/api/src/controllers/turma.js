const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createTurma = async (req, res) => {
    try {
        const { nome, professorId } = req.body;

        if (!nome || !professorId) {
            return res.status(400).json({ message: "Nome e professorId são obrigatórios." });
        }

        const turma = await prisma.turma.create({
            data: {
                nome,
                professorId
            }
        });
        return res.status(201).json(turma);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

const readTurma = async (req, res) => {
    try {
        if (req.params.id) {
            const turma = await prisma.turma.findUnique({
                where: { id: parseInt(req.params.id, 10) },
                include: { professor: true } 
            });
            if (turma) {
                return res.json(turma);
            } else {
                return res.status(404).json({ message: "Turma não encontrada" });
            }
        } else {
            const turmas = await prisma.turma.findMany({
                include: { professor: true }
            });
            return res.json(turmas);
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const updateTurma = async (req, res) => {
    const { id } = req.params;
    try {
        const { nome, professorId } = req.body;
        const turma = await prisma.turma.update({
            where: { id: parseInt(id, 10) },
            data: { nome, professorId }
        });
        return res.status(202).json(turma);
    } catch (error) {
        return res.status(404).json({ message: "Turma não encontrada" });
    }
};
const deleteTurma = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.turma.delete({
            where: { id: parseInt(id, 10) }
        });
        return res.status(204).send();
    } catch (error) {
        return res.status(404).json({ message: "Turma não encontrada" });
    }
};

module.exports = {
    createTurma,
    readTurma,
    updateTurma,
    deleteTurma
};
