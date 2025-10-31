import { getQuery } from 'h3'

import dataset from './dataset'

export default defineEventHandler((event) => {
  const { q = '' } = getQuery(event)
  const keyword = String(q ?? '').trim().toLowerCase()

  if (!keyword) {
    return {
      total: 0,
      items: [],
    }
  }

  const matched = dataset.filter((item) =>
    `${item.title} ${item.summary}`.toLowerCase().includes(keyword),
  )

  return {
    total: matched.length,
    items: matched,
  }
})
