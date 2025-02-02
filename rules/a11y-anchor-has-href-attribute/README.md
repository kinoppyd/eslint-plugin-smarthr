# smarthr/a11y-anchor-has-href-attribute

- a, Anchor, Link コンポーネントに href 属性を設定することを促すルールです
  - href が設定されていないanchor要素は `遷移先が存在しない無効化されたリンク` という扱いになります
  - URLの変更を行わない場合、責務としても a より button が適切です
  - URL遷移を行う場合、hrefが設定されていないとキーボード操作やコンテキストメニューからの遷移ができなくなります
    - これらの操作は href属性を参照します
  - 無効化されたリンクであることを表したい場合 `href={undefined}` を設定してください

## rules

```js
{
  rules: {
    'smarthr/a11y-anchor-has-href-attribute': 'error', // 'warn', 'off'
  },
}
```

## ❌ Incorrect

```jsx
<a>any</a>
<XxxAnchor>any</XxxAnchor>
<XxxLink>any</XxxLink>
<XxxLink href>any</XxxLink>
```

## ✅ Correct

```jsx
<a href="https://www.google.com/search">any</a>
<XxxAnchor href={hoge}>any</XxxAnchor>
<XxxLink href={undefined}>any</XxxLink>
```
