function selectCodeOnly() {
    const codeList = document.getElementsByTagName('code');
    Array.prototype.filter.call(codeList, function(code) {
        code.addEventListener('copy', function(e) {
            const clipboardData = e.clipboardData;
            const text = getSelectedText();
            clipboardData.setData('text', text);
            e.preventDefault();
        });
    })
}

function getSelectedText() {
    const doc = window.getSelection().getRangeAt(0).cloneContents();
    const trList = doc.querySelectorAll('tr');
    if (trList.length === 0) {
        return '';
    }

    let text = '';
    [].forEach.call(trList, function(tr, i) {
        const numTd = tr.cells.length;
        if (numTd === 0) {
            return;
        }

        let idx = 0;
        if (numTd === 2) {
            idx = 1
        }
        text += tr.cells[idx].textContent + '\n';
    });

    return text;
}

function setLinkTargetBlank() {
    const content = window.getComputedStyle(
        document.querySelector('body'), ':before').getPropertyValue(
        'content').replace(/\"/g, '');

    const linkList = document.getElementsByTagName('a');
    Array.prototype.filter.call(linkList, function(link) {
        if (content === 'desktop') {
            link.removeAttribute('target');
            return
        }
        link.setAttribute('target', "_blank");
    })
}
