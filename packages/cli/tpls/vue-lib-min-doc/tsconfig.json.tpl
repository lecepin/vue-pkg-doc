{
  "extends": "@vue/tsconfig/tsconfig.dom.json",
  "include": ["env.d.ts", "src/**/*", "src/**/*.vue"],
  "exclude": ["src/**/__tests__/*", "src/Demo.*"],
  "compilerOptions": {
    "composite": true,
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "allowImportingTsExtensions": true,
    "baseUrl": ".",
    "isolatedModules": true,
    "strict": true,
    "jsx": "preserve",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
