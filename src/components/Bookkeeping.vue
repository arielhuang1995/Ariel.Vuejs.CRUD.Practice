<template>
  <div v-if="currentBookkeeping" class="edit-form">
    <h4>Bookkeeping</h4>
    <form>
      <div class="form-group">
        <label for="item">消費品項</label>
        <input type="text" class="form-control" id="item"
          v-model="currentBookkeeping.item"
        />
      </div>
      <div class="form-group">
        <label for="amount">金額</label>
        <input type="number" class="form-control" id="amount" min=1 step=1
               v-model="currentBookkeeping.amount"
        />
      </div>
      <div class="form-group">
        <label for="remark">備註</label>
        <input type="text" class="form-control" id="remark"
          v-model="currentBookkeeping.remark"
        />
      </div>
    </form>

    <button class="badge badge-danger mr-2"
      @click="deleteBookkeeping"
    >
      Delete
    </button>

    <button type="submit" class="badge badge-success"
      @click="updateBookkeeping"
    >
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Item...</p>
  </div>
</template>

<script>
import BookkeepingDataService from "../services/BookkeepingDataService";

export default {
  name: "bookkeeping",
  data() {
    return {
      currentBookkeeping: null,
      message: ''
    };
  },
  methods: {
    getBookkeeping(id) {
      BookkeepingDataService.get(id)
        .then(response => {
          this.currentBookkeeping = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    /**
     * 更新 狀態
     * @param status
     */
    // updatePublished(status) {
    //   let data = {
    //     id: this.currentBookkeeping.id,
    //     title: this.currentBookkeeping.title,
    //     description: this.currentBookkeeping.description,
    //     published: status
    //   };
    //
    //   BookkeepingDataService.update(this.currentBookkeeping.id, data)
    //     .then(response => {
    //       this.currentBookkeeping.published = status;
    //       console.log(response.data);
    //     })
    //     .catch(e => {
    //       console.log(e);
    //     });
    // },

    /**
     * 更新 Bookkeeping
     */
    updateBookkeeping() {
      let data = {
        id: this.currentBookkeeping.id,
        item: this.currentBookkeeping.item,
        amount: this.currentBookkeeping.amount,
        remark: this.currentBookkeeping.remark
      };
      BookkeepingDataService.update(data)
        .then(response => {
          console.log(response.data);
          this.message = 'The Data was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    /**
     * 刪除 Bookkeeping
     */
    deleteBookkeeping() {
      BookkeepingDataService.delete(this.currentBookkeeping.id)
          .then(response => {
            console.log(response.data);
            this.$router.push({ name: "bookkeeping" });
          })
          .catch(e => {
            console.log(e);
          });
    }
  },
  mounted() {
    this.message = '';
    this.getBookkeeping(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
