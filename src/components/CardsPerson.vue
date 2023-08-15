<template>
  <div>
    <div class="content">
      <!-- Cards dos Personagens -->
      <div
        class="content-characters"
        v-for="(character, index) in personagens"
        :key="character.id"
      >
        <div
          v-if="loading"
          style="width: 100%"
          class="loading loading-lg"
        ></div>

        <div :data-cy="`character-${index}`" v-else class="character">
          <img
            :data-cy="`img-${index}`"
            class="image-character"
            :src="character.image"
            alt=""
          />
          <div class="info-character">
            <h2>{{ character.name }}</h2>
            <h4
              :style="{
                background: `${statusColor(character.status)}`,
              }"
            >
              {{ character.status }}
            </h4>
            <h4>
              {{ character.species }}
            </h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";

import { toRefs } from "vue";

export default {
  name: "CardsPerson",
  props: {
    personagens: { type: Array, required: true },
    loading: { type: Boolean, required: false },
  },

  setup() {
    const methods = reactive({
      statusColor(status) {
        if (status.toLowerCase() === "alive") return "#47E899";
        else if (status.toLowerCase() === "dead") return "#E84747";
        else return "#8b8b8b";
      },
    });

    return {
      ...toRefs(methods),
    };
  },
};
</script>

<style scoped>
.content {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 30px 30px;
  width: 95%;
  margin: 0 auto;
}

.content-characters {
  /* width: 100%; */
  background: #002128;
  padding: 1rem;
  border-radius: 1rem;
  transition: 0.3s ease-in;
  box-shadow: 5px 3px 2px #00ff97;
}
.content-characters:hover {
  background: #1b1b1b;
  transform: scale(1.1, 1.1);
}
.character {
  display: flex;
  justify-content: center;
  align-items: center;
}
.info-character {
  display: table-column;
  justify-content: center;
  margin: 0 auto;
}

h1 {
  color: #00ff97;
}
h2 {
  font-family: "Audiowide", sans-serif;
  font-weight: bold;
  font-size: 1.2rem;
  padding: 1rem;
  background: #00ff97;
  border-radius: 0.8rem;
  margin: 1rem;
}
h4 {
  font-family: "Audiowide", sans-serif;
  margin: 1rem;
  color: #ffffff;
  background: #8b8b8b;
  border-radius: 0.4rem;
  font-weight: inherit;
  padding: 0.2rem;
}

img {
  height: 40%;
  width: 40%;
  border-radius: 1rem;
  /* margin: 0px;
  opacity: 1;
  transition: opacity 0.5s ease 0s; */
}

@media screen and (max-width: 918px) {
  .content {
    grid-template-columns: 1fr 1fr;
  }
  .character {
    display: flex;
    align-items: center;
  }
  h2 {
    font-size: 1rem;
  }
}

@media screen and (max-width: 540px) {
  .content {
    width: 90%;
    grid-template-columns: 1fr;
  }
  .character {
    display: flex;
    align-items: center;
  }
}
</style>
