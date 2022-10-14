import PRequetst from "../request/index"

export function getCityAll () {

    return PRequetst.get({
        url: "/city/all"
    })


}