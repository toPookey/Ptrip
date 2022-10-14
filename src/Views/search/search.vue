<script setup>
import useSearchStore from "@/stores/modules/search"
import { storeToRefs } from 'pinia';
import {ref} from "vue"
import NavBar from '@/components/nav-bar/nav-bar.vue';
import SearchBar from '@/components/searchBar/search-bar.vue';
import DropdownSelect from '@/components/dropdown-select/dropdown-select.vue';
import TabSelect from '@/components/tab-select/tab-select.vue'
import SearchListItem from '@/components/search-list-item/search-list-item.vue'
import SearchPanel from './cpns/search-panel/search-panel.vue'


const PLACEHOLDER = "搜索广州的景点、地标、房源";

const searchStore = useSearchStore()

//请求位置的数据
searchStore.fetchSearchConditions()

//请求房子的的数据
searchStore.fetchSearchHouse()
//请求搜索宽下面的内容
searchStore.fetchgetGuessulike()

//定义变量

const showSearchPanel = ref(false);
const showCancelIcon = ref(false);
const keyWord = ref(PLACEHOLDER);

const {searchConditions,searchHouse, guessulike } = storeToRefs(searchStore) 



//定义方法
const handleSearchClick = () => {
  showSearchPanel.value = true;
};
const handleCancelClick = () => {
  keyWord.value = PLACEHOLDER;
  showCancelIcon.value = false;
};
const handleCancel = () => {
  showSearchPanel.value = false;
};
const handleSearch = () => {};
const handleTagClick = (value) => {
  showSearchPanel.value = false;
  if (value.keyWord) {
    showCancelIcon.value = true;
    keyWord.value = value.keyWord;
  } else {
    showCancelIcon.value = false;
  }
};

const handleResultItemClick = (item) => {
  handleTagClick({
    keyWord: item.name,
  });
};


</script>

<template>
  <div class="search topPage">
<div class="search-nav-bar">
<nav-bar>
  <template #title>
          <search-bar
            :title="$route.query.city"
            :key-word="keyWord"
            :cancel-icon="showCancelIcon"
            @cancel-click="handleCancelClick"
            @searchClick="handleSearchClick"
          ></search-bar>
        </template>

</nav-bar>
<!-- 位置、筛选、排序 -->
<dropdown-select :items-data="searchConditions"></dropdown-select>

<!-- 优惠、多人入住 -->
<div class="tab-wrapper">
        <tab-select :items-data="searchHouse.hotFilters"></tab-select>
      </div>

</div>

<div class="list">
      <template v-for="(item, index) in searchHouse.items">
        <search-list-item :item-data="item"></search-list-item>
      </template>
    </div>

   <!-- 点击搜索显示搜索面板 -->
   <search-panel
      v-if="showSearchPanel"
      :searchPanelDatas="guessulike.groups"
      @cancel="handleCancel"
      @search="handleSearch"
      @tag-click="handleTagClick"
      @result-item-click="handleResultItemClick"
    >
    </search-panel>    
  </div>
</template>


<style lang="less" scoped>
:deep(.van-sticky--fixed .guide-login) {
  margin-left: 0;
  margin-right: 0;
}
.search {
  overflow: hidden;
  width: 100%;
  height: 100%;
  .search-nav-bar {
    position: fixed;
    width: 100%;
    z-index: 100;
  }
  .search-conditions {
    padding-top: 46px;
  }
  .tab-wrapper {
    padding: 12px 0 10px 20px;
    background-color: #f7f8fb;
  }
  .list {
    padding: 141px 20px 0 20px;
    z-index: -1;
    position: relative;
  }
}
    
</style>