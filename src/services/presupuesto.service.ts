import { Presupuesto, DatosParaPresupuesto } from '../models/presupuesto.js';
import { presupuestos } from '../data/datos.js';

// autoincremento
let siguienteId = 1;

function calcularImporte(material: string, gramos: number, urgente: boolean): number {
    let subtotal = 0;
    const materialNormalizado = material.toLowerCase();

    if (materialNormalizado === 'pla') {
        subtotal = gramos * 0.12;
    } else if (materialNormalizado === 'resina') {
        subtotal = gramos * 0.25;
    }

    if (gramos >= 500) {
        subtotal = subtotal * 0.90;
    }

    if (urgente) {
        subtotal = subtotal * 1.20;
    }

    return Math.round(subtotal * 100) / 100;
}

export const crearPresupuesto = (datos: DatosParaPresupuesto, canal: string): Presupuesto => {
    const importeFinal = calcularImporte(datos.material, datos.gramos, datos.urgente);

    const nuevoPresupuesto: Presupuesto = {
        id: siguienteId,
        cliente: datos.cliente,
        material: datos.material,
        gramos: datos.gramos,
        urgente: datos.urgente,
        importe: importeFinal,
        canal: canal
    };

    presupuestos.push(nuevoPresupuesto);
    siguienteId++;

    return nuevoPresupuesto;
};

export const buscarPresupuesto = (id: number): Presupuesto | undefined => {
    return presupuestos.find(presupuesto => presupuesto.id === id);
};