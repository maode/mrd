# mrd

根据模版快速创建github博客文件。

C:\Users\code0>mrd -h
Usage: mrd <fileName> [title] [tag1 tag2 ……]

Options:
  -f, --from  template path [string] [default: "D:/GitHubRepo/Blog/post_tpl/A-mrd-temp.md"]

  -t, --to    generate path [string] [default: "D:/GitHubRepo/Blog/source/_posts"]

  -h, --help  Show help                                                [boolean]


Examples:
 `$ mrd test`  根据默认模板在默认路径下创建test.md

copyright 2017