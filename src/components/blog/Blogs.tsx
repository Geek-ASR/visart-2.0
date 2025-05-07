import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Blog, { mockBlogPosts } from "./Blog";
import Workshop, { mockWorkshops } from "./Workshop";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const Blogs = () => {
  const [activeTab, setActiveTab] = useState("blogs");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter blogs based on search query
  const filteredBlogs = mockBlogPosts.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
  );

  // Filter workshops based on search query
  const filteredWorkshops = mockWorkshops.filter(
    (workshop) =>
      workshop.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      workshop.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      workshop.techStack.some((tech) =>
        tech.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
  );

  return (
    <div className="p-6 bg-background">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Learning Resources</h1>
        <p className="text-muted-foreground">
          Explore our collection of educational blogs and interactive workshops
          to enhance your programming skills.
        </p>
      </div>

      <div className="relative mb-6">
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
          size={18}
        />
        <Input
          placeholder={`Search ${activeTab === "blogs" ? "blogs" : "workshops"}...`}
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs defaultValue="blogs" onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="blogs">Blogs</TabsTrigger>
          <TabsTrigger value="workshops">Workshops</TabsTrigger>
        </TabsList>

        <TabsContent value="blogs">
          {filteredBlogs.length > 0 ? (
            <Blog posts={filteredBlogs} />
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No blogs found matching your search.
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="workshops">
          {filteredWorkshops.length > 0 ? (
            <Workshop workshops={filteredWorkshops} />
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No workshops found matching your search.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Blogs;
