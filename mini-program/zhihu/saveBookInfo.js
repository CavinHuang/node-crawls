const path = require('path')
const fs = require('fs')
const { Sitdown } = require("sitdown");
const { applyZhihuRule } = require("@sitdown/zhihu");
const { epubGen } = require("@auramarker/epub-gen");

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
  return title.replace(/[\\|\/|:|\*|\?|\"|\<|\>|\|]/g, ' ')
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

  const markdownContent = sitdown.HTMLToMD(charpt.content)
  fs.writeFileSync(`${charptPath}.md`, markdownContent);
}


module.exports = {
  saveBookInfo,
  saveBookData,
  normalTitle,
};
