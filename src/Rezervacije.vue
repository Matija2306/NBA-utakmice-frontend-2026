<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import MainLayout from './components/MainLayout.vue';
import type { RezervacijaModel } from './models/rezervacija.model';
import { RezervacijaService } from './services/Rezervacija.service';

const rezervacije = ref<RezervacijaModel[]>([]);

const fetchRezervacije = async () => {
    try {
        rezervacije.value = await RezervacijaService.getAll();
    } catch (error) {
        console.error("Greška pri učitavanju rezervacija", error);
    }
};

const remove = async (id: number) => {
    if (!confirm("Obrisati rezervaciju?")) return;
    await RezervacijaService.delete(id);
    await fetchRezervacije();
};

onMounted(fetchRezervacije);
</script>

<template>
    <MainLayout>
        <div class="container">
            <h3><i class="fa-solid fa-ticket"></i> Lista Rezervacija</h3>
            <RouterLink to="/rezervacije/new" class="btn btn-primary mb-3">+ Nova Rezervacija</RouterLink>

            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Gledalac</th>
                        <th>Utakmica</th>
                        <th>Broj Karata</th>
                        <th>Datum Rezervacije</th>
                        <th>Opcije</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="r in rezervacije" :key="r.id">
                        <td>{{ r.id }}</td>
                        <td>{{ r.gledalac.ime }} {{ r.gledalac.prezime }}</td>
                        <td>{{ r.termin.utakmica }}</td>
                        <td><span class="badge bg-info text-dark">{{ r.brojKarata }}</span></td>
                        <td>{{ new Date(r.createdAt).toLocaleString('sr-RS') }}</td>
                        <td>
                            <div class="btn-group">
                                <RouterLink :to="`/rezervacije/edit/${r.id}`" class="btn btn-sm btn-success">
                                    <i class="fa-solid fa-pen"></i>
                                </RouterLink>
                                <button @click="remove(r.id)" class="btn btn-sm btn-danger">
                                    <i class="fa-solid fa-trash"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </MainLayout>
</template>