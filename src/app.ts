import express, { Request, Response } from 'express';
import { crearPresupuesto, buscarPresupuesto, listarPresupuestos, obtenerResumen, actualizarPresupuesto, modificarPresupuesto, eliminarPresupuesto } from './services/presupuesto.service.js';

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

app.get("/api/presupuestos/resumen", (req: Request, res: Response) => {
  const resumen = obtenerResumen();
  res.status(200).json(resumen);
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

app.get("/api/presupuestos", (req: Request, res: Response) => {
  const material = req.query.material as string | undefined;
  const urgente = req.query.urgente as string | undefined;

  const listado = listarPresupuestos(material, urgente);
  res.status(200).json(listado);
});

app.put("/api/presupuestos/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const presupuesto = actualizarPresupuesto(id, req.body);
  if (!presupuesto) {
    return res.status(404).json({ error: "Presupuesto no encontrado" });
  }
  res.status(200).json(presupuesto);
});

app.patch("/api/presupuestos/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const presupuesto = modificarPresupuesto(id, req.body);
  if (!presupuesto) {
    return res.status(404).json({ error: "Presupuesto no encontrado" });
  }
  res.status(200).json(presupuesto);
});

app.delete("/api/presupuestos/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const eliminado = eliminarPresupuesto(id);
  if (!eliminado) {
    return res.status(404).json({ error: "Presupuesto no encontrado" });
  }
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Servidor de PrintLab 3D iniciado en el puerto ${PORT}`);
});

