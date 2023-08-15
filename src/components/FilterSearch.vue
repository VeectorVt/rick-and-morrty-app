<template>
  <div id="form" class="container form-group text-center">
    <h1 class="title">Search Characters</h1>
    <div class="columns col-oneline">
      <div class="column col-4">
        <label data-cy="label-name" class="form-label" for="name">Name</label>
        <input class="mx-2 form-input" id="name" type="text" v-model="name" />
      </div>
      <div class="column col-4">
        <label data-cy="label-status" class="form-label">Status</label>
        <select
          class="form-select mx-2"
          v-model="status"
          name="Status"
          id="status"
        >
          <option value=""></option>
          <option value="dead">Dead</option>
          <option value="alive">Alive</option>
          <option value="unknow">Unknow</option>
        </select>
      </div>
      <div class="column col-3" style="margin: 14px">
        <button
          data-cy="button-search"
          class="search btn btn-primary"
          v-on:click="$emit('search', name, status)"
        >
          Search
          <i class="icon icon-search"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { toRefs, reactive } from "vue";

export default {
  name: "FilterSearch",
  setup() {
    const data = reactive({
      name: "",
      status: "",
    });
    return {
      ...toRefs(data),
    };
  },
};
</script>

<style scoped>
.search {
  width: 80%;
  margin-top: 20px;
  border-radius: 1rem;
  color: #00b0c8;
  font-family: "Audiowide", sans-serif;
  font-size: 0.9rem;
}

input {
  text-align: center;
  background: #002128;
  outline: none;
  border: 0;
  /* width: 300px; */
  /* margin-left: 20px; */
  padding: 1rem;
  color: white;
  font-weight: 700;
  border-radius: 1rem;
}

select {
  text-align: center;
  background: #002128 !important;
  outline: none;
  border: 0;
  /* width: 300px; */
  /* margin-left: 20px; */
  /* padding: 1rem; */
  color: rgb(255, 255, 255);
  /* font-weight: 700; */
  border-radius: 1rem;
}

.title {
  color: #00b0c8;
  font-family: "Audiowide", sans-serif;
}
label {
  font-size: 1rem;
  color: #fff;
  font-family: "Audiowide", sans-serif;
}
</style>
