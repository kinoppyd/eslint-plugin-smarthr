const rule = require('../rules/a11y-anchor-has-href-attribute')
const RuleTester = require('eslint').RuleTester

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2018,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
    },
    sourceType: 'module',
  },
})

const generateErrorText = (name) => `${name} に href 属性を設定してください。
 - onClickなどでページ遷移する場合、href属性に遷移先のURIを設定してください。Cmd + clickなどのキーボードショートカットに対応出来ます。
 - onClickなどの動作がURLの変更を行わない場合、リンクではなくbuttonでマークアップすることを検討してください。
 - リンクを無効化することを表したい場合、href属性に undefined を設定してください。`

ruleTester.run('a11y-anchor-has-href-attribute', rule, {
  valid: [
    { code: `import styled from 'styled-components'` },
    { code: `import styled, { css } from 'styled-components'` },
    { code: `import { css } from 'styled-components'` },
    { code: 'const HogeAnchor = styled.a``' },
    { code: 'const HogeLink = styled.a``' },
    { code: 'const HogeAnchor = styled(Anchor)``' },
    { code: 'const HogeLink = styled(Link)``' },
    {
      code: `<a href="hoge">ほげ</a>`,
    },
    {
      code: `<a href={hoge}>ほげ</a>`,
    },
    {
      code: `<a href={undefined}>ほげ</a>`,
    },
    {
      code: `<HogeAnchor href={hoge}>ほげ</HogeAnchor>`,
    },
    {
      code: `<Link href="hoge">ほげ</Link>`,
    },
  ],
  invalid: [
    { code: `import hoge from 'styled-components'`, errors: [ { message: `styled-components をimportする際は、名称が"styled" となるようにしてください。例: "import styled from 'styled-components'"` } ] },
    { code: 'const Hoge = styled.a``', errors: [ { message: `Hogeを正規表現 "/(Anchor|Link)$/" がmatchする名称に変更してください` } ] },
    { code: 'const Hoge = styled(Anchor)``', errors: [ { message: `Hogeを正規表現 "/Anchor$/" がmatchする名称に変更してください` } ] },
    { code: 'const Hoge = styled(Link)``', errors: [ { message: `Hogeを正規表現 "/Link$/" がmatchする名称に変更してください` } ] },
    { code: `<a></a>`, errors: [{ message: generateErrorText('a') }] },
    { code: `<a>hoge</a>`, errors: [{ message: generateErrorText('a') }] },
    { code: `<Anchor>hoge</Anchor>`, errors: [{ message: generateErrorText('Anchor') }] },
    { code: `<HogeLink>hoge</HogeLink>`, errors: [{ message: generateErrorText('HogeLink') }] },
    { code: `<HogeLink href>hoge</HogeLink>`, errors: [{ message: generateErrorText('HogeLink') }] },
  ]
})
