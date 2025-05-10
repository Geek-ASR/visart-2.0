import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Blog, { mockBlogPosts, BlogPost } from "./Blog";
import Workshop, { mockWorkshops, Workshop as WorkshopType } from "./Workshop";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";
import CreateBlogForm from "./CreateBlogForm";
import CreateWorkshopForm from "./CreateWorkshopForm";
import { Routes, Route, useLocation } from "react-router-dom";
import BlogDetail from "./BlogDetail";
import WorkshopDetail from "./WorkshopDetail";

const Blogs = () => {
  const [activeTab, setActiveTab] = useState("blogs");
  const [searchQuery, setSearchQuery] = useState("");
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(mockBlogPosts);
  const [workshops, setWorkshops] = useState<WorkshopType[]>(mockWorkshops);
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false); // In a real app, this would come from auth context
  const [isCreateBlogOpen, setIsCreateBlogOpen] = useState(false);
  const [isCreateWorkshopOpen, setIsCreateWorkshopOpen] = useState(false);

  // Filter blogs based on search query
  const filteredBlogs = blogPosts.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
  );

  // Filter workshops based on search query
  const filteredWorkshops = workshops.filter(
    (workshop) =>
      workshop.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      workshop.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      workshop.techStack.some((tech) =>
        tech.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
  );

  const handleCreateBlog = (newBlog: Omit<BlogPost, "id">) => {
    const newBlogWithId: BlogPost = {
      ...newBlog,
      id: `blog-${Date.now()}`,
    };
    setBlogPosts([newBlogWithId, ...blogPosts]);
  };

  const handleCreateWorkshop = (newWorkshop: Omit<WorkshopType, "id">) => {
    const newWorkshopWithId: WorkshopType = {
      ...newWorkshop,
      id: `workshop-${Date.now()}`,
    };
    setWorkshops([newWorkshopWithId, ...workshops]);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="p-6 bg-background">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Learning Resources</h1>
              <p className="text-muted-foreground">
                Explore our collection of educational blogs and interactive
                workshops to enhance your programming skills.
              </p>
            </div>

            <div className="flex justify-between items-center mb-6">
              <div className="relative w-full max-w-md">
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
              <Button
                onClick={() =>
                  activeTab === "blogs"
                    ? setIsCreateBlogOpen(true)
                    : setIsCreateWorkshopOpen(true)
                }
                className="ml-4"
              >
                <Plus className="mr-2" size={16} />
                Create {activeTab === "blogs" ? "Blog" : "Workshop"}
              </Button>
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

            {/* Create Forms */}
            <CreateBlogForm
              isOpen={isCreateBlogOpen}
              onClose={() => setIsCreateBlogOpen(false)}
              onSubmit={handleCreateBlog}
            />

            <CreateWorkshopForm
              isOpen={isCreateWorkshopOpen}
              onClose={() => setIsCreateWorkshopOpen(false)}
              onSubmit={handleCreateWorkshop}
            />

            {/* Toggle for demo purposes - in a real app this would be based on user role */}
            <div className="mt-8 p-4 border rounded-md">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Instructor Mode</h3>
                  <p className="text-sm text-muted-foreground">
                    Toggle to simulate instructor authorization
                  </p>
                </div>
                <Button
                  variant={isAuthorized ? "default" : "outline"}
                  onClick={() => setIsAuthorized(!isAuthorized)}
                >
                  {isAuthorized ? "Authorized" : "Unauthorized"}
                </Button>
              </div>
            </div>
          </div>
        }
      />
      <Route path="/blog/:id" element={<BlogDetail posts={blogPosts} />} />
      <Route
        path="/workshop/:id"
        element={
          <WorkshopDetail workshops={workshops} isAuthorized={isAuthorized} />
        }
      />
    </Routes>
  );
};

export default Blogs;
