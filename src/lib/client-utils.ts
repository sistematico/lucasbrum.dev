export function formatDate(date: string, includeRelative = true, dayMonth = false) {
  const currentDate = new Date()
  if (!date.includes('T')) date = `${date}T00:00:00`
  const targetDate = new Date(date)
  
  const rawDay = targetDate.getDate().toString()
  const rawMonth = targetDate.getMonth().toString()

  const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear()
  const monthsAgo = currentDate.getMonth() - targetDate.getMonth()
  const daysAgo = currentDate.getDate() - targetDate.getDate()

  let formattedDate = ''

  if (yearsAgo > 0) {
    if (yearsAgo === 1) formattedDate = 'ano passado'
    else formattedDate = `${yearsAgo} anos atrás`
  } else if (monthsAgo > 0) {
    if (monthsAgo === 1) formattedDate = `${monthsAgo} mês atrás`
    else formattedDate = `${monthsAgo} meses atrás`
  } else if (daysAgo > 0) {
    if (daysAgo === 1) formattedDate = 'ontem'
    else formattedDate = `${daysAgo} dias atrás`
  } else {
    formattedDate = 'hoje'
  }

  const fullDate = targetDate.toLocaleString('pt-br', { month: 'long', day: 'numeric' })
  const day = rawDay.padStart(2, '0')
  const month = rawMonth.padStart(2, '0')
  
  if (dayMonth) return `${day}/${month}`
  if (!includeRelative) return fullDate
  return `${fullDate} (${formattedDate})`
}

// Função para gerar cores de fundo baseadas no nome da categoria
export function getCategoryColor(category: string): string {
  const colors = {
    typescript:
      'bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800',
    javascript:
      'bg-yellow-50 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800',
    react:
      'bg-cyan-50 text-cyan-800 border-cyan-200 dark:bg-cyan-900/30 dark:text-cyan-300 dark:border-cyan-800',
    nextjs:
      'bg-black/5 text-gray-800 border-gray-200 dark:bg-white/10 dark:text-gray-300 dark:border-gray-700',
    css: 'bg-pink-50 text-pink-800 border-pink-200 dark:bg-pink-900/30 dark:text-pink-300 dark:border-pink-800',
    html: 'bg-orange-50 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800',
    node: 'bg-green-50 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800'
  }

  return (
    colors[category.toLowerCase() as keyof typeof colors] ||
    'bg-gray-50 text-gray-800 border-gray-200 dark:bg-gray-800/50 dark:text-gray-300 dark:border-gray-700'
  )
}

// Função para gerar cores de tags (mais suaves que as de categorias)
export function getTagColor(tag: string): string {
  const colors = {
    typescript:
      'bg-blue-50/70 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300',
    javascript:
      'bg-yellow-50/70 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300',
    programming:
      'bg-purple-50/70 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300',
    react: 'bg-cyan-50/70 text-cyan-700 dark:bg-cyan-900/20 dark:text-cyan-300',
    array:
      'bg-green-50/70 text-green-700 dark:bg-green-900/20 dark:text-green-300',
    random:
      'bg-orange-50/70 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300',
    nextjs: 'bg-black/5 text-gray-700 dark:bg-white/5 dark:text-gray-300',
    css: 'bg-pink-50/70 text-pink-700 dark:bg-pink-900/20 dark:text-pink-300',
    html: 'bg-orange-50/70 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300',
    node: 'bg-green-50/70 text-green-700 dark:bg-green-900/20 dark:text-green-300'
  }

  return (
    colors[tag.toLowerCase() as keyof typeof colors] ||
    'bg-gray-50/70 text-gray-700 dark:bg-gray-800/30 dark:text-gray-300'
  )
}