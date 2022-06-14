import client from 'modules/client';

const setImage = async (image: any) => {
  return new Promise(function (resolve, reject) {
    const url = `/images/${image}`;
    const xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);
    xhr.responseType = 'blob';

    xhr.onload = function (e: any) {
      if (this.status >= 200 && this.status < 300) {
        const blob = e.target.response;
        const reader = new FileReader();

        reader.readAsDataURL(blob);

        const file = new File([blob], image, {
          type: blob.type,
          lastModified: Date.now(),
        });
        var img = {
          dataURL: null,
          file,
        };

        resolve(img);
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText,
        });
      }
    };
    xhr.send();
  });
};

/*
  POST /api/common/findVisitorsCntWeek
*/
export const findVisitorsCntWeek = async (date: Object) => {
  const { data } = await client.post('/api/common/findVisitorsCntWeek', date);

  const toImage = await setImage('1653659478032.jpg');

  const file = new File([data], '213.jpg', {
    type: data.type,
    lastModified: Date.now(),
  });
  var img = {
    dataURL: null,
    file,
  };
  console.log(img, toImage);
  return data;
};

/*
  POST /api/common/findImage
*/
export const findImage = async (image: string) => {
  const { data } = await client.post('/api/common/findImage', { image });

  const file = new File([data], image, {
    type: data.type,
    lastModified: Date.now(),
  });

  var img = {
    dataURL: null,
    file,
  };

  return img;
};
