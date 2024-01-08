
let imgBox = document.getElementById("imgBox");
let qrImage = document.getElementById("qrImage");
let qrText = document.getElementById("qrText");
let downloadBtn = document.getElementById("downloadBtn"); 


function generateQR() {
    if (qrText.value.length > 0) {
        qrImage.src = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + qrText.value;

        imgBox.classList.add("show-img");

        downloadBtn.style.display = "inline-block";
    } else {
        qrText.classList.add('error');
        setTimeout(() => {
            qrText.classList.remove('error');
        }, 1000);
    }
}

function downloadQR() {
    if (qrText.value.length > 0) {
        fetch(qrImage.src)
            .then(response => response.blob())
            .then(blob => {
                var blobUrl = URL.createObjectURL(blob);
                var downloadLink = document.createElement('a');
                downloadLink.href = blobUrl;
                downloadLink.download = 'qrcode.png';
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
                URL.revokeObjectURL(blobUrl);
            })
            .catch(error => {
                console.error('Error fetching image data:', error);
            });
    }
}
