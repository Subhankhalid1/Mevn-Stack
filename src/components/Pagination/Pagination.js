import { ref, computed } from "vue";

export default function handlePagination() {
  let page = ref(1);

  const data = Array.from(Array(24).keys()).map((item) => {
    return { index: item, value: `this_${item}` };
  });

  const perPage = 10;

  const paginatedData = computed(() =>
    data.slice((page.value - 1) * perPage, page.value * perPage)
  );

  const nextPage = () => {
    if (page.value !== Math.ceil(data.length / perPage)) {
      page.value += 1;
    }
  };

  const backPage = () => {
    if (page.value !== 1) {
      page.value -= 1;
    }
  };

  const goToPage = (numPage) => {
    page.value = numPage;
  };

  return { data, paginatedData, perPage, page, nextPage, backPage, goToPage };
}



{/* <template>
  <div v-for="item in paginatedData" :key="item.index">{{ item.value }}</div>
  <button @click="backPage">prev</button>
  <button
    v-for="item in Math.ceil(data.length / perPage)"
    :key="item"
    @click="() => goToPage(item)"
  >
    {{ item }}
  </button>
  <button @click="nextPage">next</button>
</template>

<script>
import handlePagination from "./handlePagination";

export default {
  name: "App",
  setup() {
    const handlePaginationValue = handlePagination();

    return { ...handlePaginationValue };
  },
};
</script>

<style>
</style> */}