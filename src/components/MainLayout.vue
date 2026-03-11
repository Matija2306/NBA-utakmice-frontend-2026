<script lang="ts" setup>
import { RouterLink } from 'vue-router';

const year = new Date().getFullYear()
</script>

<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary mb-3">
    <div class="container-fluid">
      <RouterLink class="navbar-brand" to="/">
        <i class="fa-brands fa-java"></i> NBA
      </RouterLink>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink class="nav-link" to="/"><i class="fa-solid fa-house"></i> Početna</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/gledaoci"><i class="fa-solid fa-user"></i> Gledaoci</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/utakmice"><i class="fa-solid fa-calendar-days"></i> Utakmice</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
    <slot></slot>
    <footer class="mt-3 text-center">
        &copy; {{ year }} - NBA UTAKMICE
    </footer>
</template>