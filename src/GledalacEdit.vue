<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import MainLayout from './components/MainLayout.vue';
import { gledalacService } from './services/gledalac.service';

const route = useRoute();   // Za čitanje ID-a iz URL-a
const router = useRouter(); // Za navigaciju nakon čuvanja

const gledalac = ref({
    ime: '',
    prezime: '',
    email: ''
});

// 1. Učitaj podatke čim se otvori stranica
onMounted(async () => {
    const id = Number(route.params.id);
    try {
        const data = await gledalacService.getById(id);
        gledalac.value = {
            ime: data.ime,
            prezime: data.prezime,
            email: data.email
        };
    } catch (error) {
        console.error("Greška pri učitavanju gledaoca:", error);
        alert("Gledalac nije pronađen.");
        router.push('/gledaoci');
    }
});

// 2. Snimi izmene
const save = async () => {
    const id = Number(route.params.id);
    try {
        await gledalacService.update(id, gledalac.value);
        router.push('/gledaoci');
    } catch (error) {
        console.error("Greška pri izmeni:", error);
        alert("Došlo je do greške pri čuvanju izmena.");
    }
};
</script>

<template>
    <MainLayout>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-6">
                    <h3><i class="fa-solid fa-user-pen"></i> Izmeni gledaoca</h3>
                    <hr>
                    <form @submit.prevent="save">
                        <div class="mb-3">
                            <label for="ime" class="form-label">Ime:</label>
                            <input v-model="gledalac.ime" type="text" class="form-control" id="ime" required>
                        </div>
                        <div class="mb-3">
                            <label for="prezime" class="form-label">Prezime:</label>
                            <input v-model="gledalac.prezime" type="text" class="form-control" id="prezime" required>
                        </div>
                        <div class="mb-3">
                            <label for="email" class="form-label">Email:</label>
                            <input v-model="gledalac.email" type="email" class="form-control" id="email" required>
                        </div>
                        
                        <div class="mt-4">
                            <button type="submit" class="btn btn-success me-2">
                                <i class="fa-solid fa-floppy-disk"></i> Sačuvaj izmene
                            </button>
                            <RouterLink to="/gledaoci" class="btn btn-secondary">
                                Odustani
                            </RouterLink>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </MainLayout>
</template>