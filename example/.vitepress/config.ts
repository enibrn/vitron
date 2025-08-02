import { VitronConfigGenerator, VitronOptions } from '../../src/config-generator/index';
import { defineConfig } from 'vitepress';

const config: VitronOptions = {
  title: "Vitron Example",
  baseUrl: '/vitron/',
  srcDir: 'notes',
  rootDir: 'example',
};

const configs = await VitronConfigGenerator(config);
console.log('Generated VitePress config:', configs);
export default defineConfig(configs);