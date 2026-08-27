import Image from "next/image";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { getRecentGalleryPosts } from "@/lib/data/gallery";
import { SilaBadge } from "@/components/pancasila/sila-badge";

export async function ScrollShowcase() {
  const [post] = await getRecentGalleryPosts(1);

  return (
    <section className="bg-white">
      <div className="container-shell">
        <ContainerScroll
          titleComponent={
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary">Ruang Dokumentasi</p>
              <h2 className="mt-4 text-4xl font-black tracking-tight text-navy md:text-6xl">
                Lihat nilai Pancasila dari kejadian yang dekat.
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-navy/68 md:text-lg">
                Satu foto dapat menyimpan cerita tentang toleransi, gotong royong, musyawarah, dan kepedulian sosial.
              </p>
            </div>
          }
        >
          {post ? (
            <div className="relative h-full w-full">
              <Image src={post.imageUrl} alt={post.title} fill sizes="(min-width: 1024px) 1024px, 100vw" className="object-cover" priority />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/92 via-navy/60 to-transparent p-5 text-white md:p-8">
                <div className="flex flex-wrap gap-2">
                  {post.sila.map((sila) => <SilaBadge key={sila} number={sila} />)}
                </div>
                <h3 className="mt-4 max-w-2xl text-2xl font-black md:text-4xl">{post.title}</h3>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-white/78 md:text-base">{post.description}</p>
              </div>
            </div>
          ) : (
            <div className="grid h-full place-items-center p-8 text-center text-navy/70">Belum ada dokumentasi.</div>
          )}
        </ContainerScroll>
      </div>
    </section>
  );
}
