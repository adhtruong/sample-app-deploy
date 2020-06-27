import React from 'react';
import './App.css';

import p5 from 'p5';


let sketch = ( p: p5 ) => {
  let tiles = 12;
  let tileSize = 50;

  p.setup = () => {
      p.createCanvas(tiles * tileSize, tiles * tileSize);
      p.noLoop();
  }

  p.draw = () => {
      p.background(0);
      p.noFill();
      p.strokeWeight(10);
      p.stroke(255);
      p.strokeCap(p.SQUARE);
      for (let i=0; i<tiles; i++) {
        for (let j=0; j<tiles; j++) {
          p.push()
          p.translate((i + 0.5) * tileSize, (j +0.5) * tileSize);
          p.rotate(Math.floor(p.random() * 4) * p.PI / 2);
          p.arc(-0.5 * tileSize, -0.5 * tileSize, tileSize, tileSize, 0, p.PI/2);
          p.arc(0.5 * tileSize, 0.5 * tileSize, tileSize, tileSize, p.PI, p.PI * 3/2);
          p.pop()
        }
      }
  }
}


class App extends React.Component {
  myRef: React.RefObject<HTMLDivElement>;
  myP5: p5 | null;

  constructor(props: any) {
    super(props);
    this.myRef = React.createRef();
    this.myP5 = null;
  }

  componentDidMount() {
    if (this.myRef.current === null)
      return
    this.myP5 = new p5(sketch, this.myRef.current);
  }

  render() {
    return (
      <div 
      style={{
        position: "absolute", 
        left:'50%', 
        top: '50%',
        transform: 'translate(-50%, -50%)'
      }}
      ref={this.myRef}>
      </div>
    )
  }
}

export default App;
