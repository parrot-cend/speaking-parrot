import request from '@/utils/request'
import { SourceConfig } from '@/utils/types'

export function getTemplateByConfig(data: SourceConfig) {
  request({
    url: '/config',
    method: 'post',
    data
  })
}
