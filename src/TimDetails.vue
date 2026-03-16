<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { TimService } from './services/tim.service';
import MainLayout from './components/MainLayout.vue';

const route = useRoute();
const router = useRouter();
const tim = ref<any>(null);
const loading = ref(true);

onMounted(async () => {
    const id = Number(route.params.id);
    try {
        const response = await TimService.getTimById(id);
        tim.value = response.data;
    } catch (e) {
        console.error("Greška pri učitavanju tima", e);
    } finally {
        loading.value = false;
    }
});
</script>

<template>
    <MainLayout>
        <div class="container mt-5">
            <div v-if="loading" class="text-center">
                <div class="spinner-border text-primary"></div>
            </div>
            
            <div v-else-if="tim" class="details-wrapper">
                <div class="row bg-dark-card rounded-4 overflow-hidden shadow-lg">
                    <div class="col-md-5 logo-header d-flex align-items-center justify-content-center p-5">
                        <img :src="tim.logoUrl" :alt="tim.naziv" class="img-fluid logo-detail">
                    </div>
                    <div class="col-md-7 p-5 text-white">
                        <div class="badge bg-primary mb-2">{{ tim.skracenica }}</div>
                        <h1 class="display-4 fw-bold mb-4">{{ tim.naziv }}</h1>
                        <hr class="border-secondary">
                        <h5 class="text-primary mt-4">Istorijat i Opis</h5>
                        <p class="lead text-light-gray">{{ tim.opis || 'Nema dodatnih informacija.' }}</p>
                        
                        <div class="mt-5">
                            <button @click="router.back()" class="btn btn-outline-light rounded-pill px-4">
                                <i class="fa fa-arrow-left me-2"></i>Nazad na listu
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </MainLayout>
</template>

<style scoped>
.bg-dark-card { background: #1e1e1e; border: 1px solid #333; }
.logo-header { background: #fff; min-height: 300px; }
.logo-detail { max-height: 250px; object-fit: contain; }
.text-light-gray { color: #ccc; line-height: 1.7; }
</style>