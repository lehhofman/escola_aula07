
const express = require('express');
const router = express.Router();
const Professor = require('./controllers/professor');
const Turmas = require('./controllers/turma');
const Atividade = require('./controllers/atividade');


router.post('/professores', Professor.createProfessor);
router.get('/professores/:id?', Professor.readProfessor);
router.put('/professores/:id', Professor.updateProfessor);
router.delete('/professores/:id', Professor.deleteProfessor);
router.post('/login', Professor.loginProfessor);

router.post('/turmas', Turmas.createTurma);
router.get('/turmas/:id?', Turmas.readTurma);
router.put('/turmas/:id', Turmas.updateTurma);
router.delete('/turmas/:id', Turmas.deleteTurma);

router.post('/atividades', Atividade.createAtividade);
router.get('/atividades/:id?', Atividade.readAtividade);
router.put('/atividades/:id', Atividade.updateAtividade);
router.delete('/atividades/:id', Atividade.deleteAtividade);

router.get('/turmas/:id/atividades', async (req, res) => {
    const { id } = req.params;
    try {
        const atividades = await prisma.atividade.findMany({
            where: { turmaId: parseInt(id, 10) }, 
            include: { turma: true }, 
        });
        res.json(atividades); 
    } catch (error) {
        res.status(500).json({ message: error.message }); // Trata erros
    }
});



router.get('/', (req, res) => {
    return res.json("API respondendo");
});

module.exports = router;
