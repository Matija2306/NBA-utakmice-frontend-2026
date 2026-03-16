<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import MainLayout from './components/MainLayout.vue';
import { gledalacService } from './services/gledalac.service';
import type { GledalacModel } from './models/gledalac.model';

// State (Reaktivni podaci)
const gledaoci = ref<GledalacModel[]>([]);

// Funkcija koja menja tvoj stari .then(rsp => { ... })
const fetchGledaoci = async () => {
    try {
        gledaoci.value = await gledalacService.getAll();
    } catch (error) {
        console.error("Greška pri dobavljanju podataka", error);
    }
};

// Funkcija za brisanje (Logika iz tvog starog .addEventListener('click', ...))
const remove = async (id: number, ime: string, prezime: string) => {
    if (!confirm(`Da li sigurno želite da obrišete ${ime} ${prezime}?`)) return;

    try {
        await gledalacService.delete(id);
        // Umesto window.location.reload(), samo ponovo učitamo podatke (brže je)
        await fetchGledaoci();
    } catch (error) {
        console.error("Greška pri brisanju", error);
    }
};

// Pomoćna funkcija za datum (Logika iz tvog starog new Date(...).toLocaleString)
const formatDate = (g: any) => {
    return new Date(g.updateAt ?? g.createdAt).toLocaleString('sr-RS');
};

// onMounted se pokreće kada se komponenta učita (zamena za tvoj script na dnu HTML-a)
onMounted(fetchGledaoci);
</script>

<template>
    <MainLayout>
        <div class="container">
            <h3>Gledaoci</h3>
            <RouterLink to="/gledaoci/new" class="btn btn-sm btn-primary mb-3">
                + Dodaj Gledaoca
            </RouterLink>

            <table class="table table-hover table-striped">
                <thead>
                    <tr>
                        <th scope="col"><i class="fa-solid fa-hashtag"></i></th>
                        <th scope="col"><i class="fa-solid fa-signature"></i> Ime</th>
                        <th scope="col"><i class="fa-solid fa-signature"></i> Prezime</th>
                        <th scope="col"><i class="fa-solid fa-envelope"></i> Email</th>
                        <th scope="col"><i class="fa-solid fa-clock-rotate-left"></i> Izmenjeno</th>
                        <th scope="col"><i class="fa-solid fa-circle-info"></i> Opcije</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="g in gledaoci" :key="g.id">
                        <th scope="row">{{ g.id }}</th>
                        <td>{{ g.ime }}</td>
                        <td>{{ g.prezime }}</td>
                        <td>{{ g.email }}</td>
                        <td>{{ formatDate(g) }}</td>
                        <td>
                            <div class="btn-group">
                                <RouterLink :to="`/gledaoci/edit/${g.id}`" 
                                            class="btn btn-sm btn-success" 
                                            title="Izmeni">
                                    <i class="fa-solid fa-pen-to-square"></i>
                                </RouterLink>
                                
                                <button @click="remove(g.id, g.ime, g.prezime)" 
                                        type="button" class="btn btn-sm btn-danger" title="Obriši">
                                    <i class="fa-solid fa-trash-can"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </MainLayout>
</template>

<style scoped>
/* Tvoj dizajn je već pokriven Bootstrap-om u MainLayout-u */
</style>