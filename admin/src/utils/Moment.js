import moment from "moment/moment";

export function formatDate (date){
  return  moment(date).format("DD-MM-YYYY")
}