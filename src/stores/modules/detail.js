import { defineStore } from "pinia";
import { getDetailData } from "@/service";

const useDetailStore = defineStore("detail", {
  state: () => ({
  

   mainPart: {},
   pricePart: {},
   currentHouse: {},
   swipeData: []
    
  }),
  actions: {

   async fetchHouseDetailData(houseId) {

         const res = await getDetailData(houseId)
          this.mainPart = res.data.mainPart
          this.pricePart = res.data.pricePart
          this.currentHouse = res.data.currentHouse 
          this.swipeData = res.data.mainPart.topModule.housePicture.housePics

        
    }

  }


})
export default useDetailStore