const { appId, openId, headers } = require('./config')
const { post, getCurrentTime } = require('./utils')
const { downloadHandle } = require('../../libs/downloadResource')
const { checkDirAndMk } = require('../../libs/file')
const { sleep } = require('../../libs/common')

const path = require('path')
const fsExtra = require('fs-extra')

const Bagpipe = require('bagpipe')

const bagpipe = new Bagpipe(10, {
  timeout: 6000
})
const url = '/photoList'

const fileSaveBasePath = path.resolve(__dirname, './images')

const photoListImageList = path.resolve(__dirname, './datas/photoLists')
const saveImageUrlsBasePath = path.join(photoListImageList, 'imageList.txt')

fsExtra.writeFileSync(saveImageUrlsBasePath, '')

async function fetchPhotoList(homepage_id, page) {
  await sleep(3)
  const params = {
    homepage_id,
    classify_id: 0,
    album_id: 0,
    page,
    limit: 10,
    action: "cover",
    version: 1,
    appid: appId,
    openid: openId,
    timestamp: getCurrentTime()
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

    if (result) {
      const { code, data } = result

      if (code === 1) {
        const { photoList } = data
        console.log('====', photoList)
        // const homePath= path.join(fileSaveBasePath, homepage_id.toString())
        const saveBasePath = path.join(photoListImageList, homepage_id + '_data.json')
        // checkDirAndMk(homePath)
        checkDirAndMk(photoListImageList)
        checkDirAndMk(photoListImageList)

        if (page === 1) {
          fsExtra.writeFileSync(saveBasePath, '{')
        }
        let imageUrl = ''
        photoList.map(item => {
          imageUrl += `${item.url}
`
        })
        fsExtra.appendFileSync(saveBasePath, `
${page}: ${JSON.stringify(photoList, null, 2)},
`)

        fsExtra.appendFileSync(saveImageUrlsBasePath, imageUrl)

        if (photoList.length === 10) {
          bagpipe.push(fetchPhotoList, homepage_id, page + 1)
        }
      }
    }
  } catch (e) {
    console.log('===========', e)
    bagpipe.push(fetchPhotoList, homepage_id, page)
  }
}

const baseFilePath = path.resolve(__dirname, './datas')
const authorIds = path.resolve(baseFilePath, './authorIds.txt')

const ids = fsExtra.readFileSync(authorIds).toString().split('\n')

for (let i = 0; i < ids.length; i++) {
  bagpipe.push(fetchPhotoList, ids[i], 1)
}


// fetchPhotoList(6910, 1)

// module.exports = {
//   fetchPhotoList
// }