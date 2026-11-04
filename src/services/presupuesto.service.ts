import { Presupuesto, DatosParaPresupuesto, CambiosPresupuesto } from '../models/presupuesto.js';
import { presupuestos } from '../data/datos.js';

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
    return presupuestos.find(p => p.id === id);
};

export const listarPresupuestos = (filtroMaterial?: string, filtroUrgente?: string | boolean): Presupuesto[] => {
    return presupuestos.filter(p => {
        let coincideMaterial = true;
        let coincideUrgente = true;

        if (filtroMaterial) {
            coincideMaterial = p.material.toLowerCase() === filtroMaterial.toLowerCase();
        }

        if (filtroUrgente !== undefined) {
            const esUrgente = filtroUrgente === 'true' || filtroUrgente === true;
            coincideUrgente = p.urgente === esUrgente;
        }

        return coincideMaterial && coincideUrgente;
    });
};

export const actualizarPresupuesto = (id: number, datos: DatosParaPresupuesto): Presupuesto | undefined => {
    const index = presupuestos.findIndex(p => p.id === id);
    if (index === -1) return undefined;

    const importeFinal = calcularImporte(datos.material, datos.gramos, datos.urgente);

    presupuestos[index] = {
        ...presupuestos[index],
        ...datos,
        importe: importeFinal
    };

    return presupuestos[index];
};

export const modificarPresupuesto = (id: number, cambios: CambiosPresupuesto): Presupuesto | undefined => {
    const index = presupuestos.findIndex(p => p.id === id);
    if (index === -1) return undefined;

    const actual = presupuestos[index];
    const material = cambios.material ?? actual.material;
    const gramos = cambios.gramos ?? actual.gramos;
    const urgente = cambios.urgente ?? actual.urgente;

    const importeFinal = calcularImporte(material, gramos, urgente);

    presupuestos[index] = {
        ...actual,
        ...cambios,
        importe: importeFinal
    };

    return presupuestos[index];
};

export const eliminarPresupuesto = (id: number): boolean => {
    const index = presupuestos.findIndex(p => p.id === id);
    if (index === -1) return false;
    
    presupuestos.splice(index, 1);
    return true;
};

export const obtenerResumen = () => {
    return presupuestos.reduce((acc, p) => {
        acc.totalPresupuestos += 1;
        acc.importeAcumulado += p.importe;
        if (p.urgente) acc.presupuestosUrgentes += 1;
        return acc;
    }, { totalPresupuestos: 0, importeAcumulado: 0, presupuestosUrgentes: 0 });
};