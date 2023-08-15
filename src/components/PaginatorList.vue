<template>
  <div class="page-header">
    <nav class="navigation" style="margin: 0 auto">
      <ul class="pagination">
        <li data-cy="first-button" class="page-item previous">
          <!-- Botão de Voltar a primeira página -->
          <button
            :disabled="disablePrevPage"
            @click="firstPage"
            type="button"
            class="btn tooltip tooltip-top"
            data-tooltip="First Page"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13.015"
              height="13.015"
              viewBox="0 0 13.015 13.015"
            >
              <path
                id="Icon_material-skip-previous"
                data-name="Icon material-skip-previous"
                d="M9,9h2.169V22.015H9Zm3.8,6.508,9.219,6.508V9Z"
                transform="translate(-9 -9)"
                :fill="!disablePrevPage ? '#35E49F' : '#D6DFE4'"
              />
            </svg>
            <!-- <md-tooltip md-direction="top" class="bg-navy"> Primeira página </md-tooltip> -->
          </button>
        </li>
        <li data-cy="prev-button" class="page-item first">
          <!-- Botão de voltar a página anterior -->
          <button
            :disabled="disablePrevPage"
            type="button"
            class="btn tooltip tooltip-top"
            data-tooltip="Previous Page"
            @click="prevPage"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="9.219"
              height="13.015"
              viewBox="0 0 9.219 13.015"
            >
              <path
                id="Icon_material-skip-previous"
                data-name="Icon material-skip-previous"
                d="M12.8,15.508l9.219,6.508V9Z"
                transform="translate(-12.796 -9)"
                :fill="!disablePrevPage ? '#35E49F' : '#D6DFE4'"
              />
            </svg>
          </button>
        </li>
        <li>
          <div class="md-layout md-alignment-center-center ma-0 pa-0">
            <span class="page-link">
              Pág. {{ currentPage }}/{{ totalPages }} ({{ total }} Characters)
            </span>
          </div>
        </li>
        <li data-cy="next-button" class="page-item next">
          <!-- Botão de avançar para página seguinte -->
          <button
            :disabled="disableNextPage"
            type="button"
            class="btn tooltip tooltip-top"
            data-tooltip="Next Page"
            @click="nextPage"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="9.219"
              height="13.015"
              viewBox="0 0 9.219 13.015"
            >
              <path
                id="Icon_material-skip-previous"
                data-name="Icon material-skip-previous"
                d="M12.8,15.508l9.219,6.508V9Z"
                transform="translate(22.015 22.015) rotate(180)"
                :fill="!disableNextPage ? '#35E49F' : '#D6DFE4'"
              />
            </svg>
          </button>
        </li>
        <li data-cy="last-button" class="page-item last">
          <!-- Botão de avançar para última página -->
          <button
            :disabled="disableNextPage"
            @click="lastPage"
            type="button"
            class="btn tooltip tooltip-top"
            data-tooltip="Last Page"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13.015"
              height="13.015"
              viewBox="0 0 13.015 13.015"
            >
              <path
                id="Icon_material-skip-next"
                data-name="Icon material-skip-next"
                d="M9,22.015l9.219-6.508L9,9ZM19.846,9V22.015h2.169V9Z"
                transform="translate(-9 -9)"
                :fill="!disableNextPage ? '#35E49F' : '#D6DFE4'"
              />
            </svg>
            <!-- <md-tooltip md-direction="top" class="bg-navy"> Última página </md-tooltip> -->
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { computed } from "vue";

export default {
  name: "PaginatorList",

  props: {
    items: {
      type: Array,
      required: true,
    },

    total: {
      type: Number,
      default: 0,
    },
    totalPages: {
      type: Number,
      default: 0,
    },
    itemsPerPage: {
      type: Number,
      required: false,
      default: 10,
    },
    // Exibe o selecionador de itens por página
    currentPage: {
      type: Number,
      default: 1,
    },
  },

  setup(props, { emit }) {
    // Funções para páginas posteriores
    const disableNextPage = computed(() => {
      return props.currentPage == props.totalPages;
    });
    function nextPage() {
      emit("nextPage");
    }
    function lastPage() {
      emit("lastPage");
    }

    //Funções para paginas anteriores
    function prevPage() {
      emit("prevPage");
    }
    function firstPage() {
      emit("firstPage");
    }

    const disablePrevPage = computed(() => {
      return props.currentPage == 1;
    });
    return {
      disableNextPage,
      disablePrevPage,
      prevPage,
      nextPage,
      lastPage,
      firstPage,
    };
  },
};
</script>

<style lang="scss" scoped>
.page-header {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.navigation {
  display: flex;
  align-items: center;

  button {
    width: 36px;
    height: 36px;
    background-color: transparent;
    padding: 8px;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #e7effc;
    }

    svg {
      vertical-align: middle;
    }
  }
}

.pagination {
  margin: 0px;
  padding: 0px;
  justify-content: center;
  flex-wrap: wrap;
  display: flex;
  list-style: none;
  border-radius: 0.25rem;
}

.page-item .page-link {
  cursor: pointer;
  padding: 6px 12px;
  display: block;
  float: left;
  z-index: 1;
  color: #47e7ab !important;
  border: 1px solid #47e7ab !important;
  border-radius: 5px;
  border-style: double;
}

.page-link {
  cursor: default !important;
  position: relative;
  display: block;
  padding: 0.5rem 0.75rem;
  margin-left: -1px;
  line-height: 1.5;
}

.disabled {
  cursor: not-allowed !important;
  &:hover {
    background-color: inherit !important;
  }
}
</style>
