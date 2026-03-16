<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import MainLayout from './components/MainLayout.vue';
import { gledalacService } from './services/gledalac.service';

const router = useRouter();

// Reaktivni objekat za formu
const gledalac = ref({
    ime: '',
    prezime: '',
    email: ''
});

const save = async () => {
    try {
        await gledalacService.create(gledalac.value);
        // Nakon uspešnog snimanja, vrati korisnika na listu
        router.push('/gledaoci');
    } catch (error) {
        console.error("Greška pri čuvanju:", error);
        alert("Došlo je do greške pri čuvanju gledaoca.");
    }
};
</script>

<template>
    <MainLayout>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-6">
                    <h3><i class="fa-solid fa-user-plus"></i> Dodaj gledaoca</h3>
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
                                <i class="fa-solid fa-floppy-disk"></i> Sačuvaj
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