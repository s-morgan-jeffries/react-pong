// src/Pong.js
import React, { useState, useEffect } from 'react';
import { Stage, Layer, Rect } from 'react-konva';

const Paddle = ({ x, y, onMove }) => {
  const handleDragMove = (e) => {
    onMove(e.target.y());
  };

  return (
    <Rect
      x={x}
      y={y}
      width={20}
      height={100}
      fill="white"
      draggable
      dragBoundFunc={(pos) => {
        return {
          x: x,
          y: Math.max(0, Math.min(400 - 100, pos.y)),
        };
      }}
      onDragMove={handleDragMove}
      onTouchMove={handleDragMove}
    />
  );
};

const Ball = ({ x, y }) => {
  return <Rect x={x} y={y} width={10} height={10} fill="white" />;
};

const Pong = () => {
  const [leftPaddleY, setLeftPaddleY] = useState(150);
//   const [rightPaddleY, setRightPaddleY] = useState(150);
  const [ballPos, setBallPos] = useState({ x: 295, y: 195 });
  const [ballVelocity, setBallVelocity] = useState({ x: 2, y: 2 });
  const [aiPaddleY, setAIPaddleY] = useState(150);

useEffect(() => {
    const interval = setInterval(() => {
      const newBallPos = {
        x: ballPos.x + ballVelocity.x,
        y: ballPos.y + ballVelocity.y,
      };

      // Collision with left paddle
      if (
        newBallPos.x <= 30 &&
        newBallPos.y >= leftPaddleY - 10 &&
        newBallPos.y <= leftPaddleY + 110
      ) {
        setBallVelocity({ x: -ballVelocity.x, y: ballVelocity.y });
      }
      // Collision with right paddle
      else if (
        newBallPos.x >= 560 &&
        newBallPos.y >= aiPaddleY - 10 &&
        newBallPos.y <= aiPaddleY + 110
      ) {
        setBallVelocity({ x: -ballVelocity.x, y: ballVelocity.y });
      } else {
        // Collision with top or bottom wall
        if (newBallPos.y <= 0 || newBallPos.y >= 390) {
          setBallVelocity({ x: ballVelocity.x, y: -ballVelocity.y });
        }

        // Reset ball position if it goes out of bounds
        if (newBallPos.x < 0 || newBallPos.x > 600) {
          newBallPos.x = 295;
          newBallPos.y = 195;
          setBallVelocity({ x: 2, y: 2 });
        }

        setBallPos(newBallPos);
      }

      // Update AI paddle position
      const aiTargetY = ballPos.y - 50; // 50 is half the paddle height
      const aiYDiff = aiTargetY - aiPaddleY;

      if (Math.abs(aiYDiff) > 2) {
        const aiMove = aiYDiff > 0 ? 2 : -2;
        setAIPaddleY(Math.max(0, Math.min(300, aiPaddleY + aiMove)));
      }
    }, 10);

    return () => clearInterval(interval);
  }, [ballPos, ballVelocity, leftPaddleY, aiPaddleY]);

  return (
    <Stage width={600} height={400} style={{ backgroundColor: 'black' }}>
      <Layer>
        <Rect
          x={0}
          y={0}
          width={600}
          height={400}
          strokeWidth={4}
          stroke="white"
          listening={false}
        />
        <Paddle x={10} y={leftPaddleY} onMove={setLeftPaddleY} />
        <Paddle x={570} y={aiPaddleY} onMove={setAIPaddleY} />
        <Ball x={ballPos.x} y={ballPos.y} />
      </Layer>
    </Stage>
  );
};

export default Pong;
