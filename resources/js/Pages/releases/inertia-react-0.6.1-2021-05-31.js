import React from 'react'
import dedent from 'dedent-js'
import { A, Code, CodeBlock, H1, Layout, P } from '@/Components'

const meta = {
  title: 'inertia-react@0.6.1',
}

const Page = () => {
  return (
    <>
      <H1>inertia-react@0.6.1</H1>
      <div className="-mt-8 mb-12 text-base font-medium text-gray-600">Published on May 31, 2021</div>
      <P>
        This release adds a new <Code>createInertiaApp()</Code> setup method to make configuring Inertia easier (
        <A href="https://github.com/inertiajs/inertia/pull/698">#698</A>). Here's how to use it:
      </P>
      <P>Before:</P>
      <CodeBlock
        language="js"
        children={dedent`
          import React from 'react'
          import { render } from 'react-dom'
          import { App } from '@inertiajs/inertia-react'\n
          const el = document.getElementById('app')\n
          render(
            <App
              initialPage={JSON.parse(el.dataset.page)}
              resolveComponent={name => require(\`./Pages/\${name}\`).default}
            />,
            el
          )
        `}
      />
      <P>After:</P>
      <CodeBlock
        language="js"
        children={dedent`
          import React from 'react'
          import { render } from 'react-dom'
          import { createInertiaApp } from '@inertiajs/inertia-react'\n
          createInertiaApp({
            resolve: name => require(\`./Pages/\${name}\`),
            setup({ el, App, props }) {
              render(<App {...props} />, el)
            },
          })
        `}
      />
      <P>
        Note that you no longer need to manually return the <Code>default</Code> export, as Inertia now handles this
        automatically.
      </P>
      <CodeBlock
        language="diff"
        children={dedent`
          createInertiaApp({
          - resolve: name => require(\`./Pages/\${name}\`).default,
          + resolve: name => require(\`./Pages/\${name}\`),
          })
        `}
      />
      <P>Same goes for if you're using code splitting:</P>
      <CodeBlock
        language="diff"
        children={dedent`
          createInertiaApp({
          - resolve: name => import(\`./Pages/\${name}\`).then(module => module.default),
          + resolve: name => import(\`./Pages/\${name}\`),
          })
        `}
      />
      <P>
        By default Inertia uses <Code>app</Code> as the root element that your app will boot in. However, you can change
        this using the <Code>id</Code> property:
      </P>
      <CodeBlock
        language="js"
        children={dedent`
          createInertiaApp({
            id: 'my-custom-div',
          })
        `}
      />
    </>
  )
}

Page.layout = page => <Layout children={page} meta={meta} />

export default Page
