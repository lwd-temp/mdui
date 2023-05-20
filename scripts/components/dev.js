import watch from 'node-watch';
import { buildLitStyleFile } from '../utils.js';

const watchOptions = {
  recursive: true,
  filter: (filepath) => {
    return /.(?:less)$/.test(filepath);
  },
};

let updating = false;

watch('./packages/components/src', watchOptions, (_, filePath) => {
  if (updating) {
    return;
  }

  updating = true;

  buildLitStyleFile(filePath).finally(() => {
    updating = false;
  });
});
