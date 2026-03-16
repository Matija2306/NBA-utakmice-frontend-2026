// services/rezervacija.service.ts
import axios from 'axios';
import type { RezervacijaModel } from '@/models/rezervacija.model';

const API_BASE = 'http://localhost:8080/api/rezervacije';

export class RezervacijaService {
    // Lista svih
    public static async getAll(): Promise<RezervacijaModel[]> {
        const response = await axios.get(API_BASE);
        return response.data;
    }

    // Jedna rezervacija za Edit
    public static async getById(id: number): Promise<RezervacijaModel> {
        const response = await axios.get(`${API_BASE}/${id}`);
        return response.data;
    }

    // Kreiranje nove
    public static async create(data: any): Promise<RezervacijaModel> {
        const response = await axios.post(API_BASE, data);
        return response.data;
    }

    // Izmena postojeće
    public static async update(id: number, data: any): Promise<RezervacijaModel> {
        const response = await axios.put(`${API_BASE}/${id}`, data);
        return response.data;
    }

    // Brisanje
    public static async delete(id: number): Promise<void> {
        await axios.delete(`${API_BASE}/${id}`);
    }
}