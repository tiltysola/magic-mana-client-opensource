export const formatBytes = (bytes: number) => {
  if (!bytes) {
    return '--';
  } else if (bytes < 1024) {
    return `${bytes} b`;
  } else if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(2)} Kb`;
  } else if (bytes < 1024 * 1024 * 1024) {
    return `${(bytes / 1024 / 1024).toFixed(2)} Mb`;
  } else if (bytes < 1024 * 1024 * 1024 * 1024) {
    return `${(bytes / 1024 / 1024 / 1024).toFixed(2)} Gb`;
  } else {
    return `${(bytes / 1024 / 1024 / 1024 / 1024).toFixed(2)} Tb`;
  }
};
