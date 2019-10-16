export default (imgUrl, width, height, quality = 100, format) => {
  let url = imgUrl;

  if (!url) {
    return url;
  }

  const index = url.indexOf(".aspx");

  if (index > -1) {
    url = url.substring(0, index);
  }

  url
    .replace("~/", "/")
    .replace("(", "")
    .replace(")", "")
    .replace(" ", "")
    .replace("'", "")
    .replace('"', "");

  const index2 = url.indexOf("?");
  if (index2 > -1) {
    url = url.substring(0, index2);
  }

  url = `${url}?mode=crop&width=${width}&height=${height}`;

  if (quality < 100) {
    url = `${url}&quality=${quality}`;
  }

  if (format) {
    url = `${url}&format=${format}`;
  }

  return url;
};
