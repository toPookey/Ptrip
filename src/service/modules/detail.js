import PRequetst from "../request/index"

export function getDetailData (houseId) {

    return PRequetst.get({
        url: "/detail/infos",
        params: {
            houseId: houseId
        }
    })


}