const { httpRequest } = require('../../libs/request')
const axios = require('axios')

const url = (page) => `"https://api.zhihu.com/pluton/shelves?limit=${page}&offset=10"`;


const header = {
  Cookie: `_zap=3cc0f52d-abe9-42c9-98d3-465975fd9ba9; _xsrf=YGxKtTfaodx3XafXLsO46WqFLfYmdjSK; Hm_lvt_98beee57fd2ef70ccdd5ca52b9740c49=1672709778,1673312506; d_c0=AEBXshZlHRaPTsBrhraibR2XUmQ62Op7oTg=|1672709778; captcha_session_v2=2|1:0|10:1673312512|18:captcha_session_v2|88:MDdWTDlPM3hYV0ZxYTF0WUROdU0vVG1nQTJ3ZlQ5MkxHcTMyMG9hVkR5cHNyQ3gzYXExQUIrNnBrcFVSVW1Vbw==|88cbea0757f577a2bb28df82285bf2057cea5faad18c915acab482d86184bf62; captcha_ticket_v2=2|1:0|10:1673312527|17:captcha_ticket_v2|704:eyJ2YWxpZGF0ZSI6IkNOMzFfNHBLT083ZklUZzBYUFotQ0RhVkZqWGl4TEtOLmZUcFZoMW5rYnlNcjhGWTBUOUFVZVRIdG1uSDE4QWZ5R3JTVHVnQ0Y2aGRkc0pVd0s1aDY5aWMuZS1maTlsdkpqZ2tETGlqdUZ3VGpmaDhIYmotdzJlV0lLc1FZT0JBa3NuYXJDRXpRbS00U3dLcDhIR0tkU3ZId3ljVkhCNEd5UzlvMDc4dnRwSVQ0aUFoSUtpNGNaQURBRkxWS2VoVWk0LWxVOWtBcXp6MUplbGF5by0uN3ViejVGVTFHYVdCVnBMN1doa2J0SFNDRVNpSnVNaUNrOVp5ZVBpTGJhQ0pFdjhWU2prZ01samRGUWNzd2I2Q2hVWHZJUjhrSnQ5MEptbGFXdUJMX0dIOEppNWhIVXdCZXUtd3liQXF4VVJWandqUE14UHdpaElWZXQtMHlsVVFHRngucUR3NzRhVTAyN2sxX09aLVU3WTFTb3RmUkR5VVl1Z1h4c0l3X3ZYZjBfejZtYmM1TmgxMFAwNnlYWU1ramJ6SmdQUS1OTjdseW5tejhIOUdlLnFncE1aT0FDRUl6d1F1NWpSLm5TUFp5Vnc4UkZGZk44emdLdEJJNkJ1TkxySnZxUEt3ZzZVRUE4aF9zZkRNeHBSYk9NZWZTOTFHU2p4MVNuUFFXb3lTMyJ9|508db7826076f99423adf09b4b8ca90e8edae3fafd9e0b3dc03552f39416301c; edu_user_uuid=edu-v1|c3a531eb-51aa-481f-9bbe-59f5aded819e; Hm_lpvt_98beee57fd2ef70ccdd5ca52b9740c49=1673492061; z_c0=2|1:0|10:1673312528|4:z_c0|92:Mi4xSW9VLVFRQUFBQUFBUUZleUZtVWRGaVlBQUFCZ0FsVk5FQWVxWkFBaU1DMDF6YTNVM0EtRVNXSHk4ekF5MmFDelBB|91246f2c5b553c9512e65e028cf180a9b9d153b37272ce1c3520d747e3b17120; KLBRSID=ed2ad9934af8a1f80db52dcb08d13344|1673493139|1673485322; __utma=51854390.239998728.1673402960.1673402960.1673405080.2; __utmc=51854390; __utmz=51854390.1673402960.1.1.utmcsr=zhihu.com|utmccn=(referral)|utmcmd=referral|utmcct=/question/512158920; __utmv=51854390.100--|2=registration_date=20221208=1^3=entry_date=20221208=1; arialoadData=false; ariafontScale=1; ariaDefaultTheme=default; ariaFixed=true; ariawapChangeViewPort=false; ariaReadtype=1; ariaoldFixedStatus=false; ariaStatus=false; tst=r`,
  Host: "api.zhihu.com",
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:108.0) Gecko/20100101 Firefox/108.0",
};

const bookInfo = []

function main(page) {
  httpRequest(url(page), {}, 'GET', header).then(res => {
    const result = res
    const resultData = res.data
    const pageInfo = res.pagination
    if (resultData) {
      bookInfo.push(resultData.map(book => {
        // 开启子任务，抓取详细信息
        return {
          business_id: book.business_id,
          sku_id: book.sku_id,
          title: book.title,
          cover: book.image,
          author: book.author,
          description: book.description,
          business_url: book.business_url
        };
      }))
    }
  })
}

