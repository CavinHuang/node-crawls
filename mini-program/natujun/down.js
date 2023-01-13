const { downloadHandle } = require('../../libs/downloadResource')
const { checkDirAndMk } = require('../../libs/file')
const { sleep } = require('../../libs/common')
const Axios = require('axios')
const path = require('path')
const fsExtra = require('fs-extra')
const fs = require('fs')

const Bagpipe = require('bagpipe')

const bagpipe = new Bagpipe(10, {
  timeout: 6000
})

const photoListImageList = path.resolve(__dirname, './datas/photoLists')
const saveImageUrlsBasePath = path.join(photoListImageList, 'imageList.txt')
const saveImageUrlPath = path.resolve(photoListImageList, '../images')

checkDirAndMk(saveImageUrlPath)

/**
 * @param {string} imgUrl 图片地址
 * @param {string} filepath 文件保存的本地目录
 * @param {string} flieName 保存的文件名
 */
async function downloadFile(imgUrl, filepath, flieName) {
  await sleep(2)
  return new Promise(async(resolve, reject) => {
    const mypath = path.resolve(filepath, flieName);
      const writer = fs.createWriteStream(mypath); // 创建写入对象
      Axios({
          url: imgUrl,
          method: "GET",
          timeout: 10000,
          responseType: "stream",
      }).then(response => {
        // 请求图片地址获取二进制数据流
        response.data.pipe(writer); // 写入图片数据到文件中
        writer.on("finish", () => {
          console.log('写入成功:', path.join(filepath, flieName))
          resolve(flieName)
        });
        writer.on("error", (e) => {
          console.log('写入失败:', path.join(filepath, flieName))
          reject(e)
        });
      }).catch(e => {
        console.log('请求失败:', imgUrl)
        reject(e)
      })
  });
}

async function downloadImage(imgUrl, filepath, flieName) {
  try {
    await downloadFile(imgUrl, filepath, flieName)
  } catch (e) {
    console.log(e)
  }
}

const images = fsExtra.readFileSync(saveImageUrlsBasePath).toString().split('\n')

for (let i = 0; i < images.length; i++) {
  const url = images[i]
  const urlArr = url.split('/')
  const fileName = urlArr[urlArr.length - 1]
  bagpipe.push(downloadImage, url, saveImageUrlPath, fileName)
}

// downloadFile('https://img.yugew.com/image/62552ab9e6779.jpg', saveImageUrlPath, '62552ab9e6779.jpg')
