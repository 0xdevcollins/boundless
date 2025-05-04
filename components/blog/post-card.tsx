import Link from "next/link";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface PostCardProps {
  post: {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    featuredImage: string | null;
    publishedAt: Date | null;
    author: {
      id: string;
      name: string | null;
      image: string | null;
    };
    category: {
      id: string;
      name: string;
      slug: string;
    };
    tags: {
      id: string;
      name: string;
      slug: string;
    }[];
  };
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Card className="flex h-full flex-col overflow-hidden">
      <Link href={`/blog/${post.slug}`}>
        <CardHeader className="p-0">
          {post.featuredImage ? (
            <div className="relative aspect-video w-full">
              <Image
                src={post.featuredImage}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="aspect-video w-full bg-muted" />
          )}
        </CardHeader>
        <CardContent className="flex-1 p-4">
          <div className="mb-2 flex items-center gap-2">
            <Link
              href={`/blog/category/${post.category.slug}`}
              className="text-sm text-muted-foreground hover:underline"
            >
              {post.category.name}
            </Link>
            {post.publishedAt && (
              <span className="text-sm text-muted-foreground">
                • {formatDistanceToNow(new Date(post.publishedAt), { addSuffix: true })}
              </span>
            )}
          </div>
          <h2 className="mb-2 line-clamp-2 text-xl font-semibold">
            {post.title}
          </h2>
          {post.excerpt && (
            <p className="line-clamp-3 text-muted-foreground">{post.excerpt}</p>
          )}
        </CardContent>
      </Link>
      <CardFooter className="flex items-center justify-between p-4 pt-0">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={post.author.image || undefined} />
            <AvatarFallback>
              {post.author.name?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
          <Link
            href={`/profile/${post.author.id}`}
            className="text-sm font-medium hover:underline"
          >
            {post.author.name}
          </Link>
        </div>
        <div className="flex flex-wrap gap-1">
          {post.tags.slice(0, 2).map((tag) => (
            <Link
              key={tag.id}
              href={`/blog/tag/${tag.slug}`}
              className="hover:no-underline"
            >
              <Badge variant="secondary" className="text-xs">
                {tag.name}
              </Badge>
            </Link>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
} 
