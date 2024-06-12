import os from 'os'
import fs from 'fs'
import path from 'path'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkFrontmatter from 'remark-frontmatter'
import remarkStringify from 'remark-stringify'
import type { Node } from 'unist'
import hash from 'hash-sum'

interface ExtraNode extends Node {
  children?: Array<ExtraNode>
  [key: string]: any
}
const ScriptSetupRegex = /^<script\s(.*\s)?setup(\s.*)?>([\s\S]*)<\/script>$/

const combineVirtualModule = (id: string, key: string, lang: string) =>
  `virtual:${path.basename(id)}.${key}.${lang}`

export async function markdownToComponent(
  code: string,
  id: string,
  root: string
) {
  const _blocks: { lang: string; code: string; key: string }[] = []
  const parsed = await unified()
    .use(remarkParse)
    .use(remarkFrontmatter)
    .use(() => (tree: ExtraNode) => {
      let seed = 0
      const scriptSetup = { index: -1, content: '' }
      tree.children?.forEach((node, index) => {
        try {
          if (node.type === 'html') {
            const m = node.value.trim().match(ScriptSetupRegex)
            if (!m) return false
            scriptSetup.index = index
            scriptSetup.content = m[3] ?? ''
          }
          if (!node.children || !node.children[0].value) return false

          const hasDemo = node.children[0].value.trim().match(/demo\s*(.*)$/)
          const nextNodeIsCode =
            hasDemo && tree.children![index + 1].type === 'code'

          if (nextNodeIsCode) {
            const hashKey = hash(`${id}-demo-${seed}`)
            _blocks.push({
              lang: tree.children![index + 1].lang,
              code: tree.children![index + 1].value,
              key: hashKey
            })
            node.children[0].value += ` Virtual-${hashKey}`
            seed++
          }

          const hasSrc = node.children[0].value
            .trim()
            .match(/^:::demo\s*(src=.*)\s*:::$/)
          if (hasSrc) {
            const markdownId = path.relative(root, id)
            const sourceFile =
              hasSrc && hasSrc.length > 1 ? hasSrc[1]?.split('=')[1].trim() : ''

            handleCacheFile(markdownId, path.join(sourceFile))
            const lang = path.extname(sourceFile).slice(1)
            const source = fs.readFileSync(
              path.resolve(path.dirname(id), sourceFile),
              'utf-8'
            )
            const hashKey = hash(`${id}-demo-${seed}`)
            _blocks.push({
              lang,
              code: source,
              key: hashKey
            })
            node.children[0].value = `:::demo src=${sourceFile} Virtual-${hashKey}${os.EOL}:::`
            seed++
          }
        } catch (error) {
          console.error(
            'parse markdown error in function transformCodeToComponent'
          )
          return false
        }
      })
      if (_blocks.length === 0) return

      const virtualModules = _blocks
        .map((b) => {
          const moduleName = combineVirtualModule(id, b.key, b.lang)
          return `import Virtual${b.key} from '${moduleName}'`
        })
        .join(os.EOL)

      if (scriptSetup.index !== -1) {
        const node = tree.children![scriptSetup.index]
        node.value = node.value.replace(
          ScriptSetupRegex,
          (m: string, ...args: string[]) => {
            return `<script ${args[0] ?? ''} setup ${args[1] ?? ''}>${
              os.EOL
            }${virtualModules}${os.EOL}${args[2] ?? ''}</script>`
          }
        )
      } else {
        tree.children?.push({
          type: 'html',
          value: `<script setup>${os.EOL}${virtualModules}${os.EOL}</script>`
        })
      }
    })
    .use(remarkStringify)
    .process(code)

  const blocks = _blocks.map((b) => {
    const moduleName = combineVirtualModule(id, b.key, b.lang)
    cacheCode.set(b.key, b.code)
    return { ...b, id: moduleName }
  })
  return { parsedCode: String(parsed), blocks }
}

function handleCacheFile(mdId: string, file: string) {
  const prev: string[] = cacheFile.get(mdId) ?? []
  const files = Array.from(new Set([...prev.filter(Boolean), file]))
  cacheFile.set(mdId, files)
}

export const cacheCode = new Map<string, string>()
export const cacheFile = new Map<string, string[]>()