function getMulu() {
  // https://api.zhihu.com/remix/well/1431705106886184960/catalog?offset=10&limit=13&order_by=global_idx&is_new_column=true
  axios({
    url: `https://api.zhihu.com/remix/well/1431705106886184960/catalog?offset=10&limit=13&order_by=global_idx&is_new_column=true`,
    type: "GET",
    headers: {
      Host: "api.zhihu.com",
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36'",
      Referer:
        "https://www.zhihu.com/xen/market/remix/paid_column/1431705106886184960?extra_tab=2",
      "X-AB-PB":
        "CooBCAAbAD8ARwC0AGkBagF0ATsCzALXAtgCogO3A6YE1gQRBVEFiwWMBZ4FMAYxBusGJwd0CHYIeQjaCD8JYAnDCcQJxQnGCccJyAnJCcoJywnMCdEJ9AkECkkKZQprCqkKvgrUCt0K7Qr+CkMLRgtxC4cLjQvXC+AL5QvmCzgMcQyPDKwMwwzJDPgMEkUCAAAAAAEBAAAAAAAAAAAEAAEAAAEAAAAAAAAGAAABAAAAAAAAAAAAAAADAAAAAAAAAQAAAAEAAAAFAgAAAAIGAAAAAAA=",
      "x-requested-with": "Fetch",
      "x-zse-93": "101_3_3.0",
      "x-zse-96":
        "2.0_8wGBf3CfJgkwJAMDG2lZV85kLa=Vu3=GzswzQ9IXJw=78+1qYpmiv1Dqr0c1gfJ=",
      Origin: "https://www.zhihu.com",
      Connection: "keep-alive",
      Cookie:
        "_zap=3cc0f52d-abe9-42c9-98d3-465975fd9ba9; _xsrf=YGxKtTfaodx3XafXLsO46WqFLfYmdjSK; Hm_lvt_98beee57fd2ef70ccdd5ca52b9740c49=1672709778,1673312506; d_c0=AEBXshZlHRaPTsBrhraibR2XUmQ62Op7oTg=|1672709778; captcha_session_v2=2|1:0|10:1673312512|18:captcha_session_v2|88:MDdWTDlPM3hYV0ZxYTF0WUROdU0vVG1nQTJ3ZlQ5MkxHcTMyMG9hVkR5cHNyQ3gzYXExQUIrNnBrcFVSVW1Vbw==|88cbea0757f577a2bb28df82285bf2057cea5faad18c915acab482d86184bf62; captcha_ticket_v2=2|1:0|10:1673312527|17:captcha_ticket_v2|704:eyJ2YWxpZGF0ZSI6IkNOMzFfNHBLT083ZklUZzBYUFotQ0RhVkZqWGl4TEtOLmZUcFZoMW5rYnlNcjhGWTBUOUFVZVRIdG1uSDE4QWZ5R3JTVHVnQ0Y2aGRkc0pVd0s1aDY5aWMuZS1maTlsdkpqZ2tETGlqdUZ3VGpmaDhIYmotdzJlV0lLc1FZT0JBa3NuYXJDRXpRbS00U3dLcDhIR0tkU3ZId3ljVkhCNEd5UzlvMDc4dnRwSVQ0aUFoSUtpNGNaQURBRkxWS2VoVWk0LWxVOWtBcXp6MUplbGF5by0uN3ViejVGVTFHYVdCVnBMN1doa2J0SFNDRVNpSnVNaUNrOVp5ZVBpTGJhQ0pFdjhWU2prZ01samRGUWNzd2I2Q2hVWHZJUjhrSnQ5MEptbGFXdUJMX0dIOEppNWhIVXdCZXUtd3liQXF4VVJWandqUE14UHdpaElWZXQtMHlsVVFHRngucUR3NzRhVTAyN2sxX09aLVU3WTFTb3RmUkR5VVl1Z1h4c0l3X3ZYZjBfejZtYmM1TmgxMFAwNnlYWU1ramJ6SmdQUS1OTjdseW5tejhIOUdlLnFncE1aT0FDRUl6d1F1NWpSLm5TUFp5Vnc4UkZGZk44emdLdEJJNkJ1TkxySnZxUEt3ZzZVRUE4aF9zZkRNeHBSYk9NZWZTOTFHU2p4MVNuUFFXb3lTMyJ9|508db7826076f99423adf09b4b8ca90e8edae3fafd9e0b3dc03552f39416301c; edu_user_uuid=edu-v1|c3a531eb-51aa-481f-9bbe-59f5aded819e; Hm_lpvt_98beee57fd2ef70ccdd5ca52b9740c49=1673492061; z_c0=2|1:0|10:1673312528|4:z_c0|92:Mi4xSW9VLVFRQUFBQUFBUUZleUZtVWRGaVlBQUFCZ0FsVk5FQWVxWkFBaU1DMDF6YTNVM0EtRVNXSHk4ekF5MmFDelBB|91246f2c5b553c9512e65e028cf180a9b9d153b37272ce1c3520d747e3b17120; KLBRSID=ed2ad9934af8a1f80db52dcb08d13344|1673495546|1673485322; __utma=51854390.239998728.1673402960.1673402960.1673405080.2; __utmc=51854390; __utmz=51854390.1673402960.1.1.utmcsr=zhihu.com|utmccn=(referral)|utmcmd=referral|utmcct=/question/512158920; __utmv=51854390.100--|2=registration_date=20221208=1^3=entry_date=20221208=1; arialoadData=false; ariafontScale=1; ariaDefaultTheme=default; ariaFixed=true; ariawapChangeViewPort=false; ariaReadtype=1; ariaoldFixedStatus=false; ariaStatus=false; tst=r",
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-site",
      Pragma: "no-cache",
      "Cache-Control": "no-cache",
      TE: "trailers",
    }
  }).then(res => {
    console.log(res)
  });

}
getMulu()