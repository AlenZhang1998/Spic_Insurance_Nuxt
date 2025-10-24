const assetModules = import.meta.glob('@/assets/**/*', {
  eager: true,
  import: 'default',
})

const assetMap: Record<string, string> = {}

Object.entries(assetModules).forEach(([key, value]) => {
  const normalized = key
    .replace(/^.*[\\/]assets[\\/]/, '')
    .replace(/\\/g, '/')

  assetMap[normalized] = value as string
})

export const resolveAssetPath = (path?: string | null): string => {
  if (!path) {
    return ''
  }
  if (path.startsWith('http') || path.startsWith('/')) {
    return path
  }
  return assetMap[path] || ''
}

