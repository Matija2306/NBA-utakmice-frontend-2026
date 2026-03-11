import type { TimModel } from "@/models/tim.model"
import axios from "axios"

const client = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Accept': 'application/json',
        'X-Name': 'ToyShop/v1.0'
    }
})

export class TimService {
    static async getTimovi() {
        return client.get<TimModel[]>('/timovi/list')
    }

    static async getAllTimovi(page = 0, search?: string) {
        
        let url = `/timovi?page=${page}&size=6&sortBy=id&sortMetod=asc`;
        if (search) {
            url += `&search=${encodeURIComponent(search)}`;
        }
        return client.get<any>(url);
    }

    static async getTimById(id: number) {
        return client.get<TimModel>(`/timovi/${id}`)
    }
}