// src/types/three-loaders.d.ts

declare module "three/examples/jsm/loaders/USDZLoader" {
  import { Loader } from "three";
  export class USDZLoader extends Loader {
    loadAsync(url: string): Promise<unknown>;
  }
}

declare module "three/examples/jsm/loaders/GLTFLoader" {
  import { Loader } from "three";
  export class GLTFLoader extends Loader {
    loadAsync(url: string): Promise<unknown>;
  }
}
