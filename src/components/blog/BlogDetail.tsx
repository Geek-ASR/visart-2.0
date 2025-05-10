import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BlogPost, mockBlogPosts } from "./Blog";
import { ArrowLeft } from "lucide-react";

interface BlogDetailProps {
  posts?: BlogPost[];
}

const BlogDetail = ({ posts = mockBlogPosts }: BlogDetailProps) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const post = posts.find((post) => post.id === id);

  if (!post) {
    return (
      <div className="p-8 bg-background min-h-screen">
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="mb-6 hover:bg-secondary transition-all duration-200"
        >
          <ArrowLeft className="mr-2" size={16} />
          Back to Blogs
        </Button>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-2">Blog Post Not Found</h2>
          <p className="text-muted-foreground">
            The blog post you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-background min-h-screen animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Button
        variant="outline"
        onClick={() => navigate(-1)}
        className="mb-6 hover:bg-secondary transition-all duration-200"
      >
        <ArrowLeft className="mr-2" size={16} />
        Back to Blogs
      </Button>

      <div className="max-w-4xl mx-auto">
        <div className="h-80 overflow-hidden rounded-lg mb-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>

        <div className="flex items-center text-sm text-muted-foreground mb-6">
          <span className="mr-4">By {post.author}</span>
          <span className="mr-4">{post.date}</span>
          <span>{post.readTime}</span>
        </div>

        <div className="prose max-w-none mb-8 prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-code:bg-gray-100 prose-code:p-1 prose-code:rounded prose-pre:bg-gray-100 prose-pre:p-4 prose-pre:rounded-md">
          {post.content ? (
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          ) : (
            <p className="text-lg">{post.summary}</p>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
