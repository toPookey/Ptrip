import { defineStore } from "pinia";
import {getHotSuggests,getCategories,getHomeList } from "@/service";

const useHomeStore = defineStore("home", {
  state: () => ({
   hotSuggests: [{
    tagText: {
      text: '正在拼命加载中......',
      color: "#3F4954",
      background: {
        color: "#F1F3F5"
      }
    }
    
   }],

 categories: [],
 currentPage: 1,
 homeList: []
    
  }),
  actions: {

   async fetchHotSuggests() {

         const res = await getHotSuggests()
         this.hotSuggests = res.data
    },
    
    async fetchHomeCategories () {
      
      const res = await getCategories()
     this.categories = res.data

    },
   async fechHomeList () {

    const res = await getHomeList (this.currentPage)
    this.homeList.push(...res.data) 
    this.currentPage ++
   }


  }


})
export default useHomeStore