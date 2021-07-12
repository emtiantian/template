import {server} from'./fetch.js'

export function getUser(){
  return server.get({
    url:"/"
  })
}

