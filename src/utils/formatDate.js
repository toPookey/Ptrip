import dayjs from "dayjs";


export function formatMonthDay(date, formatStr = "MM月DD日") {

  return dayjs(date).format(formatStr)

}

export function getDiffDate(start, end) {
    return dayjs(end).diff(start,"day")
}