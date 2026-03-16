import type { GledalacModel } from '@/models/gledalac.model';
import axios from 'axios';

const API_BASE = 'http://localhost:8080/api/gledaoci';

export class GledalacService {
    // Odgovara axios.get('http://localhost:8080/api/gledaoci')
    public async getAll(): Promise<GledalacModel[]> {
        const response = await axios.get(API_BASE);
        return response.data;
    }

    // Možeš dodati i getById ako ti zatreba za edit stranicu
    public async getById(id: number): Promise<GledalacModel> {
        const response = await axios.get(`${API_BASE}/${id}`);
        return response.data;
    }

    public async create(data: Partial<GledalacModel>): Promise<GledalacModel> {
        const response = await axios.post(API_BASE, data);
        return response.data;
    }

    public async update(id: number, data: Partial<GledalacModel>): Promise<GledalacModel> {
        const response = await axios.put(`${API_BASE}/${id}`, data);
        return response.data;
    }

    public async delete(id: number): Promise<void> {
        await axios.delete(`${API_BASE}/${id}`);
    }
}

// Eksportujemo instancu da ne bismo morali stalno da pišemo 'new'
export const gledalacService = new GledalacService();