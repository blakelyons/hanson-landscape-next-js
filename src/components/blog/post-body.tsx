import Image from "next/image";
import type { BlogBlock } from "@/content/blog";

// `html` fields are first-party migrated content (see src/content/blog.ts header).
export function PostBody({ blocks, fallbackAlt = "" }: { blocks: BlogBlock[]; fallbackAlt?: string }) {
    return (
        <div className="mx-auto flex w-full max-w-180 flex-col gap-6">
            {blocks.map((block, index) => {
                switch (block.type) {
                    case "heading":
                        return (
                            <h2
                                key={index}
                                className="font-serif-display text-forrest pt-4 text-3xl leading-tight"
                                dangerouslySetInnerHTML={{ __html: block.html }}
                            />
                        );
                    case "paragraph":
                        return (
                            <p
                                key={index}
                                className="[&_a]:text-forrest font-sans text-lg leading-7.5 text-black/70 [&_a]:underline"
                                dangerouslySetInnerHTML={{ __html: block.html }}
                            />
                        );
                    case "list":
                        return (
                            <ul key={index} className="flex flex-col gap-3">
                                {block.items.map((item, itemIndex) => (
                                    <li
                                        key={itemIndex}
                                        className="[&_a]:text-forrest flex items-start gap-3 font-sans text-base leading-6 text-black/70 [&_a]:underline"
                                    >
                                        <span className="bg-forrest mt-2 size-1.5 shrink-0 rounded-full" />
                                        <span dangerouslySetInnerHTML={{ __html: item }} />
                                    </li>
                                ))}
                            </ul>
                        );
                    case "image":
                        return (
                            <Image
                                key={index}
                                src={block.src}
                                alt={block.alt || fallbackAlt}
                                width={block.width}
                                height={block.height}
                                sizes="(min-width: 768px) 720px, 100vw"
                                className="h-auto w-full rounded-xl"
                            />
                        );
                }
            })}
        </div>
    );
}
