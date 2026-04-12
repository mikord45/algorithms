1. Verify that using topologySortBFS() as a helper inside topologySortBFS() is correct/optimal or it can be improved.
   Especially if some node would be revisited inside helper topologySortBFS() call, that handles another revisit above etc.
2. Add to getPathBFS() searching by id, to remove comment from 3rd line of src\graphs\bfs\index.ts
3. Idea: Rewrite getPathBFS() to recursive function.
4. Idea: Graph might be represented using Map() too. (Book - Chapter 6)
5. Explore: Graphs with multiple starting points - https://www.geeksforgeeks.org/dsa/topological-sorting/
