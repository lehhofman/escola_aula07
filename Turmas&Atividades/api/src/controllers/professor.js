const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const loginProfessor = async (req, res) => {
    const { email } = req.body;

    try {
        const professor = await prisma.professor.findUnique({
            where: { email },
        });
        if (!professor) {
            return res.status(401).json({ message: "E-mail ou senha inválidos." });
        }
        return res.json({ message: "Login realizado com sucesso!", professor });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const createProfessor = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;
        
        if (!nome || !email || !senha) {
            return res.status(400).json({ message: "Nome, email e senha são obrigatórios." });
        }
        
        const professor = await prisma.professor.create({
            data: {
                nome: nome,
                email: email,
                senha: senha
            }
        });
        return res.status(201).json(professor);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};


const readProfessor = async (req, res) => {
    try {
        if (req.params.id) {
            const professor = await prisma.professor.findUnique({
                where: { id: parseInt(req.params.id, 10) },
                include: { turmas: true } 
            });
            if (professor) {
                return res.json(professor);
            } else {
                return res.status(404).json({ message: "Professor não encontrado" });
            }
        } else {
            const professores = await prisma.professor.findMany({
                include: { turmas: true } 
            });
            return res.json(professores);
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const updateProfessor = async (req, res) => {
    const { id } = req.params;
    try {
        const { nome, email, senha } = req.body;
        const professor = await prisma.professor.update({
            where: { id: parseInt(id, 10) },
            data: { nome, email, senha }
        });
        return res.status(202).json(professor);
    } catch (error) {
        return res.status(404).json({ message: "Professor não encontrado" });
    }
};

const deleteProfessor = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.professor.delete({
            where: { id: parseInt(id, 10) }
        });
        return res.status(204).send();
    } catch (error) {
        return res.status(404).json({ message: "Professor não encontrado" });
    }
};

module.exports = {
    createProfessor,
    readProfessor,
    updateProfessor,
    deleteProfessor,
    loginProfessor
};
