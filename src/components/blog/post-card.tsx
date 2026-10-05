import Image from "next/image";
import { TransitionLink } from "@/components/transitions/transition-link";
import { Icon } from "@/components/ui/icon";
import { formatPostDate, type BlogPost } from "@/content/blog";

export function PostCard({ post }: { post: BlogPost }) {
    const image = post.blocks.find((block) => block.type === "image");

    return (
        <TransitionLink
            href={`/blog/${post.slug}`}
            className="group flex w-full flex-col gap-4"
            aria-label={`Read ${post.title}`}
        >
            <div className="bg-light-green-cta relative aspect-4/3 w-full overflow-hidden rounded-lg">
                {image?.type === "image" ? (
                    <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                    />
                ) : (
                    <div className="text-forrest/40 flex size-full items-center justify-center">
                        <Icon icon="lucide:leaf" width={48} height={48} />
                    </div>
                )}
            </div>
            <div className="flex flex-col gap-2">
                <p className="font-sans text-xs font-medium tracking-[1.5px] text-[#6b7b6b] uppercase">
                    {formatPostDate(post.date)}
                </p>
                <h3 className="font-serif-display text-2xl leading-7 font-normal text-black not-italic">
                    {post.title}
                </h3>
                <p className="line-clamp-3 font-sans text-sm leading-5.5 text-black/60">{post.excerpt}</p>
                <span className="text-forrest mt-1 text-sm font-medium">Read More</span>
            </div>
        </TransitionLink>
    );
}
