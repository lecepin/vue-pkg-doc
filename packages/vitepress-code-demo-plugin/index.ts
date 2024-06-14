import fs from 'fs'
import path from 'path'
import type { Plugin } from 'vite'
import type MarkdownIt from 'markdown-it'
import type { PluginSimple } from 'markdown-it'
import container from 'markdown-it-container'
import { cacheCode, cacheFile, markdownToComponent } from './remark'

interface PreviewPluginOptions {
  componentName?: string
}

export function viteDemoPreviewPlugin(): Plugin {
  let vitePlugin: any
  const options = {
    mode: 'vitepress',
    root: ''
  }
  const virtualModRegex = /^virtual:.*\.md\.([a-zA-Z0-9]+)\.(vue|jsx|tsx)$/
  return {
    name: 'vite-plugin-code-preview',
    enforce: 'pre',
    async configResolved(config) {
      const isVitepress = config.plugins.find((p) => p.name === 'vitepress')
      vitePlugin = config.plugins.find((p) => p.name === 'vite:vue')
      options.mode = isVitepress ? 'vitepress' : 'vite'
      options.root = path.resolve(config.root)
    },
    resolveId(id) {
      if (virtualModRegex.test(id)) return id
    },
    load(id) {
      const m = id.trim().match(virtualModRegex)
      if (m) {
        const key = m.length > 1 ? m[1] : ''
        return cacheCode.get(key)
      }
    },
    async transform(code, id) {
      if (!id.endsWith('.md')) return
      const { parsedCode } = await markdownToComponent(
        code,
        path.resolve(id),
        options.root
      )
      return { code: parsedCode, map: null }
    },
    async handleHotUpdate(ctx) {
      const { file, server, read } = ctx
      const manualUpdateRegex = /\.(md|vue|jsx|tsx)$/
      if (!manualUpdateRegex.test(file)) return
      if (file.endsWith('.md')) {
        const content = await read()
        const { parsedCode, blocks } = await markdownToComponent(
          content,
          path.resolve(file),
          options.root
        )
        for (const b of blocks) {
          const virtualModule = server.moduleGraph.getModuleById(b.id)
          if (virtualModule) {
            await server.reloadModule(virtualModule)
          }
        }
        return vitePlugin.handleHotUpdate({
          ...ctx,
          read: () => parsedCode
        })
      } else {
        const fileName = path.relative(options.root, file)
        for (const [key, value] of cacheFile.entries()) {
          if (value.includes(fileName)) {
            const markdownPath = path.resolve(options.root, key)
            const content = fs.readFileSync(markdownPath, 'utf-8')
            const { parsedCode, blocks } = await markdownToComponent(
              content,
              markdownPath,
              options.root
            )
            for (const b of blocks) {
              const virtualModule = server.moduleGraph.getModuleById(b.id)
              if (virtualModule) {
                await server.reloadModule(virtualModule)
              }
            }
            return vitePlugin.handleHotUpdate({
              ...ctx,
              read: () => parsedCode
            })
          }
        }
      }
    }
  }
}

export const demoPreviewPlugin: PluginSimple = (md) => {
  const options = { componentName: 'DemoPreview' }
  md.use(createDemoContainer, options)
  md.use(renderDemoCode)
}

function createDemoContainer(md: MarkdownIt, options: PreviewPluginOptions) {
  const { componentName = 'DemoPreview' } = options
  md.use(container, 'demo', {
    validate(params: string) {
      return !!params.trim().match(/^demo\s*(.*)$/)
    },
    render(tokens: MarkdownIt.Token[], idx: number) {
      const token = tokens[idx]
      if (token.nesting === 1 && token.type === 'container_demo_open') {
        const m = tokens[idx].info
          .trim()
          .match(/^demo\s*(src=.*\s)?(Virtual-([a-zA-Z0-9]+))?$/)
        const virtualId = m && m.length > 2 ? m[2] : ''
        const sourceFile = m && m.length > 1 ? m[1]?.split('=')[1].trim() : ''
        let source = ''
        let lang = ''
        if (sourceFile) {
          lang = path.extname(sourceFile).slice(1)
          source = cacheCode.get(virtualId.split('-')[1])!

          if (!source) throw new Error(`Incorrect source file: ${sourceFile}`)
        } else {
          lang = tokens[idx + 1].info
          source =
            tokens[idx + 1].type === 'fence' ? tokens[idx + 1].content : ''
        }
        return `<${componentName} :isFile="${!!sourceFile}" hlSource="${encodeURIComponent(
          md.options.highlight?.(source, lang, '') ?? ''
        )}" lang="${lang}" source="${encodeURIComponent(source)}">
        <${virtualId?.replace('-', '')} />`
      }
      return `</${componentName}>`
    }
  })
}

function renderDemoCode(md: MarkdownIt) {
  const defaultRender = md.renderer.rules.fence!
  md.renderer.rules.fence = (...args) => {
    const [tokens, idx] = args
    const token = tokens[idx]
    const prevToken = tokens[idx - 1]
    const isInDemoContainer =
      prevToken &&
      prevToken.nesting === 1 &&
      prevToken.info.trim().match(/^demo\s*(.*)$/)
    const lang = token.info.trim()
    if (isInDemoContainer) {
      return `
        <template #highlight>
          <div v-pre class="example-source language-${lang}" >
            <span class="lang">${lang}</span>
            ${md.options.highlight?.(token.content, lang, '')}
          </div>
        </template>`
    }
    return defaultRender?.(...args)
  }
}
