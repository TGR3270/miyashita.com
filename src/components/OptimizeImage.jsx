import React from 'react';
import url from 'url';

class GPhotosURL {
  constructor(imgUrl, width, height) {
    const parsed = url.parse(imgUrl, true);
    const [pathname, paramStr = ''] = parsed.pathname.split('=');

    this.params = this.parseParams(paramStr);
    this.parsed = parsed;
    this.parsed.pathname = pathname;
    if (typeof width === 'number') {
      this.width = width;
    }
    if (typeof height === 'number') {
      this.height = height;
    }
  }

  get jpeg() {
    return this.getUrl({ rj: true });
  }

  get png() {
    return this.getUrl({ rp: true });
  }

  get gif() {
    return this.getUrl({ rg: true });
  }

  get webp() {
    return this.getUrl({ rw: true });
  }

  getUrl(params) {
    const paramStr = this.stringifyParams({
      ...this.params,
      w: this.width || this.params.width,
      h: this.height || this.params.height,
      ...params,
    });
    return url.format({ ...this.parsed, pathname: `${this.parsed.pathname}=${paramStr}` });
  }

  parseParams(paramStr) {
    const paramsArr = paramStr.split('-').map(p => p.split(/(\d+)/).filter(p => p));
    const params = {};
    for (const arr of paramsArr) {
      params[arr[0]] = arr[1] ? parseInt(arr[1], 10) : true;
    }
    return params;
  }

  stringifyParams(params) {
    const arr = [];
    Object.keys(params).forEach(key => {
      const value = params[key];
      if (typeof value === 'boolean') {
        arr.push(key);
      } else if (value) {
        arr.push(`${key}${value}`);
      }
    });
    return arr.join('-');
  }
}

class YoutubeThumbnailURL {
  constructor(imgUrl, width, height) {
    const parsed = url.parse(imgUrl, true);
    const [id] = parsed.pathname.split('/').slice(-2, -1);

    this.id = id;
    if (typeof width === 'number') {
      this.width = width;
    }
    if (typeof height === 'number') {
      this.height = height;
    }
  }

  get jpeg() {
    return this.getUrl({ webp: false });
  }

  get webp() {
    return this.getUrl({ webp: true });
  }

  getUrl({ webp }) {
    const ext = webp ? 'webp' : 'jpg';
    const urlType = webp ? 'vi_webp' : 'vi';
    return `https://img.youtube.com/${urlType}/${this.id}/0.${ext}`;
  }
}

function generateOptimizeImageUrl(imgUrl, width, height) {
  if (/googleusercontent\.com/.test(imgUrl)) {
    const gurl = new GPhotosURL(imgUrl, width, height);
    return {
      raw: gurl.jpeg,
      webp: gurl.webp,
    };
  }
  if (/youtube\.com/.test(imgUrl)) {
    const yurl = new YoutubeThumbnailURL(imgUrl, width, height);
    return {
      raw: yurl.jpeg,
      webp: yurl.webp,
    };
  }
  return {
    raw: imgUrl,
  };
}

const OptimizeImage = ({ src, width, height, alt, ...rest }) => {
  const { raw, webp } = generateOptimizeImageUrl(src, width, height);

  return (
    <picture>
      {webp && <source type="image/webp" srcSet={webp} />}
      <img {...rest} src={raw} alt={alt} />
    </picture>
  );
};

export default OptimizeImage;
