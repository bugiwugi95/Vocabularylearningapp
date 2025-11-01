import { useEffect, useRef } from 'react';

interface Node {
  id: number;
  name: string;
  number: number;
}

interface Link {
  source: number;
  target: number;
  strength: number;
  accuracy: number;
}

interface TeamGraphProps {
  data: {
    nodes: Node[];
    links: Link[];
  };
  highlightNode?: number;
}

export function TeamGraph({ data, highlightNode }: TeamGraphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Position nodes in a circle
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.35;

    const nodePositions = data.nodes.map((node, index) => {
      const angle = (index / data.nodes.length) * 2 * Math.PI - Math.PI / 2;
      return {
        ...node,
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
      };
    });

    // Draw links
    data.links.forEach((link) => {
      const sourceNode = nodePositions.find((n) => n.id === link.source);
      const targetNode = nodePositions.find((n) => n.id === link.target);

      if (sourceNode && targetNode) {
        ctx.beginPath();
        ctx.moveTo(sourceNode.x, sourceNode.y);
        ctx.lineTo(targetNode.x, targetNode.y);
        
        // Line width based on strength
        ctx.lineWidth = Math.max(1, link.strength / 3);
        
        // Color based on accuracy
        if (link.accuracy >= 85) {
          ctx.strokeStyle = 'rgba(34, 197, 94, 0.6)'; // green
        } else {
          ctx.strokeStyle = 'rgba(234, 179, 8, 0.6)'; // yellow
        }
        
        ctx.stroke();

        // Draw strength label
        const midX = (sourceNode.x + targetNode.x) / 2;
        const midY = (sourceNode.y + targetNode.y) / 2;
        ctx.fillStyle = '#475569';
        ctx.font = '10px Roboto';
        ctx.textAlign = 'center';
        ctx.fillText(link.strength.toString(), midX, midY);
      }
    });

    // Draw nodes
    nodePositions.forEach((node) => {
      // Node circle
      ctx.beginPath();
      ctx.arc(node.x, node.y, 24, 0, 2 * Math.PI);
      
      if (highlightNode === node.id) {
        ctx.fillStyle = '#dc2626'; // red for highlighted
        ctx.strokeStyle = '#991b1b';
      } else {
        ctx.fillStyle = '#2563eb'; // blue
        ctx.strokeStyle = '#1e40af';
      }
      
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.stroke();

      // Node number
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 14px Roboto';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(node.number.toString(), node.x, node.y);

      // Node name
      ctx.fillStyle = '#1e293b';
      ctx.font = '12px Roboto';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillText(node.name, node.x, node.y + 32);
    });

    // Legend
    const legendX = 20;
    const legendY = height - 60;

    // High accuracy line
    ctx.beginPath();
    ctx.moveTo(legendX, legendY);
    ctx.lineTo(legendX + 30, legendY);
    ctx.strokeStyle = 'rgba(34, 197, 94, 0.8)';
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.fillStyle = '#475569';
    ctx.font = '11px Roboto';
    ctx.textAlign = 'left';
    ctx.fillText('≥85% точность', legendX + 35, legendY + 4);

    // Low accuracy line
    ctx.beginPath();
    ctx.moveTo(legendX, legendY + 20);
    ctx.lineTo(legendX + 30, legendY + 20);
    ctx.strokeStyle = 'rgba(234, 179, 8, 0.8)';
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.fillText('<85% точность', legendX + 35, legendY + 24);

  }, [data, highlightNode]);

  return (
    <div className="w-full flex justify-center">
      <canvas
        ref={canvasRef}
        width={350}
        height={350}
        className="border border-slate-200 rounded-lg bg-slate-50"
      />
    </div>
  );
}
