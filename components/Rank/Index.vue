<template>
  <div>
    <p>您可以在这里查询同学们的分数和排名。</p>
    <b-form>
      <b-form-group v-show="!enableAdvanced">
        <b-form-checkbox v-model="includeGrade" switch>包含全年级同学</b-form-checkbox>
      </b-form-group>
      <b-form-group>
        <b-form-checkbox v-model="enableAdvanced" switch>高级查询</b-form-checkbox>
      </b-form-group>
      <transition name="fade" mode="out-in">
        <b-form-row class="mt-n2" v-show="enableAdvanced">
          <b-col v-for="(data, name) in advancedFields" v-bind:cols="data[0]" v-bind:key="name">
            <b-form-group class="mb-2" label-class="small text-muted" v-bind:label="name" v-bind:label-for="'inputRankParam_' + name">
              <b-form-input size="sm" v-bind:id="'inputRankParam_' + name" v-model="form[name]"></b-form-input>
            </b-form-group>
          </b-col>
        </b-form-row>
      </transition>
      <b-form-group>
        <b-button class="mt-2 px-4" variant="primary" v-bind:disabled="loading" v-on:click="submit">
          <span v-if="loading"><b-spinner small></b-spinner> 请稍候...</span>
          <span v-else>查询</span>
        </b-button>
      </b-form-group>
    </b-form>
    <div v-if="result">
      <hr>
      <div class="mb-2 text-right">
        <b-form-input type="search" class="d-inline-block" style="max-width:15rem;" placeholder="搜索表格..."
                      autocomplete="off" v-if="!loading" size="sm" v-model="table.filter"></b-form-input>
      </div>
      <b-table small hover responsive show-empty class="text-nowrap" primary-key="id" v-bind:filter="table.filter"
               sort-by="score" sort-desc v-bind:items="result" v-bind:fields="table.fields" v-bind:busy="loading"
               v-bind:per-page="table.perPage" v-bind:current-page="table.currentPage" v-on:filtered="onFiltered"
               v-bind:dark="$colorMode.value === 'dark'">
        <template v-slot:table-busy>
          <div class="text-center text-primary my-2">
            <b-spinner class="align-middle mr-2"></b-spinner>
            <strong>数据加载中...</strong>
          </div>
        </template>
      </b-table>
      <b-pagination align="right" v-if="!loading" v-model="table.currentPage" first-number last-number
                    v-bind:total-rows="table.rows" v-bind:per-page="table.perPage"></b-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: "RankPage",
    data() {
      return {
        form: {
          orgId: "",
          gradeId: "",
          classId: "",
          schoolyearId: "",
          schoolsemesterId: ""
        },
        includeGrade: false,
        enableAdvanced: false,
        advancedFields: {
          orgId: [4, "orgId"],
          gradeId: [3, "gradeId"],
          classId: [5, "classId"],
          schoolyearId: [6, "yearId"],
          schoolsemesterId: [6, "semesterId"]
        },
        result: null,
        loading: false,
        table: {
          rows: 0,
          filter: "",
          perPage: 15,
          currentPage: 1,
          fields: [
            { key: "id", label: "教育 ID", sortable: true },
            { key: "name", label: "姓名", sortable: true },
            { key: "count", label: "记录数", sortable: true },
            { key: "score", label: "分数", sortable: true },
          ]
        }
      }
    },
    methods: {
      submit() {
        this.loading = true
        let form = {}
        if (this.enableAdvanced) {
          form = _.merge({ custom: "yes" }, this.form)
        } else form = {
          custom: "no",
          grade: this.includeGrade ? "yes" : "no"
        }
        this.$axios.$get("user/rank", {
          params: form
        }).then((data) => {
          this.result = data
          this.table.rows = data.length
        }).catch((error) => {
          console.error(error)
          alert("查询失败。")
        }).finally(() => {
          this.loading = false
        })
      },
      defaultValues() {
        this.includeGrade = false
        this.enableAdvanced = false
        this.hasResult = false
        this.loading = false
        const userInfo = this.$store.state.userInfo
        if (userInfo && userInfo.term)
          for (let name in this.advancedFields) {
            let userInfoField = this.advancedFields[name][1]
            this.form[name] = userInfo.term[userInfoField].toString() || ""
          }
      },
      onFiltered(items) {
        this.table.rows = items.length
        this.table.currentPage = 1
      }
    },
    mounted() {
      this.defaultValues()
    }
  }
</script>
