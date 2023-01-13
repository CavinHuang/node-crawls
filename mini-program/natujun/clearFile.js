const path = require('path')
const fsExtra = require('fs-extra')
const imageSize = require('image-size')
const { checkDirAndMk } = require('../../libs/file')

const photoListImageList = path.resolve(__dirname, './datas/photoLists')
const saveImageUrlPath = path.resolve(photoListImageList, '../images')
const saveAvatarImageUrlPath = path.resolve(photoListImageList, '../avatart')
const savePaperImageUrlPath = path.resolve(photoListImageList, '../wallpaper')

checkDirAndMk(saveAvatarImageUrlPath)
checkDirAndMk(savePaperImageUrlPath)


const files = fsExtra.readdirSync(saveImageUrlPath)

// files.forEach(file => {
//   const filePath = path.join(saveImageUrlPath, file)
//   const size = fsExtra.statSync(filePath).size
//   console.log('文件：' + filePath, '大小：' + size)
//   if (size === 0) {
//     fsExtra.removeSync(filePath)
//     console.log('文件：' + filePath, '删除成功')
//   }
// })

const fileInfo = {
  avatar: [],
  wallPaper: []
}

files.forEach(file => {
  const filePath = path.join(saveImageUrlPath, file)
  const size = imageSize(filePath)

  if (Math.abs(size.width - size.height) > 200) {
    // 壁纸
    fsExtra.moveSync(filePath, path.join(savePaperImageUrlPath, file))
    fileInfo.wallPaper.push(file)
  } else {
    // 头像
    fsExtra.moveSync(filePath, path.join(saveAvatarImageUrlPath, file))
    fileInfo.avatar.push(file)
  }
})

fsExtra.writeFileSync(path.resolve(__dirname, './fileInfo.json'), JSON.stringify(fileInfo))