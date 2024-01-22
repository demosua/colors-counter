self.addEventListener("message", go);

function go(message) {
    const imageData = message.data.imageData;
    const colorCounts = countPixels(imageData);

    self.postMessage({
        "command": "done",
        colorCounts
    });
}

function countPixels(data) {
  const colorCounts = {};
  for (let index = 0; index < data.length; index += 4) {
      const rgba = `rgba(${data[index]}, ${data[index + 1]}, ${data[index + 2]}, ${(data[index + 3] / 255)})`;

      // Apply a threshold (adjust as needed)
      if (data[index + 3] > 10) {
          if (rgba in colorCounts) {
              colorCounts[rgba] += 1;
          } else {
              colorCounts[rgba] = 1;
          }
      }
  }
  return colorCounts;
}