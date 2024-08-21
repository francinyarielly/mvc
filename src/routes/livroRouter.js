import { Router } from "express";
import { getLivros, criarLivros, buscarLivros, editarLivros, deletarLivros} from "../controllers/livroController";

const router = Router();

router.get('/', getLivros);
router.post("/criar", criarLivros);
router.get('/:id', buscarLivros);
router.put('/editar/:id', editarLivros);
router.delete('/remover/:id', deletarLivros);

export default router;