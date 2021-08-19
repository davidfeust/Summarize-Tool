import re
import docx
from pdfminer.high_level import extract_text
import html2text
from bs4 import BeautifulSoup


def read_file(file_name):
    if file_name.endswith('txt'):
        with open(file_name, 'r', encoding="utf8") as f:
            content = f.read()
        return content

    elif file_name.endswith('docx'):
        doc = docx.Document(file_name)
        full_text = []
        for para in doc.paragraphs:
            full_text.append(para.text)
        return '\n'.join(full_text)

    elif file_name.endswith('pdf'):
        content = extract_text(file_name)
        return content

    elif file_name.endswith('html'):
        with open(file_name, 'r', encoding="utf8") as f:
            content = f.read()
            content = parse_html(content)
    return content


def parse_html(content):
    soup = BeautifulSoup(content, 'lxml')  # "html.parser"
    soup = soup.find('body')
    soup = soup.find_all(['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'])

    h = html2text.HTML2Text()
    # Ignore converting links, images and more from HTML
    h.ignore_links = True
    h.bypass_tables = False
    h.ignore_images = True
    h.skip_internal_links = False
    h.protect_links = True
    h.inline_links = False
    h.wrap_links = False

    txt = ''
    for i in soup:
        for s in i(['script', 'style', 'noscript', 'path', 'li', 'meta', 'desc', 'svg', 'img', 'span', 'a', 'label',
                    'button']):
            s.decompose()
        temp = h.handle(i.prettify())

        temp = re.sub('[_#*\n]', '', temp)
        temp = temp.strip()
        txt += (temp + '\n\n')

    return txt
