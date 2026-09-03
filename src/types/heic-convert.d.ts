declare module "heic-convert" {
  export interface ConvertOptions {
    buffer: Buffer;
    format: "JPEG" | "PNG";
    quality?: number;
  }
  export interface ConvertedImage {
    convert(): Promise<Buffer>;
  }
  export function all(opts: ConvertOptions): Promise<ConvertedImage[]>;
  const one: (opts: ConvertOptions) => Promise<Buffer>;
  export default one;
}