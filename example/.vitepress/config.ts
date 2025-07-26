import { Vpd, VpdConfig } from './vpd';
import { defineConfig } from 'vitepress';

const config: VpdConfig = {
  title: "Vitron Example",
  baseUrl: '/vitron/',
  srcDir: 'notes',
  rootDir: 'example',
};

const configs = await Vpd(config);
export default defineConfig(configs);