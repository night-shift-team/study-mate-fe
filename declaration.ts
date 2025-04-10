declare module 'react-clip-path' {
  import { FC } from 'react';

  /** ShapeProps 인터페이스 정의 */
  interface ShapeProps {
    /**
     * The unique identifier of the shape (필수)
     */
    id: string;
    /**
     * The Shape Name (Circle, Square, Rectangle, 등)
     * - 필수: `name` 또는 `formula` 중 하나는 반드시 전달해야 함
     */
    name?:
      | 'Circle'
      | 'Square'
      | 'Rectangle'
      | 'Rhombus'
      | 'Ellipse'
      | 'Triangle'
      | 'Parallelogram'
      | 'Trapezoid'
      | 'Pentagon'
      | 'Hexagon'
      | 'Heptagon'
      | 'Octagon'
      | 'Nonagon'
      | 'Decagon'
      | 'Cross'
      | 'Star'
      | 'Tag';
    /**
     * The shape's clip-path formula (CSS clip-path 값)
     * - 필수: `name`이 없을 경우 반드시 전달해야 함
     */
    formula?: string;
    /**
     * The color of the shape (기본값: #12a8d6)
     */
    backgroundColor?: string;
    /**
     * The height of the shape (기본값: 100px)
     */
    height?: string;
    /**
     * The width of the shape (기본값: 100px)
     */
    width?: string;
    /**
     * Show outside part of the clipped area if true (기본값: false)
     */
    showShadow?: boolean;
    /**
     * Any text label about the shape
     */
    text?: string;
    /**
     * Show the text label if true (기본값: true)
     */
    showLabel?: boolean;
    /**
     * Function to call when user clicks on the shape
     */
    handleClick?: () => void;
  }
  /** Shape 컴포넌트 타입 정의 */
  const Shape: FC<ShapeProps>;
  export default Shape;
}
