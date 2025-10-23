import { defineEventHandler } from 'h3'

const navigation = [
  { label: '首   页', to: '/' },
  { label: '关于我们', to: '/about' },
  { label: '新闻中心', to: '/news' },
  { label: '党的建设', to: '/party-building' },
  { label: '业务概览', to: '/business-overview' },
  { label: '信息披露', to: '/disclosure' },
  { label: '融和e保', to: '/integrated-services' },
  { label: '公示公告', to: '/announcements' },
  { label: '联系我们', to: '/contact' },
]

export default defineEventHandler(() => navigation)
