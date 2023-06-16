const pick = ({
  texts,
  path,
  quantity
}: {
  texts: Record<string, unknown>
  path: string
  quantity?: number
}): string => {
  if (texts[path] === undefined) {
    console.error('Translation not found')
    return ''
  } else {
    const currText = texts[path] as Record<string, unknown> | string
    if (quantity !== undefined && typeof currText !== 'string') {
      if (quantity >= 2) {
        return currText.plural as string
      } else {
        return currText.singular as string
      }
    } else {
      return texts[path] as string
    }
  }
}

export default pick
