let output  = document.querySelector('#output');
// let txtArea = document.querySelector('#code_holder');
let msg = document.querySelector('.msg');


function handler() {
    let data = document.querySelector('input').value;

    const url = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${data}`;

    const xmlHttp = new XMLHttpRequest();
    xmlHttp.onload = () => {
        output.src = xmlHttp.responseURL;
        output.setAttribute('alt', data)
    }
    xmlHttp.open('GET', url);
    xmlHttp.send();
}

function embedCode() {
    if (output.src.indexOf('assets/img/google.png') === -1) {
        const embedImg = document.querySelector('#output');    
        let txtArea = document.createElement('textarea');

        // Create Textarea to hold the code
        document.body.appendChild(txtArea)
        
        // Assign the code
        txtArea.value = embedImg.outerHTML;

        // Select the code
        txtArea.select();

        // Copy the selected text to the clipboard
        document.execCommand('copy');
        
        // Let's clean everything
        txtArea.value = '';
        document.body.removeChild(txtArea);

        // Show MSG
        msg.style.background = '#7fdb60b8';
        msg.textContent = 'Code copied, successfully!! 🎉';
        msg.style.display = 'block';
    } else {

        // Show MSG
        msg.style.background = '#ffac00b8';
        msg.textContent = 'Please insert a link first!';
        msg.style.display = 'block';
    }
    

    // Hide msg after 5 seconds
    setTimeout(() => {
        msg.style.display = 'none';
    }, 1000 * 5);
}

function downloadIt() {
    const target = document.querySelector('#output');

    // Capturing screenshot using Canva
    html2canvas(target).then((canvas) => {
        const dataURL = canvas.toDataURL();

        // Set the data URL as the source of the img element
        const screenshotImage = document.querySelector('#output');
        screenshotImage.src = dataURL;

        // Trigger a download link (optional)
        const downloadLink = document.createElement('a');
        downloadLink.href = dataURL;
        downloadLink.download = 'screenshot.png';
        downloadLink.click();
    })
}