import { mkdir, readdir, writeFile } from 'fs/promises'
import { $$ } from '@/pipeline'

async function build_pipeline() {
  let res = 'res/pipeline'
  if (process.argv.length >= 3) {
    res = process.argv[2]
  }

  let dist = 'dist'
  if (process.argv.length >= 4) {
    dist = process.argv[3]
  }
  for (const path of await readdir(res)) {
    if (!/.ts$/.test(path)) {
      continue
    }
    await import(`../${res}/${path}`)
  }
  try {
    const obj = $$()
    await mkdir(`${dist}/partial`, { recursive: true })

    const writeObject = async (
      outDir: string,
      fileScope: string,
      obj: unknown
    ) => {
      await writeFile(
        `${outDir}/${fileScope}.json`,
        JSON.stringify(
          obj,
          (key, value) => {
            if (key == 'name') {
              return undefined
            }
            if (value instanceof Array) {
              return value
            } else if (typeof value === 'object') {
              const res = {}
              for (const k in value) {
                if (!k.endsWith('@meta')) {
                  res[k] = value[k]
                }
              }
              return res
            } else {
              return value
            }
          },
          2
        )
      )
    }

    await writeFile(`${dist}/all.meta.json`, JSON.stringify(obj, null, 2))

    const objs: Record<string, Record<string, unknown>> = {}
    for (const k in obj) {
      const m = /^(.+)\.([^.]+)$/.exec(k)
      if (!m) {
        console.warn(`Unknown key: ${k}`)
        continue
      }
      const sc = m[1]
      const kk = m[2]
      if (!(sc in objs)) {
        objs[sc] = {}
      }
      objs[sc][k] = obj[k]
    }
    for (const sc in objs) {
      await writeObject(`${dist}/partial`, sc, objs[sc])
    }
  } catch (err) {
    console.error(err)
  }
}

build_pipeline()
