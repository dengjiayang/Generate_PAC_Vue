//导入request.ts 目录下的$http
import $http from "./request";

export function getHello(data:any):any{
  return $http({
    url: '/hello',
    method: 'get',
    params: data
  })
}
export function getPacUrl(data: any): any{
  return $http({
    url: '/pacurl',
    method: 'get',
    data
  })
}
