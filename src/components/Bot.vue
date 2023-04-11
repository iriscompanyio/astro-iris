<template>
  <div class="content">
    <p>User ID: {{ result }}</p>

  </div>
</template>

<script lang="ts">
import axios from "axios";
export default {
  data() {
    return {
      result : '',
    }
  },
  created() {
    let post = {
      'message': '¿Hola tienes flores en tu tienda?'
    };
    console.log(post);
    axios.post("https://bot.iriscompany.io/bot/", post).then((result) => {
      this.result = result.data;
      console.log(result);
    });
  }
}
</script>

