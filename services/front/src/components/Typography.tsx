import React from 'react'

type VariantType = 'h6' | 'subtitle' | 'body'
export type ColorType = 'primary' | 'success' | 'error' | 'light_gray'

type Props = {
  variant: VariantType
  color: ColorType
  contentText: string

  style?: {
    textDecoration?: React.CSSProperties['textDecoration']
    fontSize?: React.CSSProperties['fontSize']
    fontWeight?: React.CSSProperties['fontWeight']
  }
}

const Typography = (props: Props) => {
  const { style, contentText } = useTypography(props)

  return <span style={style}>{contentText}</span>
}

export default Typography

const useTypography = ({
  variant,
  color,
  contentText,
  style: parentStyle
}: Props) => {
  const mapColorToColorProperty: Record<
    ColorType,
    React.CSSProperties['color']
  > = {
    primary: '#000000',
    success: '#1B5E20',
    error: '#B71C1C',
    light_gray: '#999999'
  }

  const mapVariantToFontProperty: Record<VariantType, React.CSSProperties> = {
    h6: {
      fontSize: '1.1rem',
      fontWeight: 600,
      lineHeight: '1.6'
    },
    subtitle: {
      fontSize: '0.75rem',
      lineHeight: '1.6'
    },
    body: {
      fontSize: '1rem',
      lineHeight: '1.6'
    }
  }

  const style: React.CSSProperties = {
    color: mapColorToColorProperty[color],
    fontFamily: 'roboto, sans-serif',
    ...mapVariantToFontProperty[variant],
    ...parentStyle
  }

  return {
    style,
    contentText
  }
}
