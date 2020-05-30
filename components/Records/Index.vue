<template>
  <div>
    <div class="mb-2 text-right">
      <b-form-input type="search" class="d-inline-block" style="max-width:15rem;" placeholder="搜索数据..."
                    autocomplete="off" v-if="!loading" size="sm" v-model="table.filter"></b-form-input>
    </div>
    <b-table hover responsive show-empty class="text-nowrap" primary-key="id" v-bind:filter="table.filter"
             sort-by="date" sort-desc v-bind:items="result" v-bind:fields="table.fields" v-bind:busy="loading"
             v-bind:per-page="table.perPage" v-bind:current-page="table.currentPage" v-on:filtered="onFiltered"
             v-bind:dark="$colorMode.value === 'dark'">
      <template v-slot:cell(score)="data">
        <strong class="text-danger" v-if="data.value < 0">-{{ data.value }}</strong>
        <strong class="text-success" v-else-if="data.value > 0">+{{ data.value }}</strong>
        <strong v-else>{{ data.value }}</strong>
      </template>
      <template v-slot:cell(actions)="row">
        <b-button size="sm" variant="primary" @click="info(row.item)">
          <span class="d-none d-sm-inline">查看</span>详情
        </b-button>
      </template>
      <template v-slot:table-busy>
        <div class="text-center text-primary my-2">
          <b-spinner class="align-middle mr-2"></b-spinner>
          <strong>数据加载中...</strong>
        </div>
      </template>
    </b-table>
    <b-pagination align="right" v-if="!loading" v-model="table.currentPage" first-number last-number
                  v-bind:total-rows="table.rows" v-bind:per-page="table.perPage"></b-pagination>
    <b-modal ref="infoModal" ok-only ok-title="关闭" ok-variant="success"
             v-bind:title="infoData.title" v-on:hide="onInfoHide">
      <p class="mb-3">{{ infoData.content }}</p>
      <p class="small mt-1 mb-0">
        <span class="text-muted">上传者：</span>
        <strong>{{ infoData.submitter }}</strong>
      </p>
      <p class="small mt-1 mb-0">
        <span class="text-muted">提交时间：</span>
        <strong>{{ infoData.date }}</strong>
      </p>
      <p class="small mt-1 mb-0">
        <span class="text-muted">分数：</span>
        <strong class="text-danger" v-if="infoData.score < 0">-{{ infoData.score }}</strong>
        <strong class="text-success" v-else-if="infoData.score > 0">+{{ infoData.score }}</strong>
        <strong v-else>{{ infoData.score }}</strong>
      </p>
    </b-modal>
  </div>
</template>

<script>
  export default {
    name: "RecordsPage",
    data() {
      return {
        result: null,
        loading: false,
        infoData: {},
        table: {
          rows: 0,
          filter: "",
          perPage: 15,
          currentPage: 1,
          fields: [
            { key: "title", label: "标题", sortable: true },
            {
              key: "score",
              label: "分数",
              sortable: true,
              formatter: value => Math.round(Number(value) * 100) / 100,
            },
            {
              key: "submitter",
              label: "提交者",
              sortable: true,
              class: "d-none d-sm-table-cell",
            },
            {
              key: "date",
              label: "提交时间",
              sortable: true,
              class: "d-none d-md-table-cell",
            },
            { key: 'actions', label: '', class: "text-right" }
          ]
        }
      }
    },
    methods: {
      getData() {
        this.loading = true
        this.$axios.$get("user/records").then((data) => {
          this.result = data
          this.table.rows = data.length
        }).catch((error) => {
          console.error(error)
          alert("查询失败。")
        }).finally(() => {
          this.loading = false
        })
      },
      info(data) {
        this.infoData = data
        this.$refs.infoModal.show()
      },
      onFiltered(items) {
        this.table.rows = items.length
        this.table.currentPage = 1
      },
      onInfoHide() {
        this.infoData = {}
      }
    },
    created() {
      this.getData()
    }
  }
</script>
