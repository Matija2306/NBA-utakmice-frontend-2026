<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import MainLayout from './components/MainLayout.vue';
import { RezervacijaService } from './services/Rezervacija.service';
import { gledalacService } from './services/gledalac.service';
import { terminService } from './services/termin.service';
import type { GledalacModel } from './models/gledalac.model';
import type { TerminModel } from './models/termin.model';

const router = useRouter();

// Liste za dropdown-ove
const gledaoci = ref<GledalacModel[]>([]);
const termini = ref<TerminModel[]>([]);

// Podaci forme
const rezervacija = ref({
    gledalacId: 0,
    terminId: 0,
    brojKarata: 1
});

onMounted(async () => {
    try {
        // Učitavamo gledaoce i termine paralelno
        const [gRes, tRes] = await Promise.all([
            gledalacService.getAll(),
            terminService.getAll()
        ]);
        gledaoci.value = gRes;
        termini.value = tRes;
    } catch (error) {
        console.error("Greška pri učitavanju podataka:", error);
    }
});

const save = async () => {
    if (rezervacija.value.gledalacId === 0 || rezervacija.value.terminId === 0) {
        alert("Odaberite gledaoca i utakmicu!");
        return;
    }

    try {
        // Mapiramo u format koji Spring Boot očekuje (objekti sa ID-jem)
        const payload = {
            gledalac: { id: rezervacija.value.gledalacId },
            termin: { id: rezervacija.value.terminId },
            brojKarata: rezervacija.value.brojKarata
        };
        await RezervacijaService.create(payload);
        router.push('/rezervacije');
    } catch (error) {
        console.error("Greška pri čuvanju:", error);
    }
};
</script>

<template>
    <MainLayout>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-6">
                    <h3>Nova Rezervacija</h3>
                    <form @submit.prevent="save" class="card card-body shadow-sm">
                        <div class="mb-3">
                            <label class="form-label">Gledalac:</label>
                            <select v-model="rezervacija.gledalacId" class="form-select" required>
                                <option value="0" disabled>-- Odaberi --</option>
                                <option v-for="g in gledaoci" :key="g.id" :value="g.id">
                                    {{ g.email }} ({{ g.ime }} {{ g.prezime }})
                                </option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Utakmica:</label>
                            <select v-model="rezervacija.terminId" class="form-select" required>
                                <option value="0" disabled>-- Odaberi --</option>
                                <option v-for="t in termini" :key="t.id" :value="t.id">
                                    {{ t.utakmica }}
                                </option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Broj karata:</label>
                            <input v-model="rezervacija.brojKarata" type="number" class="form-control" min="1" required>
                        </div>
                        <div class="d-flex gap-2">
                            <button type="submit" class="btn btn-success">Sačuvaj</button>
                            <RouterLink to="/rezervacije" class="btn btn-secondary">Nazad</RouterLink>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </MainLayout>
</template>