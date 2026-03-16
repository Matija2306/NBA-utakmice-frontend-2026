<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import MainLayout from './components/MainLayout.vue';
import { terminService } from './services/termin.service';

const route = useRoute();
const router = useRouter();

const termin = ref({
    id: 0,
    utakmica: '',
    datum: ''
});

// 1. Učitaj podatke o terminu čim se komponenta pokrene
onMounted(async () => {
    const id = Number(route.params.id);
    
    if (!id) {
        router.push('/utakmice');
        return;
    }

    try {
        const data = await terminService.getById(id);
        termin.value = {
            id: data.id,
            utakmica: data.utakmica,
            datum: data.datum // HTML datetime-local očekuje format YYYY-MM-DDTHH:mm
        };
    } catch (error) {
        console.error("Greška pri učitavanju:", error);
        alert("Utakmica nije pronađena.");
        router.push('/utakmice');
    }
});

// 2. Snimi izmene
const save = async () => {
    try {
        await terminService.update(termin.value.id, {
            utakmica: termin.value.utakmica,
            datum: termin.value.datum
        });
        router.push('/utakmice');
    } catch (error) {
        console.error("Greška pri izmeni:", error);
        alert("Došlo je do greške pri čuvanju.");
    }
};
</script>

<template>
    <MainLayout>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-6">
                    <h3><i class="fa-solid fa-calendar-check"></i> Izmeni utakmicu</h3>
                    <hr>
                    <form @submit.prevent="save">
                        <div class="mb-3">
                            <label for="id" class="form-label">ID:</label>
                            <input :value="termin.id" type="number" class="form-control" id="id" disabled>
                        </div>

                        <div class="mb-3">
                            <label for="utakmica" class="form-label">Utakmica:</label>
                            <input v-model="termin.utakmica" type="text" class="form-control" id="utakmica" required>
                        </div>

                        <div class="mb-3">
                            <label for="datum" class="form-label">Datum i vreme:</label>
                            <input v-model="termin.datum" type="datetime-local" class="form-control" id="datum" required>
                        </div>

                        <div class="mt-4">
                            <button type="submit" class="btn btn-success me-2">
                                <i class="fa-solid fa-floppy-disk"></i> Sačuvaj izmene
                            </button>
                            <RouterLink to="/utakmice" class="btn btn-secondary">
                                Odustani
                            </RouterLink>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </MainLayout>
</template>