import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver, ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
import eslintPlugin from 'vite-plugin-eslint'
import { resolve } from 'path'

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}

/**
 * 配置环境变量
 */
Object.assign(process.env, {
  BROWSER: 'chrome'
})

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { name } = require('./package')

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  server: {
    host: 'localhost',
    port: 8080,
    https: false,
    open: true
  },
  build: {
    target: 'es2019',
    lib: {
      name: `${name}-[name]`,
      entry: pathResolve('./src/main.js'),
      formats: ['umd']
    },
    rollupOptions: {
      preserveEntrySignatures: 'allow-extension',
      output: {
        inlineDynamicImports: true,
        chunkFileNames: `${name}-[name]-[hash].js`,
        entryFileNames: `${name}-[name]-[hash].js`,
        assetFileNames: `${name}-[name]-[hash].[ext]`
      },
      input: {
        // 入口文件
        main: pathResolve('index.html')
      }
    }
  },
  plugins: [
    vue(),
    // 自动导入组件
    Components({
      resolvers: [AntDesignVueResolver(), ElementPlusResolver()],
      dts: './src/types/components.d.ts'
      // dts: true,
    }),
    // 自动导入
    AutoImport({
      include: [
        /\.vue$/,
        /\.vue\?vue/ // .vue
      ],
      imports: [
        'vue',
        {
          // 若不加这一句，自动生成的eslintrc文件没有将defineProps和defineEmits加入，会导致eslint报错，所以在这里重新声明一遍
          vue: ['defineProps', 'defineEmits'],
          '@vueuse/core': [
            // named imports
            'useMouse', // import { useMouse } from '@vueuse/core',
            // alias
            ['useFetch', 'useMyFetch'] // import { useFetch as useMyFetch } from '@vueuse/core',
          ]

          // "[package-name]": [
          //   "[import-names]",
          //   // alias
          //   ["[from]", "[alias]"],
          // ],
        }
      ],
      eslintrc: {
        enabled: true, // Default `false`
        filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
      resolvers: [AntDesignVueResolver(), ElementPlusResolver()],
      dts: './src/types/auto-imports.d.ts'
    }),
    // eslint插件，规则error时弹出显示在页面上
    eslintPlugin()
  ],
  resolve: {
    alias: [
      {
        find: /\/#\//,
        replacement: pathResolve('src/types/')
      },
      {
        find: '@',
        replacement: pathResolve('src/')
      }
    ]
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/assets/scss/index.scss";' // 添加公共样式
      }
    }
  }
})
