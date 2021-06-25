<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="item">消費項目</label>
        <input
          type="text"
          class="form-control"
          id="item"
          required
          v-model="detail.item"
          name="item"
        />
      </div>

      <div class="form-group">
        <label for="amount">金額</label>
        <input
            type="number"
            class="form-control"
            id="amount"
            required
            v-model="detail.amount"
            name="amount"
        />
      </div>

      <div class="form-group">
        <label for="remark">備註</label>
        <input
          class="form-control"
          id="remark"
          v-model="detail.remark"
          name="remark"
        />
      </div>

      <button @click="saveBookkeeping" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newBookkeeping">Add</button>
    </div>
  </div>
</template>

<script>
import BookkeepingDataService from "../services/BookkeepingDataService";

export default {
  name: "add-bookkeeping",
  data() {
    return {
      detail: {
        id: null,
        item: "",
        amount: 0,
        remark: ""
      },
      submitted: false
    };
  },
  methods: {
    saveBookkeeping() {
      var data = {
        item: this.detail.item,
        amount: this.detail.amount,
        remark: this.detail.remark
      };

      BookkeepingDataService.create(data)
        .then(response => {
          this.detail.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newBookkeeping() {
      this.submitted = false;
      this.detail = {};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
