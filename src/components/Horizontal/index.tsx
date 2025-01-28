import clsx from "clsx";
import styles from "./style.module.scss";

export type HorizontalProps = {
  gap?: string | number;
  _ref?: React.RefObject<HTMLDivElement>;
  style?: React.CSSProperties;
  className?: string;
  children: React.ReactNode;
  id?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onScroll?: (e: React.UIEvent<HTMLDivElement, UIEvent>) => void;
};

const Horizontal = ({
  gap,
  _ref,
  style,
  className,
  children,
  id,
  onMouseEnter,
  onMouseLeave,
  onScroll,
}: HorizontalProps) => {
  return (
    <div
      ref={_ref}
      id={id}
      className={clsx(styles.horizontal, className)}
      style={{ gap, ...style }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onScroll={onScroll}>
      {children}
    </div>
  );
};

export default Horizontal;
