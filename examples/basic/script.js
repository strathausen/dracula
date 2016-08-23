const g = new Dracula.Graph

g.addEdge('Banana', 'Tomato')
g.addEdge('Mushroom', 'Tomato')
g.addEdge('Apple', 'Tomato')
g.addEdge('Apple', 'Mushroom')
g.addEdge('Banana', 'Mushroom')

const layouter = new Dracula.Layout.Spring(g)

const renderer = new Dracula.Renderer.Raphael('#canvas', g)

renderer.draw()
