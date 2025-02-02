const { generateTagFormatter } = require('../../libs/format_styled_components')

const EXPECTED_NAMES = {
  'Img$': 'Img$',
  'Image$': 'Image$',
  'Icon$': 'Icon$',
  '^(img|svg)$': '(Img|Image|Icon)$',
}

const isWithinSvgJsxElement = (node) => {
  if (
    node.type === 'JSXElement' &&
    node.openingElement.name?.name === 'svg'
  ) {
    return true
  }

  if (!node.parent) {
    return false
  }

  return isWithinSvgJsxElement(node.parent)
}

module.exports = {
  meta: {
    type: 'problem',
    schema: [],
  },
  create(context) {
    return {
      ...generateTagFormatter({ context, EXPECTED_NAMES }),
      JSXOpeningElement: (node) => {
        const matcher = (node.name.name || '').match(/(img|image)$/i) // HINT: Iconは別途テキストが存在する場合が多いためチェックの対象外とする
        if (matcher) {
          const alt = node.attributes.find((a) => a.name?.name === 'alt')

          let message = ''

          if (!alt) {
            if (matcher.input !== 'image' || !isWithinSvgJsxElement(node.parent)) {
              message = '画像にはalt属性を指定してください。SVG component の場合、altを属性として受け取れるようにした上で `<svg role="img" aria-label={alt}>` のように指定してください。画像ではない場合、img or image を末尾に持たない名称に変更してください。'
            }
          } else if (alt.value.value === '') {
            message = '画像の情報をテキストにした代替テキスト（`alt`）を設定してください。装飾目的の画像など、alt属性に指定すべき文字がない場合は背景画像にすることを検討してください。'
          }

          if (message) {
            context.report({
              node,
              message,
            });
          }
        }
      },
    }
  },
}
module.exports.schema = []
