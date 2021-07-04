import {server} from'./fetch.js'

export function getUser(){
  return server.get({
    url:"/"
  })
}
export function getCar(){
  return server.get("/Svc/CarService.svc/GetCarList")
}
export function addCar(data){
  return server.post("/Svc/CarService.svc/AddCars",{"lstCars":data})
}
