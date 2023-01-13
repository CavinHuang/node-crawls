import requests
import execjs

domain = 'https://www.zhihu.com'
search_api = '/api/v4/search_v3?gk_version=gz-gaokao&t=zvideo&q=%E9%80%86%E5%90%91&correction=1&offset=0&limit=20&filter_fields=&lc_idx=0&show_all_topics=0&search_source=Normal'
search_url = domain+search_api

with open('x-zse-96.js','r',encoding='utf-8') as f:
    js = f.read()
etx = execjs.compile(js)

# d_c0 是服务端返回的，自己请求一个
d_c0 = "AEBXshZlHRaPTsBrhraibR2XUmQ62Op7oTg=|1672709778"
xzse96 = etx.call('get_xzse96',d_c0,search_api)

headers = {
    "cookie":f"d_c0={d_c0};",
    "user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
    "x-api-version":"3.0.91",
    "x-zse-93":"101_3_3.0",
    "x-zse-96":xzse96,
}

print(requests.get(search_url, headers=headers).text)
