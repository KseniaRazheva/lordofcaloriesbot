# lordofcaloriesbot

## как создать новый проект

создала на [гитхабе](https://github.com/KseniaRazheva?tab=repositories) новый репозиторий (new, Repository name, Add a README file)<br>
открываю на компьютере общую папку гитхаба через вскод (терминал code .), надо стянуть изменения

```
git clone https://github.com/KseniaRazheva/my-first-todo.git
```

в моей папке гитхаб на компьютере появилась папка которую я создала на гитхабе и теперь туда можно писать код, а потом комитить

## как комитить
```
git status 
git add . 
git status 
git commit -m "add/update/return files sass l.61" 
git push -u origin main
// в случае неудачи git checkout .
```

## как установить vite 
1) открыть пустую папку проекта который будет собираться витом
2) в терминал написать из документации https://vite.dev/guide/ раздел Getting Started 

```
npm create vite@latest
```

3) выбрать:
Ok to proceed? yes
project name: vite-project (можно менять)
select a framework? React
select a variant: JavaScript

4) внутри пустой папки создается новая папка vite-project, создается все автоматически (package.json, eslint.config.js, src с рыбой проекта на jsx) вручную создавать не нужно 

```
cd vite-project
npm i
```

5) после npm i все правила которые записаны в package.json начинают устанавливаться на проект и создается файл package-lock.json и папка node_modules

```
npm run dev
```
~~надо разобраться чем npm отличается от yarn~~
6) проект открывается в браузере по адресу http://localhost:5173/

## как стилизировать ридми файлы

```
[link](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)
~~зачеркнуть~~
[ ] checkbox
[x] done
```

1) как поменять язык в вскоде открыть палитру команд ctrl+shift+p ввесли Configure Display Language нажать ентер и выбрать русский язык перезапустить приложение
2) как сделать курсор в нескольких местах alt+левый клик по местам
3) как поменять строки местами alt+стрелка вверх/стрелка вниз
4) как закомментировать ctrl+/
5) как вставить в терминале контрол-шифт-V 
6) как копировать из терминала контрол-шифт-C
7) аналог фигмы для dev mode: https://pixso.net/

### при командной разработке

```
git fetch 
git merge 
git pull 
```
1) fetch - узнать появились ли изменения в репозитории. убедиться, что у меня последняя версия кода.
2) merge - попытка взять изменения (если нет конфликтов)
```
npm i
npm run dev
```
3) создались зависимости из package.json, создалась папка node_modules и файл package-lock.json
4) если все получилось, то сайт можно посмотреть в браузере: http://localhost:3000
5) далее нужно создать новую ветку и переключиться на нее
```
git checkout -b nameNewVetki
```
или 
```
git branch <name>
git checkout <name>
git push -u origin <name>
```
6) чтобы узнать на какой ветке находишься git branch текущая будет отмечена звездочкой *
7) сделать коммит как обычно:
```
git status 
git add . 
git status 
git commit -m "add/update/return file.js" 
git push --set-upstream origin ksyushinaVetka
```
8) потом на сайте https://github.com/ надо создать пулл-реквест. готово!

перед тем как комитить создала новую ветку git checkout -b add-objects-practice-for-beginners надо запомнить это делать


```
npm init 
npm init -y 
npm install telegraf 
npm run start-bot 
npm i nodemon 
npm run start-bot 
npm i dotenv 
```