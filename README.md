
tailwind.bat:
npx tailwindcss -i ./assets/main.css -o ./static/css/aafu_compiled.css --watch

server.bat:
hugo server --disableFastRender --buildDrafts -d ../server/

-----------------------------------------------------

TODO:

-----------------------------------------------------

Helpful links:
	https://discourse.gohugo.io/t/i-want-to-get-the-link-to-the-other-language-page-of-the-multilingual-page/44022/7
