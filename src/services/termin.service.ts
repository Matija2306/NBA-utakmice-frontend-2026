// services/termin.service.ts
import type { TerminModel } from '@/models/termin.model';
import axios from 'axios';

const API_BASE = 'http://localhost:8080/api/termini';

export class TerminService {
    // Dobavljanje svih termina (utakmica)
    public async getAll(): Promise<TerminModel[]> {
        const response = await axios.get(API_BASE);
        return response.data;
    }

    // Dobavljanje jednog termina po ID-u
    public async getById(id: number): Promise<TerminModel> {
        const response = await axios.get(`${API_BASE}/${id}`);
        return response.data;
    }

    // Kreiranje novog termina
    public async create(data: Partial<TerminModel>): Promise<TerminModel> {
        const response = await axios.post(API_BASE, data);
        return response.data;
    }

    // Izmena termina
    public async update(id: number, data: Partial<TerminModel>): Promise<TerminModel> {
        const response = await axios.put(`${API_BASE}/${id}`, data);
        return response.data;
    }

    // Brisanje termina
    public async delete(id: number): Promise<void> {
        await axios.delete(`${API_BASE}/${id}`);
    }
}

// Eksportujemo instancu servisa
export const terminService = new TerminService();