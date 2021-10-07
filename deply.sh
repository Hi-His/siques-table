set -e

# 构建
npm run build

# cd 到构建输出的目录下 
 

# 部署到自定义域域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 部署到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 部署到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:ericheshenghao/siques-table.git master


cd docs 

git init 

git add -add

git commit -m 'deploy'

git push -f git@github.com:ericheshenghao/siques-table.git master:gh-pages

cd -