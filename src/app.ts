import express, { Request, Response } from 'express';
import { crearPresupuesto, buscarPresupuesto } from './services/presupuesto.service.js';

const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/api/presupuestos', (req: Request, res: Response) => {
  const datos = req.body;
  const canal = req.get('X-Canal') || 'desconocido';

  const nuevoPresupuesto = crearPresupuesto(datos, canal);

  res.status(201)
    .location(`/api/presupuestos/${nuevoPresupuesto.id}`)
    .json(nuevoPresupuesto);
});

app.get('/api/presupuestos/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const presupuesto = buscarPresupuesto(id);

  if (presupuesto) {
    res.status(200).json(presupuesto);
  } else {
    res.status(404).json({ mensaje: 'Presupuesto no encontrado' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor de PrintLab 3D iniciado en el puerto ${PORT}`);
});