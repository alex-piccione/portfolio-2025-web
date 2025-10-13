// Add type declaration for the Vue components, otherwise compiler will complain about unknown types (saying it is "any")

declare module '*.vue' {
   import type { DefineComponent } from 'vue'
   const component: DefineComponent<{}, {}, any>
   export default component
}