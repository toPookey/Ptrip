import { defineStore } from "pinia";
import localCache from "@/utils/cache";
const CACHE_SERACH_HISTORY = "CACHE_SERACH_HISTORY";
import {getSearchConditions, getSearchHouse, getGuessulike, keywordsearchsuggest} from "@/service"
const useSearchStore = defineStore("search", {
  state: () => ({
   searchConditions: [],
   searchHouse:{},
   guessulike: {},
   searchHistorys: [],
    
  }),

  getters: {
    getSearchHistorys: (state) => {
      let historys = state.searchHistorys || [];
      if (historys.length) {
        // 本地读取
        historys = localCache.getCache(CACHE_SERACH_HISTORY) || [];
      }
      historys = historys.reverse();
      return historys.map((item) => {
        return {
          itemType: "搜索历史",
          name: item,
        };
      });
    },
  },
  actions: {

    async fetchSearchConditions() {

         const res = await getSearchConditions()
         this.searchConditions = res.data.data.allConditions
      
    },

    async fetchSearchHouse() {

     const res = await getSearchHouse()
    this.searchHouse = res.data.data

    },
    async fetchgetGuessulike() {
     
        const res = await getGuessulike()
        this.guessulike = res.data
   
    },
    addSearchHistory(keyWorld) {
      if (!this.searchHistorys.includes(keyWorld)) {
        this.searchHistorys.push(keyWorld);
      }
      // 只缓存10个历史记录
      let len = this.searchHistorys.length;
      if (len >= 10) {
        this.searchHistorys = this.searchHistorys.slice(len - 10, len);
      }
      // 本地读取
      localCache.setCache(CACHE_SERACH_HISTORY, this.searchHistorys);
    },
    initSearchHistory() {
      this.searchHistorys = localCache.getCache(CACHE_SERACH_HISTORY) || [];
    },
    clearSearchHistory() {
      this.searchHistorys = [];
      localCache.deleteCache(CACHE_SERACH_HISTORY);
    },



  }


})
export default useSearchStore