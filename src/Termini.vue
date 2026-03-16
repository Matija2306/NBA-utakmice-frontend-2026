<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import MainLayout from './components/MainLayout.vue';
import { terminService } from './services/termin.service';
import type { TerminModel } from './models/termin.model';

// State za čuvanje liste utakmica
const termini = ref<TerminModel[]>([]);

// Funkcija za dobavljanje podataka (zamena za tvoj axios.get)
const fetchTermini = async () => {
    try {
        termini.value = await terminService.getAll();
    } catch (error) {
        console.error("Greška pri dobavljanju utakmica", error);
    }
};

// Funkcija za brisanje (zamena za tvoj .remove event listener)
const remove = async (id: number, match: string) => {
    if (!confirm(`Da li sigurno želite da obrišete ${match}?`)) return;

    try {
        await terminService.delete(id);
        // Umesto window.location.reload(), samo osvežimo lokalni state
        await fetchTermini();
    } catch (error) {
        console.error("Greška pri brisanju", error);
    }
};

// Formatiranje datuma (zamena za tvoj new Date(...).toLocaleString)
const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('sr-RS');
};

onMounted(fetchTermini);
</script>

<template>
    <MainLayout>
        <div class="container">
            <h3>Utakmice</h3>
            <RouterLink to="/utakmice/new" class="btn btn-sm btn-primary mb-3">
                + Dodaj utakmicu
            </RouterLink>

            <table class="table table-hover table-striped">
                <thead>
                    <tr>
                        <th scope="col"><i class="fa-solid fa-hashtag"></i></th>
                        <th scope="col"><i class="fa-solid fa-calendar-days"></i> Utakmica</th>
                        <th scope="col"><i class="fa-solid fa-basketball"></i> Datum</th>
                        <th scope="col"><i class="fa-solid fa-clock-rotate-left"></i> Izmenjeno</th>
                        <th scope="col"><i class="fa-solid fa-circle-info"></i> Opcije</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="t in termini" :key="t.id">
                        <th scope="row">{{ t.id }}</th>
                        <td>{{ t.utakmica }}</td>
                        <td>{{ formatDate(t.datum) }}</td>
                        <td>{{ formatDate(t.updatedAt ?? t.createdAt) }}</td>
                        <td>
                            <div class="btn-group">
                                <RouterLink :to="`/utakmice/edit/${t.id}`" 
                                            class="btn btn-sm btn-success" title="Izmeni">
                                    <i class="fa-solid fa-pen-to-square"></i>
                                </RouterLink>
                                
                                <button @click="remove(t.id, t.utakmica)" 
                                        type="button" class="btn btn-sm btn-danger" title="Obriši">
                                    <i class="fa-solid fa-trash-can"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                    <tr v-if="termini.length === 0">
                        <td colspan="5" class="text-center">Nema pronađenih utakmica.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </MainLayout>
</template>