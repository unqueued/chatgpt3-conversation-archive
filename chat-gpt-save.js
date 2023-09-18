javascript: (function () {


    const title = document.querySelector('ol li a.bg-gray-800')?.textContent ?? document.title;
    const non_letters_re = /[^\p{L}\p{N}]+/gu;
    const trailing_dash_re = /(^-)|(-$)/g;
    const slug = title.toLowerCase()
        .replace(non_letters_re, "-")
        .replace(trailing_dash_re, '');

    var chat_id = window.location.pathname.split('/').pop();

    var file_name = "chatgpt_" + slug + "_" + chat_id + ".html";

    const link = document.createElement('a');
    var chat_body = document.querySelector('[class^="flex-1 overflow-hidden"]').innerHTML
        .replace(/<img[^>]*>|<button[^>]*>.*?<\/button>|<svg[^>]*>.*?<\/svg>/g, '');
    link.href = URL.createObjectURL(new Blob([
        `
        <!DOCTYPE html>
        <html>

        <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/default.min.css">
            <script>
                myProps=${JSON.stringify(__NEXT_DATA__.props)}
            </script>
        <style>
            [class^="flex flex-col text-sm"]>div:nth-child(2n+1) {
                background: lightgray;
            }
            
            [class^="flex flex-col text-sm"]>div:nth-child(2n+2) {
                background: darkgray;
            }
            
            [class^="flex flex-col text-sm"]>div:not(:last-child) {
                padding: 10px;
                margin: 15px;
                border-radius: 5px;
            }
        </style>
        </head>

        <body>
            <p id="chatid">${chat_id}</p>
            <p><a id="chatURL" href="${window.location}">${window.location}</a></p>
        ${chat_body}
        </body>

        </html>
        `
    ],
        { type: 'text/html' }));
    link.download = file_name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
})()
