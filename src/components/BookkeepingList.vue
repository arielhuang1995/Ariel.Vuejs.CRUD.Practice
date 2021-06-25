<template>
  <div class="list row">
    <div class="col-md-10">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by title"
               v-model="title"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
                  @click="searchTitle"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="list row">
      <h4>Bookkeeping List
        <button class="m-3 btn btn-sm btn-danger" @click="refreshList">
          更新資料
        </button>
      </h4>
    </div>
    <div class="col-md-6">

      <ul class="list-group">
        <li class="list-group-item"
            :class="{ active: index == currentIndex }"
            v-for="(b, index) in bookkeepings"
            :key="index"
            @click="setItemActive(b, index)"
        >
          <br>{{ b.item }}
          <br>{{ b.amount }}
        </li>
      </ul>
    </div>
    <div class="col-md-6">
      <div v-if="currentBookkeeping">
        <h4>Detail</h4>
        <div>
          <label><strong>消費品項:</strong></label> {{ currentBookkeeping.item }}
        </div>
        <div>
          <label><strong>金額:</strong></label> {{ currentBookkeeping.amount }}
        </div>
        <div>
          <label><strong>備註:</strong></label> {{ currentBookkeeping.remark }}
        </div>
        <div>
          <label><strong>建立時間:</strong></label> {{
            $moment(currentBookkeeping.createTime).format('YYYY-MM-DD HH:mm:ss')
          }}
        </div>
        <div>
          <label><strong>最後更新時間:</strong></label>
          {{ $moment(currentBookkeeping.updateTime).format('YYYY-MM-DD HH:mm:ss') }}
        </div>

        <router-link :to="'/bookkeeping/' + currentBookkeeping.id">Edit</router-link>
      </div>
      <div v-else>
        <br/>
        <p>Please click on a Item...</p>
      </div>
    </div>
  </div>
</template>

<script>
import BookkeepingDataService from "../services/BookkeepingDataService";

export default {
  name: "bookkeeping-list",
  data() {
    return {
      bookkeepings: [],
      currentBookkeeping: null,
      currentIndex: -1,
      title: ""
    };
  },
  methods: {
    retrieveBookkeepings() {
      BookkeepingDataService.getAll()
          .then(response => {
            this.bookkeepings = response.data.data.resultList;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    },

    refreshList() {
      this.retrieveBookkeepings();
      this.currentBookkeeping = null;
      this.currentIndex = -1;
    },

    setItemActive(item, index) {
      this.currentBookkeeping = item;
      this.currentIndex = index;
    },

    // removeAllList() {
    //   BookkeepingDataService.deleteAll()
    //     .then(response => {
    //       console.log(response.data);
    //       this.refreshList();
    //     })
    //     .catch(e => {
    //       console.log(e);
    //     });
    // },

    searchTitle() {
      // this.refreshList();
      // var target = this.title;
      // this.bookkeepings = this.bookkeepings.filter(function (v) {return v.item.indexOf(target) !== -1});
      BookkeepingDataService.getAll()
          .then(response => {
            console.log(this.title);
            var target = this.title;
            this.bookkeepings = response.data.data.resultList.filter(function (v) {return v.item.indexOf(target) !== -1});
            this.currentBookkeeping = null;
            this.currentIndex = -1;
          })
          .catch(e => {
            console.log(e);
          });
    }
  },
  mounted() {
    this.retrieveBookkeepings();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
