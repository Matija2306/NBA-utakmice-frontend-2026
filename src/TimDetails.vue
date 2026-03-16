<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { TimService } from './services/tim.service';
import type { TimModel } from './models/tim.model';
import MainLayout from './components/MainLayout.vue';

// Ruter alati za dovlačenje ID-ja iz URL-a i navigaciju nazad
const route = useRoute();
const router = useRouter();

// Reaktivne varijable
const tim = ref<TimModel | null>(null);
const isLoading = ref(true);

// Funkcija koja se pokreće čim se komponenta učita
onMounted(async () => {
    const id = Number(route.params.id);
    try {
        const response = await TimService.getTimById(id);
        tim.value = response.data;
    } catch (error) {
        console.error("Greška pri dobavljanju detalja tima:", error);
    } finally {
        isLoading.value = false;
    }
});
</script>

<template>
    <MainLayout>
        <div class="container mt-5">
            <div v-if="isLoading" class="text-center my-5">
                <div class="spinner-border text-primary" role="status"></div>
                <p class="text-muted mt-2">Učitavanje podataka o franšizi...</p>
            </div>

            <div v-else-if="tim" class="row justify-content-center">
                <div class="col-lg-10">
                    <div class="nba-details-card">
                        <div class="row g-0">
                            <div class="col-md-5 logo-container d-flex align-items-center justify-content-center">
                                <img :src="tim.logoUrl" :alt="tim.naziv" class="img-fluid team-logo-large">
                            </div>

                            <div class="col-md-7 info-container p-4 p-lg-5">
                                <div class="d-flex align-items-center gap-2 mb-3">
                                    <span class="team-badge-large">{{ tim.skracenica }}</span>
                                    <span class="text-muted small fw-bold">NATIONAL BASKETBALL ASSOCIATION</span>
                                </div>

                                <h1 class="display-4 fw-bold text-white mb-4">{{ tim.naziv }}</h1>
                                
                                <div class="accent-line mb-4"></div>

                                <div class="description-section">
                                    <h6 class="text-primary text-uppercase fw-bold mb-3">O timu / Istorijat</h6>
                                    <p class="text-light-gray lead-sm">
                                        {{ tim.opis || 'Trenutno nema detaljnog opisa za ovaj NBA tim u bazi podataka.' }}
                                    </p>
                                </div>

                                <div class="action-buttons mt-5 d-flex gap-3">
                                    <button @click="router.back()" class="btn btn-outline-light rounded-pill px-4">
                                        <i class="fa-solid fa-arrow-left me-2"></i> Nazad
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-else class="alert alert-danger shadow-sm border-0 text-center">
                <i class="fa-solid fa-circle-exclamation me-2"></i>
                Nažalost, nismo uspeli da pronađemo traženi tim.
            </div>
        </div>
    </MainLayout>
</template>

<style scoped>
/* Kontejner kartice */
.nba-details-card {
    background: #1a1a1a;
    border-radius: 25px;
    overflow: hidden;
    border: 1px solid #333;
    box-shadow: 0 15px 35px rgba(0,0,0,0.4);
}

/* Sekcija za Logo */
.logo-container {
    background: #ffffff;
    min-height: 350px;
    padding: 50px;
}

.team-logo-large {
    max-height: 280px;
    filter: drop-shadow(0 5px 15px rgba(0,0,0,0.1));
    transition: transform 0.5s ease;
}

.team-logo-large:hover {
    transform: scale(1.05);
}

/* Sekcija za tekst */
.info-container {
    background: linear-gradient(145deg, #1e1e1e 0%, #121212 100%);
}

.team-badge-large {
    background: #0d6efd;
    color: white;
    padding: 5px 15px;
    border-radius: 8px;
    font-weight: 800;
    font-size: 1rem;
    letter-spacing: 1px;
}

.accent-line {
    width: 60px;
    height: 5px;
    background: #0d6efd;
    border-radius: 10px;
}

.text-light-gray {
    color: #cccccc;
    line-height: 1.8;
}

.lead-sm {
    font-size: 1.1rem;
}

/* Dugmad */
.btn-primary {
    background: #0d6efd;
    border: none;
    font-weight: 600;
}

.btn-primary:hover {
    background: #0b5ed7;
    transform: translateY(-2px);
}

.btn-outline-light:hover {
    background: rgba(255,255,255,0.1);
    transform: translateY(-2px);
}

/* Responzivnost za mobilne uređaje */
@media (max-width: 768px) {
    .logo-container {
        min-height: 250px;
        padding: 30px;
    }
    .team-logo-large {
        max-height: 180px;
    }
}
</style>