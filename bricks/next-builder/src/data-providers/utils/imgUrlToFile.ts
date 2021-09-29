export function imgUrlToFile(url: string, name: string): Promise<File> {
  // 将url转化为base64
  const urlToBase64 = (url: string, callback: (base64: string) => void) => {
    let canvas = document.createElement("CANVAS") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = function () {
      canvas.height = img.height;
      canvas.width = img.width;
      ctx.drawImage(img, 0, 0);
      const dataURL = canvas.toDataURL("image/png");
      callback(dataURL);
      canvas = null;
    };
    img.src = `${window.location.origin}${url}`;
  };
  //将base64转换为file
  const base64ToFile = function (base64code: string, filename: string): File {
    const arr = base64code.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {
      type: mime,
      lastModified: new Date().getTime(),
    });
  };
  return new Promise((resolve, reject) => {
    try {
      urlToBase64(url, (base64) => {
        resolve(base64ToFile(base64, name));
      });
    } catch {
      reject(`${url} was not transform`);
    }
  });
}
