<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import MainLayout from './components/MainLayout.vue';
import { terminService } from './services/termin.service';

const router = useRouter();

// Reaktivni objekat za formu
const termin = ref({
    utakmica: '',
    datum: ''
});

const save = async () => {
    try {
        // Šaljemo podatke servisu
        await terminService.create(termin.value);
        // Povratak na listu utakmica nakon uspešnog snimanja
        router.push('/utakmice');
    } catch (error) {
        console.error("Greška pri čuvanju termina:", error);
        alert("Došlo je do greške pri čuvanju utakmice.");
    }
};
</script>

<template>
    <MainLayout>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-6">
                    <h3><i class="fa-solid fa-calendar-plus"></i> Dodaj utakmicu</h3>
                    <hr>
                    <form @submit.prevent="save">
                        <div class="mb-3">
                            <label for="utakmica" class="form-label">Naziv utakmice (Timovi):</label>
                            <input v-model="termin.utakmica" type="text" 
                                   class="form-control" id="utakmica" 
                                   placeholder="npr. Lakers vs Celtics" required>
                        </div>
                        
                        <div class="mb-3">
                            <label for="datum" class="form-label">Datum i vreme:</label>
                            <input v-model="termin.datum" type="datetime-local" 
                                   class="form-control" id="datum" required>
                        </div>

                        <div class="mt-4">
                            <button type="submit" class="btn btn-success me-2">
                                <i class="fa-solid fa-floppy-disk"></i> Sačuvaj termin
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