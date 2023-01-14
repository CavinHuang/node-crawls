const path = require('path')
const fs = require('fs')
const { Sitdown } = require("sitdown");
const { applyZhihuRule } = require("@sitdown/zhihu");
const { epubGen } = require("@auramarker/epub-gen");
const { default: axios } = require('axios');

let sitdown = new Sitdown({
  keepFilter: ["style"],
  codeBlockStyle: "fenced",
  bulletListMarker: "-",
  hr: "---",
});
sitdown.use(applyZhihuRule);

const jsonPath = path.resolve(__dirname, './data/bookInfo.json')
const bookBasePath = path.resolve(__dirname, './books')

function saveBookInfo(data = []) {
  let fileContent = []
  if (fs.existsSync(jsonPath)) {
    fileContent = JSON.parse(fs.readFileSync(jsonPath))
  }
  data.forEach(data => {
    fileContent.push({
      sku_id: data.sku_id,
      business_id: data.business_id,
      title: data.title,
      image: data.image,
      author: data.author,
      summary: data.summary,
      description: data.description,
      business_url: data.business_url,
    });
  })
  fs.writeFileSync(jsonPath, JSON.stringify(fileContent, null, 2));
}

function normalTitle(title = '') {
  return title.replace(/[\\|\/|:|\*|\?|\"|\<|\>|\|《|》|\r|\n]/g, ' ')
}

function saveBookData(book, charpt = {}) {
  const bookName = normalTitle(book);
  const bookPath = path.resolve(bookBasePath, bookName);
  if (!fs.existsSync(bookPath)) {
    fs.mkdirSync(bookPath, { recursive: true });
  }

  const charptTitle = normalTitle(charpt.title)
  const charptPath = path.join(bookPath, charptTitle);
  console.log('章节数据', charpt)
  console.log("章节数据", charptTitle);
  console.log("章节数据", charptPath);

  // HTML
  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <h1>${charpt.title}</h1>
  ${charpt.content}
</body>
</html>`;
  fs.writeFileSync(`${charptPath}.html`, htmlContent)

  try {
    const markdownContent = sitdown.HTMLToMD(charpt.content)
    fs.writeFileSync(`${charptPath}.md`, markdownContent);
  } catch (e) {
    console.log('转markdown失败')
  }
}

/**
 * @param {string} imgUrl 图片地址
 * @param {string} filepath 文件保存的本地目录
 * @param {string} flieName 保存的文件名
 */
async function downloadFile(imgUrl, filepath, flieName) {
  return new Promise(async(resolve, reject) => {
    if (!fs.existsSync(filepath)) {
      fs.mkdirSync(filepath, { recursive: true });
    }
    const mypath = path.resolve(filepath, flieName);
      const writer = fs.createWriteStream(mypath); // 创建写入对象
      axios({
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


module.exports = {
  saveBookInfo,
  saveBookData,
  normalTitle,
  downloadFile,
};
