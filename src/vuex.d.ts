// Vuex 4 的 package.json 缺少 exports.types 字段，
// 此文件为 TypeScript bundler 模式提供类型路径补丁
declare module 'vuex' {
  export * from 'vuex/types/index.d.ts'
}
