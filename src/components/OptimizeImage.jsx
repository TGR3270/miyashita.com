import React from 'react';
import url from 'url';

class GPhotosURL {
  constructor(opts) {
    const parsed = url.parse(opts.src, true);
    const [pathname, paramStr = ''] = parsed.pathname.split('=');

    this.params = this.parseParams(paramStr);
    this.parsed = parsed;
    this.parsed.pathname = pathname;

    const size = this.calcSize({
      ...opts,
      width: this.params.w || this.params.s,
      height: this.params.h || this.params.s,
    });
    this.width = size.width;
    this.height = size.height;
  }

  calcSize({ width: baseWidth, height: baseHeight, maxWidth, maxHeight, minWidth, minHeight }) {
    const width =
      typeof width === 'number'
        ? Math.min(Math.max(baseWidth, minWidth || 0), maxWidth || Number.MAX_SAFE_INTEGER)
        : maxWidth || undefined;
    const height =
      typeof height === 'number'
        ? Math.min(Math.max(baseHeight, minHeight || 0), maxHeight || Number.MAX_SAFE_INTEGER)
        : minHeight || undefined;
    return { width, height };
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
  constructor(opts) {
    const { src: imgUrl, width, height } = opts;
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

function generateOptimizeImageUrl(opts) {
  if (/googleusercontent\.com/.test(opts.src)) {
    const gurl = new GPhotosURL(opts);
    return {
      raw: gurl.jpeg,
      webp: gurl.webp,
    };
  }
  if (/youtube\.com/.test(opts.src)) {
    const yurl = new YoutubeThumbnailURL(opts);
    return {
      raw: yurl.jpeg,
      webp: yurl.webp,
    };
  }
  return {
    raw: opts.src,
  };
}

const OptimizeImage = ({
  src,
  width: baseWidth,
  height: baseHeight,
  maxWidth,
  maxHeight,
  minWidth,
  minHeight,
  alt,
  ...rest
}) => {
  const { raw, webp } = generateOptimizeImageUrl({
    src,
    width: baseWidth,
    height: baseHeight,
    maxWidth,
    maxHeight,
    minWidth,
    minHeight,
  });

  return (
    <picture>
      {webp && <source type="image/webp" srcSet={webp} />}
      <img {...rest} src={raw} alt={alt || 'image'} />
    </picture>
  );
};

export default OptimizeImage;
