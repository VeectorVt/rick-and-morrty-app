<template>
  <div id="app">
    <div>
      <img class="logo" src="@/assets/logo.png" alt="" />

      <filter-search @search="search" />

      <Paginator-List
        ref="paginator"
        :items="personagens"
        :total="pagination.total"
        :totalPages="pagination.totalPages"
        :itemsPerPage="pagination.page_size"
        :currentPage="pagination.current_page"
        @nextPage="nextPage"
        @prevPage="prevPage"
        @lastPage="lastPage"
        @firstPage="firstPage"
      />

      <cards-person :loading="loading" :personagens="personagens" />
    </div>
    <Paginator-List
      style="margin-top: 1rem"
      ref="paginator"
      :items="personagens"
      :total="pagination.total"
      :totalPages="pagination.totalPages"
      :itemsPerPage="pagination.page_size"
      :currentPage="pagination.current_page"
      @nextPage="nextPage"
      @prevPage="prevPage"
      @lastPage="lastPage"
      @firstPage="firstPage"
    />
 
  </div>
</template>

<script>
import { onMounted, reactive, toRefs } from "vue";
import api from "@/services/api.services";
import PaginatorList from "@/components/PaginatorList.vue";
import FilterSearch from "./components/FilterSearch.vue";
import CardsPerson from "./components/CardsPerson.vue";
import sweetAlert from "@/utils/customSwal";
export default {
  name: "App",
  components: {
    PaginatorList,
    FilterSearch,
    CardsPerson,
  },

  setup() {
    const data = reactive({
      name: "",
      status: "",
      personagens: [],
      loading: false,
      pagination: {
        total: 0,
        page_size: 20,
        current_page: 1,
        pageOfLeads: [],
        totalPages: 0,
      },
      next: "",
      prev: "",
    });

    // Atualização dos dados
    const methods = reactive({
      update(response, currentPage) {
        data.personagens = response?.data?.results;
        data.pagination.total = response?.data?.info?.count;
        data.next = response?.data?.info?.next;
        data.prev = response?.data?.info?.prev;
        data.pagination.totalPages = response?.data?.info?.pages;
        data.pagination.current_page = currentPage;
      },
    });

    // Funções de busca
    onMounted(async () => {
      await searchAll();
    });

    async function searchAll() {
      try {
        const response = await api.all();
        methods.update(response, 1);
      } catch (error) {
        console.log(error);
      }
    }

    async function search(name, status) {
      try {
        data.loading = true;
        const response = await api.search(name, status);
        methods.update(response, 1);
      } catch (error) {
        sweetAlert.swalError({
          status: error?.response?.status,
        });
      } finally {
        data.loading = false;
      }
    }

    // Funções de paginação
    async function nextPage() {
      try {
        data.loading = true;
        const response = await api.searchPaginated(data.next);
        const current_page = data.pagination.current_page + 1;
        methods.update(response, current_page);
      } catch (error) {
        console.error(error);
      } finally {
        data.loading = false;
      }
    }

    async function prevPage() {
      try {
        data.loading = true;
        const response = await api.searchPaginated(data.prev);
        const current_page = data.pagination.current_page - 1;
        methods.update(response, current_page);
      } catch (error) {
        console.error(error);
      } finally {
        data.loading = false;
      }
    }

    async function lastPage() {
      try {
        data.loading = true;
        const lastPage = data.next.replace(
          /page=[0-9]*[0-9]/,
          `page=${data.pagination.totalPages}`
        );

        const response = await api.searchPaginated(lastPage);
        methods.update(response, data.pagination.totalPages);
      } catch (error) {
        console.error(error);
      } finally {
        data.loading = false;
      }
    }

    async function firstPage() {
      try {
        data.loading = true;
        const firstPage = data.prev.replace(/page=[0-9]*[0-9]/, `page=1`);
        const response = await api.searchPaginated(firstPage);
        methods.update(response, 1);
      } catch (error) {
        console.error(error);
      } finally {
        data.loading = false;
      }
    }

    return {
      ...toRefs(data, methods),
      search,
      searchAll,
      nextPage,
      prevPage,
      lastPage,
      firstPage,
    };
  },
};
</script>

<style>


body {
  background: #000;
  background-image: url("../src/assets/background.gif") !important;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

img.logo {
  width: 60%;
  animation-name: scale;
  animation-duration: 3s;
  animation-direction: alternate;
  animation-timing-function: linear;
}

@keyframes scale {
  0% {
    transform: scale(0.2, 0.2);
  }
  25% {
    transform: scale(0.4, 0.4);
  }
  50% {
    transform: scale(0.6, 0.6);
  }
  75% {
    transform: scale(0.8, 0.8);
  }
  100% {
    transform: scale(1, 1);
  }
}
</style>
