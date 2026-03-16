<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import MainLayout from './components/MainLayout.vue';
import { RezervacijaService } from './services/Rezervacija.service';
import { gledalacService } from './services/gledalac.service';
import { terminService } from './services/termin.service';
import type { GledalacModel } from './models/gledalac.model';
import type { TerminModel } from './models/termin.model';

const route = useRoute();
const router = useRouter();

const gledaoci = ref<GledalacModel[]>([]);
const termini = ref<TerminModel[]>([]);

const forma = ref({
    gledalacId: 0,
    terminId: 0,
    brojKarata: 0
});

onMounted(async () => {
    const id = Number(route.params.id);
    try {
        // Učitaj sve što nam treba odjednom
        const [gRes, tRes, rData] = await Promise.all([
            gledalacService.getAll(),
            terminService.getAll(),
            RezervacijaService.getById(id)
        ]);
        
        gledaoci.value = gRes;
        termini.value = tRes;
        
        // Popunjavamo formu podacima iz baze
        forma.value = {
            gledalacId: rData.gledalac.id,
            terminId: rData.termin.id,
            brojKarata: rData.brojKarata
        };
    } catch (error) {
        console.error("Greška pri učitavanju:", error);
        router.push('/rezervacije');
    }
});

const update = async () => {
    const id = Number(route.params.id);
    try {
        const payload = {
            gledalac: { id: forma.value.gledalacId },
            termin: { id: forma.value.terminId },
            brojKarata: forma.value.brojKarata
        };
        await RezervacijaService.update(id, payload);
        router.push('/rezervacije');
    } catch (error) {
        console.error("Greška pri izmeni:", error);
    }
};
</script>

<template>
    <MainLayout>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-6">
                    <h3>Izmena Rezervacije #{{ route.params.id }}</h3>
                    <form @submit.prevent="update" class="card card-body shadow-sm">
                        <div class="mb-3">
                            <label class="form-label">Gledalac:</label>
                            <select v-model="forma.gledalacId" class="form-select">
                                <option v-for="g in gledaoci" :key="g.id" :value="g.id">
                                    {{ g.ime }} {{ g.prezime }} ({{ g.email }})
                                </option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Utakmica:</label>
                            <select v-model="forma.terminId" class="form-select">
                                <option v-for="t in termini" :key="t.id" :value="t.id">
                                    {{ t.utakmica }}
                                </option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Broj karata:</label>
                            <input v-model="forma.brojKarata" type="number" class="form-control" min="1">
                        </div>
                        <div class="d-flex gap-2">
                            <button type="submit" class="btn btn-primary">Sačuvaj izmene</button>
                            <RouterLink to="/rezervacije" class="btn btn-secondary">Odustani</RouterLink>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </MainLayout>
</template>