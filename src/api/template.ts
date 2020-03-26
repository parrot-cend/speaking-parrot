import { SourceConfig } from '@/utils/nodeUtils/types'
import request from '@/utils/request'
import { AxiosPromise } from 'axios'

export function getTemplateByConfig(data: SourceConfig): AxiosPromise<string> {
  return request({
    url: '/config',
    method: 'post',
    data
  })
}
