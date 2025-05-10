import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content?: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
  imageUrl: string;
}

interface BlogProps {
  posts?: BlogPost[];
}

// Mock data for blog posts
export const mockBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Understanding Big O Notation",
    summary:
      "A comprehensive guide to analyzing algorithm efficiency and why it matters in software development.",
    content: `<h2>What is Big O Notation?</h2><p>Big O notation is a mathematical notation that describes the limiting behavior of a function when the argument tends towards a particular value or infinity. In computer science, it's used to classify algorithms according to how their run time or space requirements grow as the input size grows.</p><p>The letter 'O' is used because the growth rate of a function is also referred to as the <strong>order of the function</strong>. Big O notation characterizes functions according to their growth rates.</p><h2>Common Time Complexities</h2><ul><li><strong>O(1)</strong> - Constant Time: The execution time remains constant regardless of the input size.</li><li><strong>O(log n)</strong> - Logarithmic Time: The execution time increases logarithmically as the input size grows.</li><li><strong>O(n)</strong> - Linear Time: The execution time increases linearly with the input size.</li><li><strong>O(n log n)</strong> - Linearithmic Time: Common in efficient sorting algorithms like merge sort and heap sort.</li><li><strong>O(n²)</strong> - Quadratic Time: Often found in algorithms with nested iterations over the data set.</li><li><strong>O(2^n)</strong> - Exponential Time: The execution time doubles with each addition to the input data set.</li></ul><h2>Why Big O Matters</h2><p>Understanding Big O notation is crucial for several reasons:</p><ol><li>It helps you make informed decisions about which algorithms and data structures to use.</li><li>It allows you to predict how your code will perform as your data sets grow.</li><li>It's a common topic in technical interviews at top tech companies.</li></ol><p>When analyzing algorithms, we're usually interested in the worst-case scenario, which gives us an upper bound on the running time. This helps us guarantee that the algorithm will never take longer than a certain amount of time to run.</p><h2>Examples in Code</h2><pre><code>// O(1) - Constant time
function getFirstElement(array) {
  return array[0];
}

// O(n) - Linear time
function findElement(array, element) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === element) return i;
  }
  return -1;
}

// O(n²) - Quadratic time
function bubbleSort(array) {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        // Swap elements
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
    }
  }
  return array;
}</code></pre><p>Remember that Big O notation is about the rate of growth, not the exact running time. An O(n) algorithm might actually be slower than an O(n²) algorithm for small inputs, but as the input size grows, the O(n) algorithm will eventually outperform the O(n²) algorithm.</p>`,
    author: "Jane Smith",
    date: "2023-06-15",
    readTime: "8 min read",
    tags: ["Algorithms", "Computer Science", "Performance"],
    imageUrl:
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80",
  },
  {
    id: "2",
    title: "Mastering Binary Search Trees",
    summary:
      "Learn how to implement and optimize binary search trees for efficient data retrieval and manipulation.",
    content: `<h2>Introduction to Binary Search Trees</h2><p>A Binary Search Tree (BST) is a node-based binary tree data structure that has the following properties:</p><ul><li>The left subtree of a node contains only nodes with keys less than the node's key.</li><li>The right subtree of a node contains only nodes with keys greater than the node's key.</li><li>Both the left and right subtrees must also be binary search trees.</li></ul><p>These properties make BSTs efficient for search, insertion, and deletion operations, with an average time complexity of O(log n) for all these operations.</p><h2>Basic Operations</h2><h3>1. Insertion</h3><p>To insert a new node into a BST, we compare the key of the new node with the root. If the key is less than the root, we go to the left subtree; otherwise, we go to the right subtree. We repeat this process until we find a null reference, which is where we insert the new node.</p><pre><code>function insert(root, key) {
  // If the tree is empty, return a new node
  if (root === null) {
    return new Node(key);
  }

  // Otherwise, recur down the tree
  if (key < root.key) {
    root.left = insert(root.left, key);
  } else if (key > root.key) {
    root.right = insert(root.right, key);
  }

  // Return the unchanged node pointer
  return root;
}</code></pre><h3>2. Search</h3><p>Searching in a BST is similar to insertion. We start at the root and compare the key we're looking for with the current node. If they match, we've found the node. If the key is less than the current node, we search in the left subtree; otherwise, we search in the right subtree.</p><pre><code>function search(root, key) {
  // Base case: root is null or key is present at root
  if (root === null || root.key === key) {
    return root;
  }

  // Key is greater than root's key
  if (root.key < key) {
    return search(root.right, key);
  }

  // Key is smaller than root's key
  return search(root.left, key);
}</code></pre><h3>3. Deletion</h3><p>Deleting a node from a BST is more complex than insertion or search. There are three cases to consider:</p><ol><li>Node to be deleted is a leaf: Simply remove it.</li><li>Node to be deleted has only one child: Copy the child to the node and delete the child.</li><li>Node to be deleted has two children: Find the inorder successor (smallest in the right subtree), copy its contents to the node, and delete the inorder successor.</li></ol><h2>Balancing BSTs</h2><p>A major issue with BSTs is that they can become unbalanced, leading to worst-case O(n) time complexity for operations. Several self-balancing BST variants address this issue:</p><ul><li><strong>AVL Trees</strong>: Maintain balance by ensuring that the heights of the two child subtrees of any node differ by at most one.</li><li><strong>Red-Black Trees</strong>: Ensure balance through a set of properties that constrain how nodes can be colored (red or black).</li><li><strong>B-trees</strong>: Generalize the binary search tree by allowing nodes to have more than two children.</li></ul><p>These balanced BSTs maintain O(log n) time complexity for operations even in worst-case scenarios.</p><h2>Applications of BSTs</h2><p>Binary Search Trees are widely used in various applications:</p><ul><li>Implementing dynamic sets and maps (dictionaries)</li><li>Database indexing</li><li>Priority queues</li><li>Expression evaluation</li><li>Spell checking</li></ul><p>Understanding BSTs is fundamental to mastering more complex tree-based data structures and algorithms.</p>`,
    author: "John Doe",
    date: "2023-07-22",
    readTime: "12 min read",
    tags: ["Data Structures", "Trees", "Algorithms"],
    imageUrl:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80",
  },
  {
    id: "3",
    title: "Dynamic Programming: From Novice to Expert",
    summary:
      "A step-by-step approach to understanding and implementing dynamic programming solutions to complex problems.",
    content: `<h2>Understanding Dynamic Programming</h2><p>Dynamic Programming (DP) is a powerful technique used to solve complex problems by breaking them down into simpler subproblems. It's particularly useful when:</p><ul><li>The problem has overlapping subproblems (same subproblems are solved multiple times)</li><li>The problem has optimal substructure (optimal solution can be constructed from optimal solutions of its subproblems)</li></ul><p>The key idea behind DP is to store the results of subproblems so that we don't have to recompute them when needed later. This technique is called <strong>memoization</strong>.</p><h2>Key Concepts</h2><h3>1. Overlapping Subproblems</h3><p>A problem has overlapping subproblems if the same subproblems need to be solved multiple times. For example, in the Fibonacci sequence, calculating fib(5) requires calculating fib(4) and fib(3), and calculating fib(4) requires calculating fib(3) and fib(2). Here, fib(3) is calculated multiple times.</p><h3>2. Optimal Substructure</h3><p>A problem has optimal substructure if its optimal solution can be constructed from optimal solutions of its subproblems. For instance, the shortest path problem has optimal substructure because if the shortest path from A to C goes through B, then the path from A to B and the path from B to C must also be the shortest paths.</p><h2>Approaches to Dynamic Programming</h2><h3>1. Top-Down Approach (Memoization)</h3><p>In this approach, we start with the original problem and break it down into subproblems. We solve each subproblem only once and store its result in a table (usually an array or a hash map). When the same subproblem occurs again, we simply look up the previously computed result.</p><pre><code>// Fibonacci using memoization
function fibonacci(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 2) return 1;
  
  memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
  return memo[n];
}</code></pre><h3>2. Bottom-Up Approach (Tabulation)</h3><p>In this approach, we start with the smallest subproblems and work our way up to the original problem. We fill a table with the results of all subproblems, ensuring that when we need to solve a particular subproblem, all of its prerequisite subproblems have already been solved.</p><pre><code>// Fibonacci using tabulation
function fibonacci(n) {
  let dp = new Array(n + 1);
  dp[0] = 0;
  dp[1] = 1;
  
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  
  return dp[n];
}</code></pre><h2>Classic Dynamic Programming Problems</h2><h3>1. Knapsack Problem</h3><p>Given a set of items, each with a weight and a value, determine which items to include in a collection so that the total weight is less than or equal to a given limit and the total value is as large as possible.</p><h3>2. Longest Common Subsequence</h3><p>Find the longest subsequence common to all sequences in a set of sequences.</p><h3>3. Longest Increasing Subsequence</h3><p>Find the length of the longest subsequence of a given sequence such that all elements of the subsequence are sorted in increasing order.</p><h3>4. Matrix Chain Multiplication</h3><p>Given a sequence of matrices, find the most efficient way to multiply these matrices together.</p><h2>Steps to Solve DP Problems</h2><ol><li><strong>Identify if it's a DP problem</strong>: Look for overlapping subproblems and optimal substructure.</li><li><strong>Define the state</strong>: Determine what information you need to represent a subproblem.</li><li><strong>Formulate the recurrence relation</strong>: Express the solution to a problem in terms of solutions to smaller subproblems.</li><li><strong>Identify the base cases</strong>: Define the simplest subproblems that can be solved directly.</li><li><strong>Decide the approach</strong>: Choose between top-down (memoization) or bottom-up (tabulation).</li><li><strong>Implement the solution</strong>: Write the code based on your chosen approach.</li><li><strong>Optimize if necessary</strong>: Look for ways to reduce time or space complexity.</li></ol><p>Dynamic Programming is a powerful technique that can transform exponential time algorithms into polynomial time solutions. Mastering it requires practice and a deep understanding of how to break down problems into their constituent parts.</p>`,
    author: "Alice Johnson",
    date: "2023-08-05",
    readTime: "15 min read",
    tags: ["Algorithms", "Dynamic Programming", "Problem Solving"],
    imageUrl:
      "https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?w=800&q=80",
  },
  {
    id: "4",
    title: "Graph Algorithms for Interview Preparation",
    summary:
      "Essential graph algorithms every CS student should know before technical interviews at top tech companies.",
    content: `<h2>Introduction to Graph Algorithms</h2><p>Graphs are versatile data structures that represent a collection of nodes (vertices) connected by edges. They're used to model various real-world scenarios, from social networks to transportation systems. Understanding graph algorithms is crucial for technical interviews at top tech companies.</p><h2>Graph Representation</h2><p>Before diving into algorithms, it's important to understand how graphs are represented in code:</p><h3>1. Adjacency Matrix</h3><p>A 2D array where matrix[i][j] = 1 if there's an edge from vertex i to vertex j, and 0 otherwise.</p><pre><code>// Adjacency Matrix representation
const graph = [
  [0, 1, 1, 0],
  [1, 0, 1, 1],
  [1, 1, 0, 0],
  [0, 1, 0, 0]
];</code></pre><h3>2. Adjacency List</h3><p>An array of lists, where each list contains the neighbors of the corresponding vertex.</p><pre><code>// Adjacency List representation
const graph = [
  [1, 2],     // Neighbors of vertex 0
  [0, 2, 3],  // Neighbors of vertex 1
  [0, 1],     // Neighbors of vertex 2
  [1]         // Neighbors of vertex 3
];</code></pre><h2>Essential Graph Algorithms</h2><h3>1. Breadth-First Search (BFS)</h3><p>BFS explores all vertices at the current depth before moving to vertices at the next depth level. It's useful for finding the shortest path in an unweighted graph.</p><pre><code>function bfs(graph, start) {
  const visited = new Array(graph.length).fill(false);
  const queue = [start];
  visited[start] = true;
  
  while (queue.length > 0) {
    const vertex = queue.shift();
    console.log(vertex); // Process vertex
    
    for (const neighbor of graph[vertex]) {
      if (!visited[neighbor]) {
        visited[neighbor] = true;
        queue.push(neighbor);
      }
    }
  }
}</code></pre><h3>2. Depth-First Search (DFS)</h3><p>DFS explores as far as possible along each branch before backtracking. It's useful for topological sorting, detecting cycles, and solving maze problems.</p><pre><code>function dfs(graph, start, visited = new Array(graph.length).fill(false)) {
  visited[start] = true;
  console.log(start); // Process vertex
  
  for (const neighbor of graph[start]) {
    if (!visited[neighbor]) {
      dfs(graph, neighbor, visited);
    }
  }
}</code></pre><h3>3. Dijkstra's Algorithm</h3><p>Dijkstra's algorithm finds the shortest path from a source vertex to all other vertices in a weighted graph with non-negative edge weights.</p><pre><code>function dijkstra(graph, start) {
  const n = graph.length;
  const dist = new Array(n).fill(Infinity);
  const visited = new Array(n).fill(false);
  dist[start] = 0;
  
  for (let i = 0; i < n; i++) {
    // Find the vertex with the minimum distance
    let u = -1;
    for (let j = 0; j < n; j++) {
      if (!visited[j] && (u === -1 || dist[j] < dist[u])) {
        u = j;
      }
    }
    
    visited[u] = true;
    
    // Update distances of adjacent vertices
    for (let v = 0; v < n; v++) {
      if (graph[u][v] !== 0 && !visited[v]) {
        dist[v] = Math.min(dist[v], dist[u] + graph[u][v]);
      }
    }
  }
  
  return dist;
}</code></pre><h3>4. Bellman-Ford Algorithm</h3><p>Bellman-Ford algorithm finds the shortest paths from a source vertex to all other vertices, even in graphs with negative edge weights (as long as there are no negative cycles).</p><h3>5. Floyd-Warshall Algorithm</h3><p>Floyd-Warshall algorithm finds the shortest paths between all pairs of vertices in a weighted graph.</p><h3>6. Kruskal's and Prim's Algorithms</h3><p>These algorithms find the minimum spanning tree of a connected, undirected graph.</p><h3>7. Topological Sort</h3><p>Topological sorting arranges the vertices of a directed acyclic graph (DAG) in a linear order such that for every directed edge (u, v), vertex u comes before vertex v.</p><h2>Common Interview Problems</h2><ol><li><strong>Detect a cycle in a graph</strong>: Use DFS with a recursion stack or coloring method.</li><li><strong>Find connected components</strong>: Use DFS or BFS to identify connected components in an undirected graph.</li><li><strong>Bipartite graph check</strong>: Determine if a graph can be colored using only two colors such that no adjacent vertices have the same color.</li><li><strong>Word ladder problem</strong>: Find the shortest transformation sequence from one word to another, changing only one letter at a time.</li><li><strong>Course schedule problem</strong>: Determine if it's possible to finish all courses given prerequisites (cycle detection in a directed graph).</li></ol><h2>Interview Tips</h2><ul><li>Always clarify the graph representation (directed/undirected, weighted/unweighted).</li><li>Consider edge cases: empty graph, disconnected graph, self-loops, etc.</li><li>Choose the appropriate algorithm based on the problem requirements.</li><li>Be prepared to explain the time and space complexity of your solution.</li><li>Practice implementing these algorithms from scratch.</li></ul><p>Mastering graph algorithms is essential for technical interviews. With regular practice and a solid understanding of the underlying concepts, you'll be well-prepared to tackle graph-related problems in your interviews.</p>`,
    author: "Michael Chen",
    date: "2023-09-10",
    readTime: "10 min read",
    tags: ["Graphs", "Interviews", "Algorithms"],
    imageUrl:
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80",
  },
];

const Blog = ({ posts = mockBlogPosts }: BlogProps) => {
  const navigate = useNavigate();
  return (
    <div className="bg-background">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <Card
            key={post.id}
            className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="h-48 overflow-hidden">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl font-bold">
                  {post.title}
                </CardTitle>
              </div>
              <div className="flex items-center text-sm text-muted-foreground space-x-4">
                <span>{post.author}</span>
                <div className="flex items-center">
                  <Calendar size={14} className="mr-1" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock size={14} className="mr-1" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                {post.summary}
              </CardDescription>
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => navigate(`/blog/${post.id}`)}
                className="bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200 transform hover:scale-105"
              >
                Read More
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Blog;
