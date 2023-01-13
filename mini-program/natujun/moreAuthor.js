const { appId, openId, headers } = require('./config')
const { post, getCurrentTime } = require('./utils')
const { fetchPhotoList } = require('./photoList')
const path = require('path')
const fsExtra = require('fs-extra')

const Bagpipe = require('bagpipe')
const { sleep } = require('../../libs/request')

const bagpipe = new Bagpipe(10, {
  timeout: 6000
})
const url = '/moreAuthor'

const baseFilePath = path.resolve(__dirname, './datas')
const authorListJson = path.resolve(baseFilePath, './authorList.json')
const authorIds = path.resolve(baseFilePath, './authorIds.txt')

fsExtra.writeFileSync(authorListJson, '{')

async function fetch(page) {
  await sleep(3)
  const params = {
    appid: appId,
    limit: 10,
    openid: openId,
    page,
    timestamp: getCurrentTime(),
    version: 1,
  }

  try {
    const res = await post(url, params, true, headers)

    const result = (() => {
      try {
        return JSON.parse(res)
      } catch (e) {
        return null
      }
    })()

    console.log('========', result)

    if (result) {
      const { code, data } = result
      if (code === 1) {
        const { list } = data
        // for (let i = 0; i < list.length; i++) {
        //   const item = list[i]
        //   // 开启子进程
        //   // bagpipe.push(fetchPhotoList, item.id, 1)
        // }

        let ids = ''
        list.map(item => {
          ids += `${item.id}
`
          return item.id
        })

        fsExtra.appendFileSync(authorListJson, `
${page}: ${JSON.stringify(list, null, 2)},
`)
        fsExtra.appendFileSync(authorIds, ids)

        if (list.length === 10) {
          bagpipe.push(fetch, page + 1)
        }
      }
    }
  } catch (e) {
    console.log('=====++++====', e)
    bagpipe.push(fetch, page)
  }

}

async function main() {
  fetch(1)
}



main()