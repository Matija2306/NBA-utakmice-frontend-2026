<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'; // DODATO
import { TimService } from './services/tim.service';
import MainLayout from './components/MainLayout.vue';

const router = useRouter(); // DODATO
const timoviData = ref<any>(null);
const searchInput = ref('');
const isLoading = ref(false);


const goToDetails = (id: number) => {
    router.push(`/details/${id}`);
};

async function retrieveData(page = 0) {
    isLoading.value = true;
    try {
        const searchVal = searchInput.value && searchInput.value.trim() !== '' ? searchInput.value : undefined;
        const rsp = await TimService.getAllTimovi(page, searchVal);
        timoviData.value = rsp.data;
    } catch (error) {
        console.error("Greška pri učitavanju timova:", error);
    } finally {
        isLoading.value = false;
    }
}

const first = () => { if (!timoviData.value?.first) retrieveData(0); }
const prev = () => { if (!timoviData.value?.first) retrieveData(timoviData.value.number - 1); }
const next = () => { if (!timoviData.value?.last) retrieveData(timoviData.value.number + 1); }
const last = () => { if (!timoviData.value?.last) retrieveData(timoviData.value.totalPages - 1); }
const search = () => retrieveData(0);

onMounted(() => retrieveData());
</script>

<template>
    <MainLayout>
        <div class="container mt-4">
            <div class="row mb-5 justify-content-center">
                <div class="col-md-8 col-lg-6">
                    <div class="search-wrapper">
                        <i class="fa fa-search search-icon"></i>
                        <input 
                            v-model="searchInput" 
                            type="text" 
                            class="custom-search-input" 
                            placeholder="Pretraži NBA timove..."
                            @keyup.enter="search"
                        >
                        <button class="custom-search-btn" @click="search">Traži</button>
                    </div>
                </div>
            </div>

            <div v-if="isLoading" class="text-center my-5">
                <div class="spinner-border text-primary" role="status"></div>
            </div>

            <div v-else id="content" class="d-flex flex-wrap gap-4 justify-content-center">
                <div 
                    v-for="tim in timoviData?.content" 
                    :key="tim.id" 
                    class="nba-card" 
                    @click="goToDetails(tim.id)"
                    style="cursor: pointer;" 
                >
                    <div class="card-img-wrapper">
                        <img :src="tim.logoUrl" :alt="tim.naziv" class="card-img-top logo">
                    </div>
                    <div class="nba-card-body">
                        <div class="team-badge">{{ tim.skracenica }}</div>
                        <h5 class="team-name">{{ tim.naziv }}</h5>
                    </div>
                </div>

                <div v-if="timoviData?.content.length === 0" class="alert alert-info">
                    Nije pronađen nijedan tim za traženi pojam.
                </div>
            </div>

            <nav v-if="timoviData && timoviData.totalPages > 1" class="mt-5 mb-5">
                <div class="custom-pagination">
                    <button class="pg-btn" :disabled="timoviData.first" @click="first">
                        <i class="fa-solid fa-angles-left"></i>
                    </button>
                    <button class="pg-btn" :disabled="timoviData.first" @click="prev">
                        <i class="fa-solid fa-angle-left"></i>
                    </button>
                    <span class="pg-info">
                        Stranica <strong>{{ timoviData.number + 1 }}</strong> od {{ timoviData.totalPages }}
                    </span>
                    <button class="pg-btn" :disabled="timoviData.last" @click="next">
                        <i class="fa-solid fa-angle-right"></i>
                    </button>
                    <button class="pg-btn" :disabled="timoviData.last" @click="last">
                        <i class="fa-solid fa-angles-right"></i>
                    </button>
                </div>
            </nav>
        </div>
    </MainLayout>
</template>

<style scoped>

.search-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    background: #2b2b2b;
    border-radius: 50px;
    padding: 5px 5px 5px 20px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    border: 1px solid #444;
}
.search-icon {
    color: #888;
    margin-right: 10px;
}
.custom-search-input {
    background: transparent;
    border: none;
    color: white;
    width: 100%;
    outline: none;
    font-size: 1rem;
}
.custom-search-btn {
    background: #0d6efd;
    color: white;
    border: none;
    padding: 8px 25px;
    border-radius: 50px;
    transition: 0.3s;
    font-weight: 600;
}
.custom-search-btn:hover {
    background: #0b5ed7;
    transform: scale(1.05);
}


.nba-card {
    background: #1e1e1e;
    border-radius: 15px;
    width: 18rem;
    overflow: hidden;
    transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    border: 1px solid #333;
}
.nba-card:hover {
    transform: translateY(-10px);
    border-color: #0d6efd;
    box-shadow: 0 10px 25px rgba(13, 110, 253, 0.2);
}
.card-img-wrapper {
    background: #fff;
    padding: 20px;
    height: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.logo {
    max-height: 100%;
    object-fit: contain;
}
.nba-card-body {
    padding: 20px;
    text-align: center;
}
.team-badge {
    display: inline-block;
    background: #333;
    padding: 2px 10px;
    border-radius: 5px;
    font-size: 0.8rem;
    margin-bottom: 10px;
    color: #0d6efd;
    font-weight: bold;
}
.team-name {
    margin: 0;
    font-weight: 700;
    color: #eee;
}


.custom-pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
}
.pg-btn {
    background: #2b2b2b;
    border: 1px solid #444;
    color: white;
    width: 40px;
    height: 40px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.3s;
}
.pg-btn:hover:not(:disabled) {
    background: #0d6efd;
    border-color: #0d6efd;
    color: white;
}
.pg-btn:disabled {
    opacity: 0.3;
    cursor: not-allowed;
}
.pg-info {
    font-size: 1rem;
    color: #888;
}
.pg-info strong {
    color: #0d6efd;
}
</style>