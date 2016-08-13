import Dracula from '../../src/Dracula'
import Layouter from '../../src/Dracula.Spring'
import Renderer from '../../src/Renderer.Raphael'

const g = new Dracula

g.addEdge('Banana', 'Tomato')
g.addEdge('Mushroom', 'Tomato')
g.addEdge('Apple', 'Tomato')
g.addEdge('Apple', 'Mushroom')
g.addEdge('Banana', 'Mushroom')

const layouter = new Layouter(g)

console.log(g)
console.log(layouter)

const renderer = new Renderer('#canvas', g)

renderer.draw()
